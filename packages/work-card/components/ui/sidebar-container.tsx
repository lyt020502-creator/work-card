// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { 通用工具关闭 } from "../icons";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// SidebarContainer 侧边栏容器组件（复合组件）
//
// 页面右侧固定宽度侧边栏面板，用于承载详情、配置等辅助内容。
// 结构：SidebarContainer → (SidebarContainerHeader + SidebarContainerBody + SidebarContainerFooter)
//
// Figma 实测参数速查（来源: node-id=462-5024）：
//   默认宽度    360px
//   背景色      --bg-primary (#FFFFFF)
//   阴影        -6px 0px 20px 0px rgba(0,44,102,0.05)
//   标题区      高 60px，padding 0 16px(--space-group)，标题 16px/font-medium/--text-heading
//              吸顶 sticky top-0，底部分割线 --divider-color
//   内容区      padding 16px(--space-group)，子元素间距 gap=16px(--space-group)
//   操作区      吸底 sticky bottom-0，顶部分割线 --divider-color
//              padding 12px(--space-content) 16px(--space-group)，按钮间距 8px(--space-tight)
//   关闭按钮    --text-secondary → hover --text-heading
//
// 间距规范：
//   组件间距默认 16px(--space-group)，必要时可按 4 的倍数递减：
//   16px(--space-group) → 12px(--space-content) → 8px(--space-tight) → 4px(--space-intimate)
// ────────────────────────────────────────────────────────────

/** 侧边栏容器面板样式 */
const sidebarContainerVariants = cva(
  [
    "flex flex-col",
    "w-[360px]",
    "bg-[var(--bg-primary)]",
    "shadow-[-6px_0px_20px_0px_rgba(0,44,102,0.05)]",
    "font-['PingFang_SC',sans-serif]",
    "overflow-hidden",
    "h-full",
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface SidebarContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarContainerVariants> {}

export interface SidebarContainerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface SidebarContainerTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface SidebarContainerCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface SidebarContainerBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface SidebarContainerFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/**
 * SidebarContainer — 侧边栏根容器
 * 固定宽度 360px 面板，flex 纵向排列，左侧带阴影。
 */
export const SidebarContainer = React.forwardRef<
  HTMLDivElement,
  SidebarContainerProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(sidebarContainerVariants({ className }))}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarContainer.displayName = "SidebarContainer";

/**
 * SidebarContainerHeader — 侧边栏头部区域
 * Figma 实测：高 60px，水平 flex，justify-between，左右 padding 16px(--space-group)。
 * 吸顶：sticky top-0 z-10，确保内容滚动时头部始终可见。
 * 底部分割线：1px solid --divider-color，区分头部与内容区。
 */
export const SidebarContainerHeader = React.forwardRef<
  HTMLDivElement,
  SidebarContainerHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-row items-center justify-between shrink-0",
        "h-[60px]",
        "px-[var(--space-group)]",
        "bg-[var(--bg-primary)]",
        "sticky top-0 z-10",
        "border-b border-[var(--divider-color)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarContainerHeader.displayName = "SidebarContainerHeader";

/**
 * SidebarContainerTitle — 侧边栏标题文字
 * Figma 实测：16px / font-medium / --text-heading
 */
export const SidebarContainerTitle = React.forwardRef<
  HTMLHeadingElement,
  SidebarContainerTitleProps
>(({ className, children, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        "flex-1 my-0",
        "text-[var(--font-title6-size)] leading-[var(--font-title6-height)]",
        "font-[var(--font-weight-medium)]",
        "text-[var(--text-heading)]",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
});

SidebarContainerTitle.displayName = "SidebarContainerTitle";

/**
 * SidebarContainerClose — 侧边栏关闭按钮（X 图标）
 * Figma 实测：图标 16×16，颜色 --text-secondary，hover 时 --text-heading。
 */
export const SidebarContainerClose = React.forwardRef<
  HTMLButtonElement,
  SidebarContainerCloseProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      aria-label="关闭"
      className={cn(
        "flex items-center justify-center shrink-0",
        "w-[30px] h-[30px]",
        "text-[var(--text-secondary)]",
        "hover:text-[var(--text-heading)]",
        "active:text-[var(--text-heading)]",
        "transition-colors cursor-pointer",
        className
      )}
      {...props}
    >
      <通用工具关闭 size={16} />
    </button>
  );
});

SidebarContainerClose.displayName = "SidebarContainerClose";

/**
 * SidebarContainerBody — 侧边栏主内容区域
 * Figma 实测：flex-1 占满剩余高度，overflow-y-auto 支持滚动。
 * padding: 16px(--space-group) 四边统一
 * 子元素间距: gap=16px(--space-group)
 * 间距规范: 默认 16px，必要时可按 4 的倍数递减(12px → 8px → 4px)
 */
export const SidebarContainerBody = React.forwardRef<
  HTMLDivElement,
  SidebarContainerBodyProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex-1 flex flex-col overflow-y-auto",
        "bg-[var(--bg-primary)]",
        "pt-[var(--space-group)] px-[var(--space-group)] pb-[var(--space-group)]",
        "gap-[var(--space-group)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarContainerBody.displayName = "SidebarContainerBody";

/**
 * SidebarContainerFooter — 侧边栏底部操作区域
 * 吸底：sticky bottom-0 z-10，确保内容滚动时操作区始终可见。
 * 顶部分割线：1px solid --divider-color，区分内容区与底部操作。
 * padding: 12px(--space-content) 16px(--space-group)，按钮间距 8px(--space-tight)。
 */
export const SidebarContainerFooter = React.forwardRef<
  HTMLDivElement,
  SidebarContainerFooterProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end shrink-0",
        "gap-[var(--space-tight)]",
        "py-[var(--space-content)] px-[var(--space-group)]",
        "bg-[var(--bg-primary)]",
        "sticky bottom-0 z-10",
        "border-t border-[var(--divider-color)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarContainerFooter.displayName = "SidebarContainerFooter";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { sidebarContainerVariants };
