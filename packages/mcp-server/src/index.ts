#!/usr/bin/env node
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

// ⑧ 按场景推荐最近案例
server.tool(
  "recommend_example",
  "根据描述的业务场景和卡片类型，推荐最接近的 1-2 个参考案例。",
  {
    description: z
      .string()
      .describe("业务场景描述，例如：用户申请代码库权限，需要审批人同意或拒绝"),
    type: z
      .enum(["approval", "notice", "form", "info", "unknown"])
      .optional()
      .describe("卡片类型（可选）"),
  },
  async ({ description, type }) => {
    const index = readFile(EXAMPLES_MD);
    const examples = listHtmlExamples();

    // 简单关键词匹配
    const keywords = description.split(/[\s，,。、]+/).filter((k) => k.length > 1);
    const scored = examples.map((e) => {
      let score = 0;
      for (const kw of keywords) {
        if (e.scene.includes(kw) || e.file.includes(kw)) score += 2;
      }
      if (type && type !== "unknown" && e.type === type) score += 3;
      return { ...e, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 2);

    const result = top
      .map((e) => `- ${e.file}（类型：${e.type}，场景：${e.scene}，匹配分：${e.score}）`)
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: `推荐参考案例：\n\n${result}\n\n请用 get_example_code 工具获取对应文件的完整源码。`,
        },
      ],
    };
  }
);

// ── 启动 ───────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
