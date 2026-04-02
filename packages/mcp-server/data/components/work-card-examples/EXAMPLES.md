# 工作卡案例库索引

## AI 工具调用强制流程

收到用户的卡片生成需求后，**必须严格按以下步骤执行，禁止跳步**：

```
Step 1  →  调用 recommend_example 工具
           传入用户的需求描述，工具会识别场景类型并返回 1-2 个最匹配的案例文件路径

Step 2  →  调用 get_example_code 工具
           传入 Step 1 返回的文件路径，获取该案例的完整 HTML 源码

Step 3  →  以案例源码为模板生成新卡片
           复用骨架结构，只修改业务内容，遵循本文件「新增案例检查清单」
```

> **禁止**不经 `recommend_example` 直接调用 `list_examples` 或 `get_example_code` 遍历所有案例。
> **禁止**凭记忆或猜测生成卡片结构，必须基于实际案例源码。

---

## 目录结构

```
work-card-examples/
├── shared/                          # 公共资源（CSS / JS / Footer 模板）
│   ├── work-card-base.css
│   ├── work-card-base.js
│   └── work-card-footer.html
├── permission-approval/             # 权限审批类案例
│   ├── approval-icafe-card-permission.html
│   ├── approval-knowledge-doc-permission.html
│   ├── approval-space-permission.html
│   └── form-code-repo-permission.html
├── ticket-workflow/                 # 工单流转类案例
│   ├── approval-business-trip.html
│   ├── approval-code-repo-permission.html
│   ├── approval-ticket-transfer.html
│   ├── form-repo-access.html
│   ├── form-ticket-transfer.html
│   ├── info-todo-task.html
│   ├── notice-security-ticket.html
│   ├── notice-security-ticket-dispatch.html
│   ├── notice-security-ticket-overdue.html
│   ├── notice-security-ticket-summary.html
│   ├── notice-security-ticket-urge.html
│   ├── notice-ticket-transfer-failed.html
│   └── notice-ticket-transfer-success.html
└── EXAMPLES.md                      # 本索引文件
```

## 公共资源说明

所有案例 HTML 通过以下方式引用公共资源（案例位于子目录，路径用 `../shared/`），**禁止在案例文件中重复声明公共样式**：

```html
<link rel="stylesheet" href="../shared/work-card-base.css" />
<script src="../shared/work-card-base.js"></script>
```

Footer 品牌区从 `shared/work-card-footer.html` **原样复制**到每个案例底部，**禁止修改其 HTML 结构或 SVG 数据**。

案例文件中仅通过 `<style>` 声明**本场景特有的 CSS 类**。

## 文件命名规则

`{类型}-{业务场景}.html`

类型枚举：
- `approval` — 审批类（需要用户做出同意/拒绝决策）
- `notice` — 通知类（信息告知，可选操作）
- `form` — 表单类（需要用户填写/提交信息）
- `info` — 展示类（纯信息展示，无交互或仅有跳转）

## 案例清单

> **WorkCardBody spacing 属性**：`default`(12px) 最常用，`tight`(8px) 适中，`intimate`(4px) 紧凑。HTML 案例中对应修饰类 `work-card-body--tight` / `work-card-body--intimate`。

