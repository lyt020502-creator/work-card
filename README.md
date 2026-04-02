# Work Card 组件库

工作卡（Work Card）是如流 IM 消息流中的结构化卡片组件，用于展示待办、审批、通知、表单等业务场景。

本仓库包含：
- `packages/work-card` — React 组件库（TypeScript + Tailwind CSS v4）
- `packages/mcp-server` — MCP Server，供 AI 工具（Cursor / Comate 等）调用规范
- `apps/demo` — 本地预览 Demo

---

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动 Demo
pnpm dev
```

## MCP Server 接入

在 Cursor / Comate 的 MCP 配置文件中添加：

```json
{
  "mcpServers": {
    "work-card": {
      "command": "npx",
      "args": [
        "-y",
        "--registry=https://npm.pkg.github.com",
        "@lyt020502-creator/work-card-mcp-server"
      ],
      "env": {
        "NPM_TOKEN": "your_github_token"
      }
    }
  }
}
```

> Token 需要 `read:packages` 权限，在 [GitHub Settings → Tokens](https://github.com/settings/tokens/new) 生成。

---

# 工作卡开发规范

生成任何**工作卡 UI 代码**时，必须**严格遵守**以下约束。不得引入外部 CSS 框架、组件库、自定义硬编码值，也不得自造卡片结构。

> **核心参考文件**：`components/ui/work-card.tsx`。组件 API（variant 选项、props、默认值）、卡头颜色语义、排版层级、内部表单/按钮约束均在该文件的 **cva 定义及注释** 中有权威说明。生成代码前**必须先读取该文件**，本规范仅补充 tsx 中未涵盖的使用规则和禁令。

---

## 1. 组件结构与使用

### 1.1 固定三层结构

每张工作卡**必须**包含以下三层，顺序不可调换：

```tsx
<WorkCard>
  <WorkCardHeader icon={<IconTodo />} label="状态文字" color="blue" />
  <WorkCardBody>
    {/* 业务内容区 */}
  </WorkCardBody>
  <WorkCardFooter />
