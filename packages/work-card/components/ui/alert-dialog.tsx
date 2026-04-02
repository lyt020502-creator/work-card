// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// AlertDialog 内容卡片样式（复合组件，cva 作用于 Content 层）
//
// 关键语义变量速查（theme.css :root）：
//   圆角    --corner-md (8px → --radius-md)
//   阴影    --shadow-sm (0px 2px 12px 0px #11141A14)
//           Figma 原值: 0px 2px 20px rgba(0,35,82,0.08)，取最近 token
//   背景    --bg-primary (#FFFFFF)
//   内边距  --space-section (20px)
//   标题    --font-body-md-size (14px) / --font-weight-medium (500)
//   正文    --font-label-size (13px) / --font-weight-regular (400)
//   文本色  --text-heading (#11141A) / --text-body (#11141A)
//   间距    --space-tight (8px) 标题↔正文 / --space-group (16px) 内容↔底栏
// ────────────────────────────────────────────────────────────
const alertDialogContentVariants = cva(
  [
    // 布局
    "flex flex-col",
    // 字体
    "font-['PingFang_SC',sans-serif]",
    // 圆角
    "rounded-[var(--corner-md)]",
    // 阴影（对应 Figma: 0px 2px 20px 0px rgba(0,35,82,0.08)）
    "shadow-[var(--shadow-sm)]",
    // 背景
    "bg-[var(--bg-primary)]",
    // 内边距
    "p-[var(--space-section)]",
  ],
  {
    variants: {
      size: {
        /**
         * sm — 宽度 264px（Figma 设计稿默认尺寸）
         */
        sm: "w-[264px]",
        /**
         * md — 宽度 320px
         */
        md: "w-[320px]",
        /**
         * lg — 宽度 400px
         */
        lg: "w-[400px]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface AlertDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 控制对话框显示/隐藏 */
  open?: boolean;
  /** 显示状态变更回调 */
  onOpenChange?: (open: boolean) => void;
}

export interface AlertDialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertDialogContentVariants> {}

export interface AlertDialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface AlertDialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 标题左侧图标节点（尺寸建议 20×20，对应 --height-icon-regular） */
  icon?: React.ReactNode;
}

export interface AlertDialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface AlertDialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/**
 * AlertDialog — 根容器 + 遮罩层
 * 当 open=true 时渲染全屏遮罩与居中内容，点击遮罩触发 onOpenChange(false)
 */
export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ open = false, onOpenChange, children, className, onClick, ...props }, ref) => {
    // Escape 键关闭对话框
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
      // 仅点击遮罩层本身（非子元素）时关闭
      if (e.target === e.currentTarget) {
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

AlertDialog.displayName = "AlertDialog";

/**
 * AlertDialogContent — 对话框内容卡片（cva 变体载体）
 * 圆角 8px / 阴影 / 白底 / 内边距 20px
 */
export const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(({ className, size, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="alertdialog"
      className={cn(alertDialogContentVariants({ size, className }))}
      {...props}
    >
      {children}
    </div>
  );
});

AlertDialogContent.displayName = "AlertDialogContent";

/**
 * AlertDialogHeader — 标题 + 正文区域容器
 * 底部间距 16px（--space-group），与 Footer 分隔
 */
export const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  AlertDialogHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col mb-[var(--space-group)]", className)}
      {...props}
    >
      {children}
    </div>
  );
});

AlertDialogHeader.displayName = "AlertDialogHeader";

/**
 * AlertDialogTitle — 标题文本
 * 字号 14px（--font-body-md-size）/ medium / --text-heading (#11141A)
 * 底部间距 8px（--space-tight），可通过 icon 属性渲染左侧图标
 */
export const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(({ className, icon, children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        icon ? "flex items-center" : "",
        "mb-[var(--space-tight)]",
        "text-[length:var(--font-body-md-size)] leading-[var(--font-body-md-height)]",
        "font-medium",
        "text-[var(--text-heading)]",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "inline-flex shrink-0 mr-[var(--space-tight)]",
            "w-[var(--height-icon-regular)] h-[var(--height-icon-regular)]"
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {children}
    </h3>
  );
});

AlertDialogTitle.displayName = "AlertDialogTitle";

/**
 * AlertDialogDescription — 正文描述
 * 字号 13px（--font-label-size）/ regular / --text-body (#11141A)
 */
export const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
        "font-normal",
        "text-[var(--text-body)]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

AlertDialogDescription.displayName = "AlertDialogDescription";

/**
 * AlertDialogFooter — 底栏按钮容器
 * 水平排列 / 右对齐 / 按钮间距 8px（--space-tight）
 * 内部直接放置 Button 组件即可
 */
export const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  AlertDialogFooterProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-row justify-end items-center",
        "gap-[var(--space-tight)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

AlertDialogFooter.displayName = "AlertDialogFooter";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { alertDialogContentVariants };