| 文件名 | 类型 | 场景 | 卡头图标 | 卡头色 | 关键组件 |
|--------|------|------|---------|--------|---------|
| `permission-approval/approval-icafe-card-permission.html` | 审批 | iCafe卡片权限申请 | IconTodo | blue | wc-title1 + AttrList（含链接值 + 3行截断备注）+ 全文链接 + Actions(fill) |
| `permission-approval/form-code-repo-permission.html` | 表单 | 代码库权限申请 | IconTodo | blue | wc-title1 + AttrList + 查看详情链接 + 分割线 + Select + Button(auto) 横排 |
| `permission-approval/approval-space-permission.html` | 审批 | 空间权限申请 | IconTodo | blue | wc-title1 + AttrList + 查看更多链接 + Input + Actions(fill)（spacing=intimate） |
| `permission-approval/approval-knowledge-doc-permission.html` | 审批 | 知识库文档权限申请 | IconTodo | blue | wc-title1 + AttrList（含文档链接）+ 审批记录区 + 拒绝标签 + Input + Actions(fill) |
| `ticket-workflow/approval-business-trip.html` | 审批 | 出差申请审批 | IconTodo | blue | AttrList + 自定义行程区 + FormGroup + Select + Textarea + Actions(fill) |
| `ticket-workflow/approval-code-repo-permission.html` | 审批 | 代码库权限申请 | IconTodo | blue | 标题 + AttrList + 查看详情链接 + 分割线 + Select + Button(auto) 横排 |
| `ticket-workflow/approval-ticket-transfer.html` | 审批 | 工单转交审批 | IconNotice | red | 标题 + 提示文字 + 转交信息 + AttrList(错误色行) + 查看详情链接 + Input(拒绝原因) + Actions(fill) + 提示文字（spacing=tight） |
| `ticket-workflow/info-todo-task.html` | 展示 | 待办任务 | IconTodo | blue | wc-title1 + AttrList（含链接值）+ Actions(fill) |
| `ticket-workflow/form-repo-access.html` | 表单 | 代码库权限表单 | IconTodo | blue | wc-title1 + AttrList + 查看详情链接 + Select + Actions(auto) |
| `ticket-workflow/form-ticket-transfer.html` | 表单 | 工单转交表单 | IconTask | blue | wc-title1 + AttrList + Input + 人员选择器 + Actions(fill) × 2 |
| `ticket-workflow/notice-security-ticket.html` | 通知 | 安全工单通知 | IconNotice | red | 自定义人员列表 + 展开更多 + Actions(fill) + 提示文字 |
| `ticket-workflow/notice-security-ticket-dispatch.html` | 通知 | 安全工单派发 | IconNotice | red | 标题 + 危险标签 + AttrList(错误色行) + Actions(fill) × 2 + 分割线 + 提示文字 |
| `ticket-workflow/notice-security-ticket-overdue.html` | 通知 | 安全工单逾期 | IconNotice | red | wc-title1 + AttrList(错误色行) + Actions(fill) × 2 + 分割线 + 提示文字 |
| `ticket-workflow/notice-security-ticket-summary.html` | 通知 | 安全工单汇总 | IconNotice | blue | 自定义危险等级列表 + Actions(fill) + 提示文字 |
| `ticket-workflow/notice-security-ticket-urge.html` | 通知 | 安全工单催办 | IconNotice | red | 标题 + 描述文字(高亮数字) + 催办人(头像+姓名) + Actions(fill) + 分割线 + 提示文字 |
| `ticket-workflow/notice-ticket-transfer-failed.html` | 通知 | 工单转交失败 | IconNotice | red | 标题 + 拒绝原因 + 分割线 + AttrList(错误色行) + Actions(fill) + 次要按钮组(fill) + 分割线 + 提示文字 |
| `ticket-workflow/notice-ticket-transfer-success.html` | 通知 | 工单转交成功 | IconNotice | blue | 标题 + 自定义时间信息 + 提示文字 |

## 新增案例检查清单

新增案例时请确认：

1. 文件名遵循 `{type}-{scene}.html` 命名规则，放入对应分类子目录
2. 通过 `<link>` 引用 `../shared/work-card-base.css`，不重复声明公共样式
3. 仅在 `<style>` 中声明场景特有的 CSS 类
4. 卡片 HTML 遵循三层结构：Header → Body → Footer
5. Footer 使用固定品牌模板——从 `shared/work-card-footer.html` 原样复制，不做任何修改
6. 用到 Select 时通过 `<script src>` 引用 `../shared/work-card-base.js`
7. Select 下拉菜单不得被父级 `overflow: hidden` 裁剪——包含 Select 的容器及其祖先（直到 `.work-card-body`）必须设置 `overflow: visible`
8. Tag / Badge 类标签统一使用 `tag.tsx` 的 **md（默认）** 尺寸：高度 18px (`--comp-height-xs`)、内边距 4px (`--space-intimate`)、字号 11px、圆角 2px (`--radius-xs`)
9. Tag / Badge 与同行文本对齐时，不得将整行文本容器改为 `flex` 破坏文本流；保持标签自身居中机制不变，避免影响正文换行与排版
10. 更新本文件的「案例清单」表格