</WorkCard>
```

### 1.2 WorkCardBody spacing 属性

`WorkCardBody` 支持 `spacing` 属性控制子元素间距：

- `default`（默认）— 12px（`--space-content`），最常用
- `tight` — 8px（`--space-tight`），适中
- `intimate` — 4px（`--space-intimate`），紧凑的纯文字/链接场景

TSX 用法：`<WorkCardBody spacing="intimate">`

HTML 用法：`<div class="work-card-body work-card-body--intimate">`

### 1.3 导入

所有工作卡组件和卡头图标均从 `components/ui/work-card` 导入。具体可用组件清单参见该文件的 `export`。

### 1.4 禁止行为

- **禁止**用 `<div>` 自行搭建卡片容器、卡头、品牌底部
- **禁止**手写键值对布局，必须使用 `WorkCardAttrList` 系列组件
- **禁止**自定义卡头图标 SVG，必须使用 tsx 中导出的 5 个规范图标（`IconTodo` / `IconTask` / `IconSchedule` / `IconHot` / `IconNotice`）
- **禁止**用 `<div>` 手写 flex 布局放置按钮组，必须使用 `WorkCardActions`
- 按钮**必须**使用 `Button` 组件的 `outline-primary`、`outline` 或 `outline-destructive` 变体

### 1.5 按钮搭配规则

完整的三种按钮类型定义、搭配约束和常见组合见 `work-card.tsx` 设计稿注释（"内部按钮"及"按钮搭配规则"段落）。此处仅列要点：

- 三种变体：`outline-primary`（主要）、`outline`（次要）、`outline-destructive`（负向）
- **主要和负向各最多 1 个，次要不限**
- 右侧放核心操作（用户视线终点）

### 1.6 典型用法示例

参见 `components/work-card-examples/EXAMPLES.md`「TSX 典型用法」章节，包含信息展示卡（审批场景）和表单交互卡两类范例。

---

## 2. 唯一授权来源

| 类型 | 来源 | 说明 |
|---|---|---|
| 工作卡组件 | `components/ui/work-card.tsx` | 所有骨架和内容组件的唯一来源 |
| 通用组件 | `components/ui/*.tsx` | 卡内表单控件（`button.tsx`、`input.tsx`、`select.tsx`） |
| CSS 变量 | `theme.css` | 仅在需要新增变量或确认变量值时查阅 |
| 图标 | `components/icons/ICON_LIST.md` | 查清单定位图标名，从 `index.ts` 导入 |
| HTML 案例库索引 | `components/work-card-examples/EXAMPLES.md` | 生成 HTML 前**必须先读索引**，按类型/组件匹配最近案例 |
| HTML 公共样式 | `components/work-card-examples/shared/work-card-base.css` | 案例共用的 :root 变量、骨架、控件、按钮四态、Footer CSS |
| HTML 公共交互 | `components/work-card-examples/shared/work-card-base.js` | 案例共用的 Select 展开/收起/选中逻辑 |
| HTML Footer 模板 | `components/work-card-examples/shared/work-card-footer.html` | Footer 品牌区固定 HTML，案例须原样复制 |

---

## 3. 样式禁令

### 颜色
- **禁止**硬编码颜色值（如 `#3377FF`、`rgba(...)`），**必须**使用 `theme.css` 中的语义变量

### 间距 / 圆角 / 阴影
- **禁止**使用魔法数字（如 `padding: 10px`），**必须**使用 token 变量（`--space-*`、`--corner-*`、`--shadow-*`）

### 排版
- 工作卡内容区**仅允许** 4 级字号（`wc-title1` / `wc-title2` / `wc-text` / `wc-caption`），具体定义见 `work-card.tsx` 的 cva 注释
- **禁止**使用 `text-[14px]`、`text-base`、`text-sm`、`text-lg` 等未定义字号
- **禁止**使用 `font-semibold`（600）或 `font-bold`（700）等未定义字重

### 组件
- **禁止**引入 shadcn、antd、MUI、Bootstrap 等任何外部 UI 库
- 需要组件时，优先使用 `components/ui/` 中已有的文件

---

## 4. HTML 输出特别规定

### 4.0 案例库参考流程（强制）

生成任何工作卡 HTML 代码**之前**，必须执行以下流程：

1. **读取索引**：读取 `components/work-card-examples/EXAMPLES.md`，查看「案例清单」表格
2. **匹配案例**：根据目标场景的类型和所需组件，选取最接近的 1-2 个案例文件名
3. **读取案例**：读取选中的 `.html` 文件完整内容，理解其业务结构和场景特有 CSS
4. **生成代码**：以案例为模板，遵循 `EXAMPLES.md` 中的「公共资源说明」和「新增案例检查清单」生成新卡片
5. **归档（如用户要求）**：按 `EXAMPLES.md` 中的规则保存文件并更新索引表

> 索引中无合适参考时，回退到读取 `work-card.tsx` 源文件 + `theme.css`，但生成的 HTML **仍必须**引用 `shared/` 下的公共资源。

### 4.1 其他 HTML 规定

- 不得使用 Tailwind CDN 或任何 CDN
- **禁止**使用 `style=""` 内联样式覆盖组件变体属性，必须在 `<style>` 中定义独立 CSS 类
- 生成 HTML 前，必须先读取实际用到的每个组件 `.tsx` 的 cva 变体定义，**禁止**凭记忆填写样式值
- 卡头颜色变体通过 CSS 类切换：默认 blue 无需额外类，其他颜色使用 `work-card-header--red` / `--green` / `--orange` / `--gray`

### 4.2 WorkCardFooter HTML 固定模板

HTML demo 中 WorkCardFooter **必须**从 `components/work-card-examples/shared/work-card-footer.html` 原样复制固定模板，**禁止**修改 HTML 结构或 base64 数据。CSS 样式已包含在 `shared/work-card-base.css` 中。

**禁止行为：**
- **禁止**用文字"如流工作卡"替代品牌文字图片
- **禁止**用自绘 SVG/CSS 替代品牌图标图片
- **禁止**修改模板的 HTML 结构或 base64 数据
- **禁止**省略品牌图标或品牌文字中的任何一个

---

## 5. 图标

- **禁止**自绘 SVG 路径（如手写 `<path d="M..."/>`、`<line>`、`<circle>` 等）
- **查找图标**：先读 `components/icons/ICON_LIST.md`，按分类或关键词定位图标名
- **TSX 导入**：从 `components/icons` 导入；补充图标可从 `lucide-react` 按需导入
- **HTML demo**：将 SVG 路径数据内联，硬编码颜色改为 `fill="currentColor"` / `stroke="currentColor"`
- 图标颜色通过父级 CSS `color` 控制，不得在 SVG 内硬编码颜色值
- **禁止**直接读取 `components/icons/index.ts`（barrel 文件），应读 `ICON_LIST.md`
