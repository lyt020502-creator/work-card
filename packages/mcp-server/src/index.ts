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
  version: "2.2.0",
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

const SHARED_DIR = path.join(LIB_ROOT, "components/work-card-examples/shared");

// ⑫ 获取工作卡生成规范（开发规则 + MCP 工具调用流程）
server.tool(
  "get_generation_rules",
  "【首次生成工作卡前必须调用】获取完整的工作卡开发规范和 MCP 工具调用流程。包含：组件结构约束、样式禁令、HTML 输出规定、图标规范、强制工具调用顺序等。AI 在生成任何工作卡代码之前，必须先调用此工具获取规范并严格遵守。",
  {},
  async () => {
    const devRules = `# 工作卡开发规范

生成任何**工作卡 UI 代码**时，必须**严格遵守**以下约束。不得引入外部 CSS 框架、组件库、自定义硬编码值，也不得自造卡片结构。

> **核心参考文件**：通过 \`get_work_card_api\` 工具获取。组件 API（variant 选项、props、默认值）、卡头颜色语义、排版层级、内部表单/按钮约束均在该文件的 **cva 定义及注释** 中有权威说明。生成代码前**必须先调用该工具**，本规范仅补充未涵盖的使用规则和禁令。

---

## 1. 组件结构与使用

### 1.1 固定三层结构

每张工作卡**必须**包含以下三层，顺序不可调换：

\`\`\`tsx
<WorkCard>
  <WorkCardHeader icon={<IconTodo />} label="状态文字" color="blue" />
  <WorkCardBody>
    {/* 业务内容区 */}
  </WorkCardBody>
  <WorkCardFooter />
</WorkCard>
\`\`\`

### 1.2 WorkCardBody spacing 属性

\`WorkCardBody\` 支持 \`spacing\` 属性控制子元素间距：

- \`default\`（默认）— 12px（\`--space-content\`），最常用
- \`tight\` — 8px（\`--space-tight\`），适中
- \`intimate\` — 4px（\`--space-intimate\`），紧凑的纯文字/链接场景

TSX 用法：\`<WorkCardBody spacing="intimate">\`

HTML 用法：\`<div class="work-card-body work-card-body--intimate">\`

### 1.3 导入

所有工作卡组件和卡头图标均从 \`components/ui/work-card\` 导入。具体可用组件清单参见该文件的 \`export\`。

### 1.4 禁止行为

- **禁止**用 \`<div>\` 自行搭建卡片容器、卡头、品牌底部
- **禁止**手写键值对布局，必须使用 \`WorkCardAttrList\` 系列组件
- **禁止**为"标签+值"的键值对场景自造 flex 布局类名。凡键值对列表，HTML 中**必须**使用 \`wc-attr-list\` + \`wc-attr-item\` + \`wc-attr-label\` + \`wc-attr-value\`，TSX 中**必须**使用 \`WorkCardAttrList\` + \`WorkCardAttrItem\` + \`WorkCardAttrLabel\` + \`WorkCardAttrValue\`
- **禁止**自定义卡头图标 SVG，必须使用 5 个规范图标（\`IconTodo\` / \`IconTask\` / \`IconSchedule\` / \`IconHot\` / \`IconNotice\`）
- **禁止**用 \`<div>\` 手写 flex 布局放置按钮组，必须使用 \`WorkCardActions\`
- 按钮**必须**使用 \`Button\` 组件的 \`outline-primary\`、\`outline\` 或 \`outline-destructive\` 变体

### 1.5 按钮搭配规则

- 三种变体：\`outline-primary\`（主要）、\`outline\`（次要）、\`outline-destructive\`（负向）
- **主要和负向各最多 1 个，次要不限**
- 右侧放核心操作（用户视线终点）

---

## 2. 样式禁令

### 颜色
- **禁止**硬编码颜色值（如 \`#3377FF\`、\`rgba(...)\`），**必须**使用 \`get_design_tokens\` 返回的语义变量

### 间距 / 圆角 / 阴影
- **禁止**使用魔法数字（如 \`padding: 10px\`），**必须**使用 token 变量（\`--space-*\`、\`--corner-*\`、\`--shadow-*\`）

### 排版
- 工作卡内容区**仅允许** 4 级字号（\`wc-title1\` / \`wc-title2\` / \`wc-text\` / \`wc-caption\`）
- **禁止**使用 \`text-[14px]\`、\`text-base\`、\`text-sm\` 等未定义字号
- **禁止**使用 \`font-semibold\`（600）或 \`font-bold\`（700）等未定义字重

### 组件
- **禁止**引入 shadcn、antd、MUI、Bootstrap 等任何外部 UI 库

---

## 3. HTML 输出特别规定

- 不得使用 Tailwind CDN 或任何 CDN
- **禁止**使用 \`style=""\` 内联样式覆盖组件变体属性
- 卡头颜色变体通过 CSS 类切换：默认 blue 无需额外类，其他颜色使用 \`work-card-header--red\` / \`--green\` / \`--orange\` / \`--gray\`
- Footer **必须**使用 \`get_footer_html\` 返回的固定模板，**禁止**修改

---

## 4. 图标

- **禁止**自绘 SVG 路径
- **查找图标**：调用 \`search_icons\` 或 \`get_icon_list\`
- **HTML demo**：将 SVG 路径数据内联，硬编码颜色改为 \`fill="currentColor"\` / \`stroke="currentColor"\`
`;

    const mcpRules = `# MCP 工具调用流程（强制）

收到工作卡生成需求后，**必须严格按以下顺序调用工具**：

Step 1 → \`recommend_example\`：传入用户需求描述，返回 1-2 个最匹配的案例文件路径
Step 2 → \`get_example_code\`：传入 Step 1 返回的文件路径，获取完整 HTML 案例源码
Step 3 → \`get_shared_css\`：获取公共样式，内联到 \`<style>\` 标签
Step 4 →（按需）\`get_shared_js\`：仅当卡片包含 Select 下拉组件时调用，内联到 \`<script>\` 标签
Step 5 → \`get_footer_html\`：获取 Footer 固定 HTML 模板，原样复制到卡片底部
Step 6 → 以案例源码为模板生成新卡片，复用骨架，替换业务内容

**HTML 资源引用规则：**
- 公共样式：禁止 \`<link>\` 引用，必须 \`<style>\` 内联 \`get_shared_css\` 返回的内容
- 公共 JS：禁止 \`<script src>\` 引用，必须 \`<script>\` 内联 \`get_shared_js\` 返回的内容
- Footer：禁止自行编写，必须原样复制 \`get_footer_html\` 返回的 HTML

**禁止行为：**
- 禁止跳过 \`recommend_example\`，直接遍历所有案例
- 禁止不查工具、凭记忆生成组件结构或样式值

**按需工具调用：**
- 确认组件 Props / 变体 → \`get_work_card_api\`
- 查找图标 → \`search_icons\` 或 \`get_icon_list\`
- 确认颜色 / 间距变量名 → \`get_design_tokens\`
- 查看所有案例列表 → \`get_examples_index\`
`;

    return {
      content: [
        {
          type: "text",
          text: devRules + "\n---\n\n" + mcpRules,
        },
      ],
    };
  }
);

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
