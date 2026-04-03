import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 发布后：dist/index.js → ../data/；本地开发：src/index.ts → ../../work-card/
const DATA_DIR = path.resolve(__dirname, "../data");
const LIB_ROOT = fs.existsSync(DATA_DIR)
  ? DATA_DIR
  : path.resolve(__dirname, "../../work-card");
const EXAMPLES_DIR = path.join(LIB_ROOT, "components/work-card-examples");
const ICONS_MD = path.join(LIB_ROOT, "components/icons/ICON_LIST.md");
const EXAMPLES_MD = path.join(EXAMPLES_DIR, "EXAMPLES.md");
const WORK_CARD_TSX = path.join(LIB_ROOT, "components/ui/work-card.tsx");

// ── 工具函数 ──────────────────────────────────────────────────

function readFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return `[文件不存在: ${filePath}]`;
  }
}

function listHtmlExamples(): Array<{ file: string; type: string; scene: string }> {
  const results: Array<{ file: string; type: string; scene: string }> = [];
  const dirs = ["permission-approval", "ticket-workflow"];
  for (const dir of dirs) {
    const dirPath = path.join(EXAMPLES_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;
    for (const file of fs.readdirSync(dirPath)) {
      if (!file.endsWith(".html")) continue;
      const match = file.match(/^([a-z]+)-(.+)\.html$/);
      results.push({
        file: `${dir}/${file}`,
        type: match?.[1] ?? "unknown",
        scene: match?.[2] ?? file,
      });
    }
  }
  return results;
}

// ── MCP Server ─────────────────────────────────────────────────

const server = new McpServer({
  name: "work-card",
  version: "1.0.0",
});

// ① 获取工作卡组件完整 API
server.tool(
  "get_work_card_api",
  "获取工作卡组件的完整 API 文档，包括所有组件名称、Props、variant 选项和使用约束。生成工作卡代码前必须调用此工具。",
  {},
  async () => ({
    content: [{ type: "text", text: readFile(WORK_CARD_TSX) }],
  })
);

// ② 列出所有 HTML 案例
server.tool(
  "list_examples",
  "列出工作卡案例库中所有可用的 HTML 示例，包含文件路径、类型（approval/notice/form/info）和场景描述。",
  {},
  async () => {
    const examples = listHtmlExamples();
    const lines = examples.map(
      (e) => `- [${e.type}] ${e.file}  →  场景：${e.scene}`
    );
    return {
      content: [
        {
          type: "text",
          text: `共 ${examples.length} 个案例：\n\n${lines.join("\n")}`,
        },
      ],
    };
  }
);

// ③ 获取指定 HTML 案例完整代码
server.tool(
  "get_example_code",
  "获取指定工作卡 HTML 案例的完整源码，用于复用骨架结构生成新卡片。",
  {
    file: z
      .string()
      .describe(
        "案例文件相对路径，例如 permission-approval/approval-icafe-card-permission.html"
      ),
  },
  async ({ file }) => {
    const fullPath = path.join(EXAMPLES_DIR, file);
    return {
      content: [{ type: "text", text: readFile(fullPath) }],
    };
  }
);

// ④ 获取案例库索引和 TSX 用法
server.tool(
  "get_examples_index",
  "获取工作卡案例库完整索引，包含案例清单表格、TSX 典型用法示例、按钮搭配规则等，是生成工作卡代码的核心参考。",
  {},
  async () => ({
    content: [{ type: "text", text: readFile(EXAMPLES_MD) }],
  })
);

// ⑤ 搜索图标
server.tool(
  "search_icons",
  "在图标库中按关键词搜索图标，返回匹配的图标名称和说明。",
  {
    keyword: z.string().describe("搜索关键词，例如：删除、箭头、加载"),
  },
  async ({ keyword }) => {
    const content = readFile(ICONS_MD);
    const lines = content.split("\n");
    const matched = lines.filter(
      (line: string) => line.includes("|") && line.toLowerCase().includes(keyword.toLowerCase())
    );
    if (matched.length === 0) {
      return {
        content: [{ type: "text", text: `未找到包含"${keyword}"的图标。` }],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `找到 ${matched.length} 个相关图标：\n\n${matched.join("\n")}`,
        },
      ],
    };
  }
);

// ⑥ 获取完整图标清单
server.tool(
  "get_icon_list",
  "获取完整图标清单，包含所有 232 个图标的名称、分类和说明。",
  {},
  async () => ({
    content: [{ type: "text", text: readFile(ICONS_MD) }],
  })
);

// ⑦ 获取设计 Token（theme.css）
server.tool(
  "get_design_tokens",
  "获取工作卡设计 Token（CSS 变量），包含所有颜色、间距、字号、圆角、阴影等变量定义。禁止硬编码颜色值，必须使用这些变量。",
  {},
  async () => ({
    content: [
      {
        type: "text",
        text: readFile(path.join(LIB_ROOT, "theme.css")),
      },
    ],
  })
);

