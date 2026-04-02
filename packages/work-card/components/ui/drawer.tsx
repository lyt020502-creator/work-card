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
// Drawer 抽屉面板组件（复合组件）
//
// 从屏幕边缘滑出的面板，结构与 Dialog 类似：
// Drawer → DrawerContent → (DrawerHeader + DrawerBody + DrawerFooter)
//
// 关键语义变量速查（theme.css :root）：
//   背景色        --bg-primary (#FFFFFF)
//   遮罩          --overlay-bg (rgba(17,20,26,0.5))
//   标题文字      --text-heading (#11141A)，16px / font-medium
//   边框色        --border-color (#DCDFE5)
//   阴影          --shadow-md
//   圆角          --corner-md (8px)
//   间距          --space-tight (8px) / --space-section (20px)
//   关闭按钮色    --text-secondary (#5C6473)
// ────────────────────────────────────────────────────────────

/** 抽屉内容面板样式 */
const drawerContentVariants = cva(
  [
    "fixed z-50",
    "flex flex-col",
    "bg-[var(--bg-primary)]",
    "shadow-[var(--shadow-md)]",
    "font-['PingFang_SC',sans-serif]",
    "overflow-hidden",
    "transition-transform duration-300 ease-in-out",
  ],
  {
    variants: {
      /**
       * placement — 抽屉弹出方向
       * right: 从右侧滑入（默认）
       * left: 从左侧滑入
       * top: 从顶部滑入
       * bottom: 从底部滑入
       */
      placement: {
        right: "top-0 right-0 h-full rounded-l-[var(--corner-md)]",
        left: "top-0 left-0 h-full rounded-r-[var(--corner-md)]",
        top: "top-0 left-0 w-full rounded-b-[var(--corner-md)]",
        bottom: "bottom-0 left-0 w-full rounded-t-[var(--corner-md)]",
      },
      /**
       * size — 抽屉尺寸（宽度 or 高度取决于 placement）
       * sm: 360px
       * md: 480px（默认）
       * lg: 640px
       */
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      // 水平抽屉（left/right）→ 宽度
      { placement: "right", size: "sm", className: "w-[360px]" },
      { placement: "right", size: "md", className: "w-[480px]" },
      { placement: "right", size: "lg", className: "w-[640px]" },
      { placement: "left", size: "sm", className: "w-[360px]" },
      { placement: "left", size: "md", className: "w-[480px]" },
      { placement: "left", size: "lg", className: "w-[640px]" },
      // 垂直抽屉（top/bottom）→ 高度
      { placement: "top", size: "sm", className: "h-[280px]" },
      { placement: "top", size: "md", className: "h-[400px]" },
      { placement: "top", size: "lg", className: "h-[560px]" },
      { placement: "bottom", size: "sm", className: "h-[280px]" },
      { placement: "bottom", size: "md", className: "h-[400px]" },
      { placement: "bottom", size: "lg", className: "h-[560px]" },
    ],
    defaultVariants: {
      placement: "right",
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 控制抽屉显示/隐藏 */
  open?: boolean;
  /** 显示状态变更回调 */
  onOpenChange?: (open: boolean) => void;
  /** 是否允许点击遮罩层关闭，默认 true */
  closeOnOverlayClick?: boolean;
}

export interface DrawerContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerContentVariants> {}

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否隐藏底部分割线，默认 false */
  noDivider?: boolean;
}

export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface DrawerCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/**
 * Drawer — 抽屉根容器 + 遮罩层
 * 当 open=true 时渲染全屏遮罩，点击遮罩或按 Escape 键关闭。
 */
export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
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
    // Escape 键关闭
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
          "fixed inset-0 z-50",
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

Drawer.displayName = "Drawer";

/**
 * DrawerContent — 抽屉内容面板
 * 从指定方向滑入，支持 placement 和 size 变体。
 */
export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, placement, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={cn(drawerContentVariants({ placement, size, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerContent.displayName = "DrawerContent";

/**
 * DrawerHeader — 抽屉头部区域
 * 水平排列标题与关闭按钮，默认底部带分割线。
 */
export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, noDivider = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row items-center justify-between shrink-0",
          "pt-[16px] px-[var(--space-section)] pb-[16px]",
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

DrawerHeader.displayName = "DrawerHeader";

/**
 * DrawerTitle — 抽屉标题文字
 * 16px / font-medium / --text-heading
 */
export const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          "flex-1 my-0",
          "text-[16px] leading-[24px] font-medium",
          "text-[var(--text-heading)]",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

DrawerTitle.displayName = "DrawerTitle";

/**
 * DrawerClose — 抽屉关闭按钮（X 图标）
 * 与 DialogClose 样式一致。
 */
export const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ className, ...props }, ref) => {
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
          "active:text-[var(--text-heading)]",
          "transition-colors cursor-pointer",
          className
        )}
        {...props}
      >
        <通用工具关闭 size={16} />
      </button>
    );
  }
);

DrawerClose.displayName = "DrawerClose";

/**
 * DrawerBody — 抽屉主内容区域
 * flex-1 占满剩余高度，overflow-y-auto 支持滚动。
 */
export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 flex flex-col overflow-y-auto",
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

DrawerBody.displayName = "DrawerBody";

/**
 * DrawerFooter — 抽屉底栏按钮容器
 * 水平排列 / 右对齐 / 按钮间距 8px
 */
export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row justify-end items-center shrink-0",
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

DrawerFooter.displayName = "DrawerFooter";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { drawerContentVariants };