---

## 按钮搭配规则

> 完整规则（类型定义、搭配约束、常见组合、判断原则）见 `components/ui/work-card.tsx` 设计稿注释。以下仅列 HTML / TSX 类名速查。

### HTML 类名

```html
<button class="wc-btn wc-btn--outline">次要操作</button>
<button class="wc-btn wc-btn--outline-primary">主要操作</button>
<button class="wc-btn wc-btn--outline-destructive">负向操作</button>
```

### TSX 变体

```tsx
<Button variant="outline">次要操作</Button>
<Button variant="outline-primary">主要操作</Button>
<Button variant="outline-destructive">负向操作</Button>
```

---

## TSX 典型用法

> 以下示例供生成 TSX 代码时参考，组件完整 API 以 `components/ui/work-card.tsx` 的 cva 定义为准。

**信息展示卡（审批场景，主要 + 负向按钮组合 → 默认 fill）：**
```tsx
<WorkCard>
  <WorkCardHeader icon={<IconTodo />} label="待办事项" />
  <WorkCardBody>
    <h3 className="wc-title1 text-[var(--text-heading)]">项目周报提交</h3>
    <WorkCardAttrList>
      <WorkCardAttrItem>
        <WorkCardAttrLabel>截止日期</WorkCardAttrLabel>
        <WorkCardAttrValue>2025-03-28</WorkCardAttrValue>
      </WorkCardAttrItem>
    </WorkCardAttrList>
    <WorkCardActions>
      <Button variant="outline-primary">同意</Button>
      <Button variant="outline-destructive">拒绝</Button>
    </WorkCardActions>
  </WorkCardBody>
  <WorkCardFooter />
</WorkCard>
```

**通知卡（次要 + 主要按钮组合 → 默认 fill）：**
```tsx
<WorkCard>
  <WorkCardHeader icon={<IconNotice />} label="安全工单通知" color="red" />
  <WorkCardBody>
    <h3 className="wc-title1 text-[var(--text-heading)]">你的下级有安全工单待处理</h3>
    <WorkCardActions>
      <Button variant="outline">查看详情</Button>
      <Button variant="outline-primary">一键催办</Button>
    </WorkCardActions>
  </WorkCardBody>
  <WorkCardFooter />
</WorkCard>
```

**紧凑间距卡（纯文字 + 链接场景 → spacing="intimate"，间距 4px）：**
```tsx
<WorkCard>
  <WorkCardHeader icon={<IconTodo />} label="空间权限申请" />
  <WorkCardBody spacing="intimate">
    <h3 className="wc-title1 text-[var(--text-heading)]">申请空间权限</h3>
    <WorkCardAttrList>
      <WorkCardAttrItem>
        <WorkCardAttrLabel>申请人</WorkCardAttrLabel>
        <WorkCardAttrValue>代岱</WorkCardAttrValue>
      </WorkCardAttrItem>
    </WorkCardAttrList>
    <a className="wc-more-link" href="#">查看更多</a>
    <WorkCardActions>
      <Button variant="outline-primary">同意</Button>
      <Button variant="outline-destructive">拒绝</Button>
    </WorkCardActions>
  </WorkCardBody>
  <WorkCardFooter />
</WorkCard>
```

**表单交互卡（输入框 + 按钮横向组合 → layout="auto"）：**
```tsx
<WorkCard>
  <WorkCardHeader icon={<IconTask />} label="快捷搜索" color="blue" />
  <WorkCardBody>
    <WorkCardActions layout="auto">
      <Input radius="pill" placeholder="输入关键词搜索" className="flex-1" />
      <Button variant="outline-primary">搜索</Button>
    </WorkCardActions>
  </WorkCardBody>
  <WorkCardFooter />
</WorkCard>
```