// ⑧ 按场景推荐最近案例（解析 EXAMPLES.md 表格行，中文语义匹配）
server.tool(
  "recommend_example",
  "接收用户的卡片需求描述，识别场景类型，推荐最接近的 1-2 个参考案例文件路径。调用此工具后再用 get_example_code 获取对应源码，禁止不经推荐直接读取所有案例。",
  {
    description: z
      .string()
      .describe("用户的卡片需求描述，用原始语言传入，例如：用户申请代码库权限，需要审批人同意或拒绝"),
  },
  async ({ description }) => {
    const indexContent = readFile(EXAMPLES_MD);

    // 从 EXAMPLES.md 表格中解析每一行案例的完整描述（含中文场景、关键组件等）
    type ExampleRow = { file: string; type: string; fullText: string };
    const rows: ExampleRow[] = [];
    for (const line of indexContent.split("\n")) {
      // 匹配表格数据行：以 | ` 开头
      const match = line.match(/^\|\s*`([^`]+\.html)`\s*\|(.+)$/);
      if (!match) continue;
      const file = match[1].trim();
      const rest = match[2];
      // 提取类型字段（第一个 | 分隔的列）
      const cols = rest.split("|").map((c) => c.trim());
      const type = cols[0] ?? "";
      rows.push({ file, type, fullText: line });
    }

    // 关键词提取：拆分中文词、英文词，过滤单字
    const keywords = description
      .split(/[\s，,。、！？!?:：(（)）\-\/\\]+/)
      .flatMap((token) => {
        // 中文按2字以上子串滑窗提取
        const cjk = token.match(/[\u4e00-\u9fa5]{2,}/g) ?? [];
        const eng = token.match(/[a-zA-Z0-9]{2,}/g) ?? [];
        return [...cjk, ...eng, token].filter((k) => k.length >= 2);
      })
      .filter(Boolean);

    // 类型关键词映射
    const typeMap: Record<string, string> = {
      审批: "审批", 同意: "审批", 拒绝: "审批", 审核: "审批",
      通知: "通知", 告知: "通知", 提醒: "通知", 催办: "通知",
      表单: "表单", 填写: "表单", 提交: "表单", 申请: "表单",
      展示: "展示", 信息: "展示", 查看: "展示",
    };
    const detectedType = (() => {
      for (const kw of keywords) {
        if (typeMap[kw]) return typeMap[kw];
      }
      return null;
    })();

    // 打分：每个关键词命中 fullText 得 2 分，命中类型列得 5 分
    const scored = rows.map((row) => {
      let score = 0;
      for (const kw of keywords) {
        if (row.fullText.includes(kw)) score += 2;
      }
      if (detectedType && row.type.includes(detectedType)) score += 5;
      return { ...row, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 2).filter((e) => e.score > 0);
    const fallback = top.length === 0 ? scored.slice(0, 1) : top;

    const lines = fallback.map(
      (e) => `- 文件：${e.file}（类型：${e.type}，匹配分：${e.score}）\n  → 原始描述行：${e.fullText.trim()}`
    );

    return {
      content: [
        {
          type: "text",
          text: [
            `识别到的卡片类型：${detectedType ?? "未知，按内容匹配"}`,
            `匹配关键词：${keywords.join("、")}`,
            "",
            "推荐参考案例：",
            ...lines,
            "",
            "下一步：用 get_example_code 工具传入上方文件路径，获取完整源码后再生成新卡片。",
            "禁止跳过此步骤直接生成。",
          ].join("\n"),
        },
      ],
    };
  }
);

// ── 启动 ───────────────────────────────────────────────────────

const SHARED_DIR = path.join(LIB_ROOT, "components/work-card-examples/shared");

// ⑨ 获取公共 CSS（用于内联到生成的 HTML，替代相对路径 <link>）
server.tool(
  "get_shared_css",
  "获取工作卡公共样式表（work-card-base.css）的完整内容。通过 MCP 生成 HTML 时，必须调用此工具并将内容内联到 <style> 标签，禁止使用相对路径 <link>，因为工作区中不存在该文件。",
  {},
  async () => ({
    content: [{ type: "text", text: readFile(path.join(SHARED_DIR, "work-card-base.css")) }],
  })
);

// ⑩ 获取公共 JS（用于内联到生成的 HTML，仅含 Select 交互逻辑）
server.tool(
  "get_shared_js",
  "获取工作卡公共交互脚本（work-card-base.js）的完整内容。仅在卡片包含 Select 下拉组件时才需调用，将内容内联到 <script> 标签末尾，禁止使用相对路径 <script src>。",
  {},
  async () => ({
    content: [{ type: "text", text: readFile(path.join(SHARED_DIR, "work-card-base.js")) }],
  })
);

// ⑪ 获取 Footer 固定模板 HTML
server.tool(
  "get_footer_html",
  "获取工作卡品牌 Footer 的固定 HTML 模板（含 base64 品牌图标）。生成 HTML 时必须原样复制此内容到卡片底部，禁止修改结构或替换图片。",
  {},
  async () => ({
    content: [{ type: "text", text: readFile(path.join(SHARED_DIR, "work-card-footer.html")) }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
