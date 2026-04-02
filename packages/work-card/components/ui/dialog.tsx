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
// Dialog 弹窗组件（通用对话框，区别于 AlertDialog）
//
// Figma 实测参数速查（来源: node-id=110-895）：
//   圆角    --corner-md  (8px)
//   阴影    0px 2px 20px 0px rgba(0,35,82,0.08) → --shadow-sm
//   背景    --bg-primary (#FFFFFF)
//   标题    16px / font-medium / --text-heading (#11141A)
//   标题行  高 22px，内边距 left/right 20px，top 16px
//   分割线  0.5px / --border-color，距标题行底部 16px，横贯全宽
//   内容区  内边距 20px（--space-section）
//   底栏    内边距 x=20px / bottom=20px，按钮间距 8px（--space-tight）
//   遮罩层  --overlay-bg = rgba(17,20,26,0.5) = --color-gray-10 at 50%
// ────────────────────────────────────────────────────────────

/**
 * dialogContentVariants — 弹窗内容卡片
 * size: sm=488px | md=640px | lg=800px（默认 md）
 */
const dialogContentVariants = cva(
  [
    // 布局
    "flex flex-col",
    // 字体族
    "font-['PingFang_SC',sans-serif]",
    // 圆角（--corner-md = 8px）
    "rounded-[var(--corner-md)]",
    // 阴影（对应 Figma: 0px 2px 20px rgba(0,35,82,0.08)）
    "shadow-[var(--shadow-sm)]",
    // 背景
    "bg-[var(--bg-primary)]",
    // 截断溢出，保证分割线横贯全宽
    "overflow-hidden",
  ],
  {
    variants: {
      size: {
        /**
         * sm — 宽度 488px（Figma 示例-数据请求加载尺寸）
         */
        sm: "w-[488px]",
        /**
         * md — 宽度 640px（Figma 基础弹窗尺寸，默认）
         */
        md: "w-[640px]",
        /**
         * lg — 宽度 800px
         */
        lg: "w-[800px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * dialogTitleVariants — 弹窗标题文字
 * align: start=左对齐（默认） | center=居中对齐
 *
 * Figma 实测：16px / font-medium / --text-heading
 * leading-[24px] 对应 Figma title 行高 24px
 */
const dialogTitleVariants = cva(
  [
    "flex-1",
    "my-0",
    "text-[16px] leading-[24px]",
    "font-medium",
    "text-[var(--text-heading)]",
  ],
  {
    variants: {
      align: {
        /**
         * start — 标题左对齐（默认，与关闭按钮 justify-between 配合）
         */
        start: "text-left",
        /**
         * center — 标题居中对齐（在 flex-1 范围内居中）
         */
        center: "text-center",
      },
    },
    defaultVariants: {
      align: "start",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 控制弹窗显示/隐藏 */
  open?: boolean;
  /** 显示状态变更回调 */
  onOpenChange?: (open: boolean) => void;
  /** 是否允许点击遮罩层关闭，默认 true */
  closeOnOverlayClick?: boolean;
}

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogContentVariants> {
  /** 最大高度限制，如 '500px'（用于固定高度 + 内容区滚动场景） */
  maxHeight?: string;
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否隐藏底部分割线，默认 false（标准弹窗显示分割线） */
  noDivider?: boolean;
}

export interface DialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof dialogTitleVariants> {}

export interface DialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/**
 * Dialog — 根容器 + 遮罩层
 * 当 open=true 时渲染全屏遮罩与居中内容。
 * 默认点击遮罩触发 onOpenChange(false)，可通过 closeOnOverlayClick=false 禁用。
 */
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open = false,
      onOpenChange,
      closeOnOverlayClick = true,
      children,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    // Escape 键关闭弹窗
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onOpenChange?.(false);
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open, onOpenChange]);

    if (!open) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onOpenChange?.(false);
      }
      onClick?.(e);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",
          // 遮罩：--overlay-bg = rgba(17,20,26,0.5)，对应 Figma 遮罩层
          "bg-[var(--overlay-bg)]",
          className
        )}
        onClick={handleOverlayClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Dialog.displayName = "Dialog";

/**
 * DialogContent — 弹窗内容卡片（cva 变体载体）
 * 圆角 8px / 阴影 / 白底 / overflow-hidden（保证分割线横贯全宽）
 * 支持 maxHeight 属性限制高度，配合 DialogBody 内滚动使用。
 */
export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(({ className, size, maxHeight, children, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      className={cn(dialogContentVariants({ size, className }))}
      style={maxHeight ? { maxHeight, ...style } : style}
      {...props}
    >
      {children}
    </div>
  );
});

DialogContent.displayName = "DialogContent";

/**
 * DialogHeader — 弹窗头部区域
 * 布局：水平 flex + justify-between，高度自适应内容，内边距 top=16px / x=20px / bottom=16px
 * 默认底部带分割线（--border-color），可通过 noDivider=true 隐藏。
 * 推荐子元素：DialogTitle + DialogClose
 */
export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, noDivider = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row items-center justify-between",
          // 内边距：top=16px，sides=20px（--space-section），bottom=16px；高度由内容自适应
          "pt-[16px] px-[var(--space-section)] pb-[16px]",
          // 下描边 0.5px / --border-color（最近匹配 Figma #E1E6F0）
          !noDivider && "border-b-[0.5px] border-[var(--border-color)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogHeader.displayName = "DialogHeader";

/**
 * DialogTitle — 弹窗标题文字
 * 字号 16px / font-medium / --text-heading
 * align="start"（默认左对齐）或 align="center"（在 flex-1 范围内居中）
 */
export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, align, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(dialogTitleVariants({ align, className }))}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

DialogTitle.displayName = "DialogTitle";

/**
 * DialogClose — 弹窗关闭按钮（X 图标）
 * 尺寸 16×16（--height-icon-small），颜色 --text-secondary，
 * hover 时变为 --text-heading，提供视觉反馈。
 */
export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  DialogCloseProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      aria-label="关闭"
      className={cn(
        "flex items-center justify-center shrink-0",
        "w-[var(--height-icon-small)] h-[var(--height-icon-small)]",
        "text-[var(--text-secondary)]",
        "hover:text-[var(--text-heading)]",
        "transition-colors cursor-pointer",
        className
      )}
      {...props}
    >
      <通用工具关闭 size={16} />
    </button>
  );
});

DialogClose.displayName = "DialogClose";

/**
 * DialogBody — 弹窗主内容区域
 * 内边距 20px（--space-section），flex-1 占满剩余高度，overflow-y-auto 支持滚动。
 * flex-col + gap-[--space-section]：内部子元素间距 20px（Figma 实测）。
 */
export const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 flex flex-col overflow-y-auto",
          "gap-[var(--space-section)]",
          "px-[var(--space-section)] py-[var(--space-section)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogBody.displayName = "DialogBody";

/**
 * DialogFooter — 弹窗底栏按钮容器
 * 水平排列 / 右对齐 / 按钮间距 8px（--space-tight）
 * 内边距 x=20px / bottom=20px
 * 内部直接放置 Button 组件即可。
 */
export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row justify-end items-center",
          "gap-[var(--space-tight)]",
          "px-[var(--space-section)] pb-[var(--space-section)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogFooter.displayName = "DialogFooter";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { dialogContentVariants, dialogTitleVariants };
