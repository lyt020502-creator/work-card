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
// ScrollArea 自定义滚动条组件
//
// 隐藏浏览器默认滚动条，使用自绘轨道 + 滑块实现主题化滚动条。
// 支持垂直/水平/双向滚动。
//
// 滚动条样式由 component-docs/src/index.css 中的作用域 CSS 类实现
//（Tailwind v4 任意变体对 ::-webkit-scrollbar 伪元素可靠性不足）：
//   .scroll-area-viewport  — 作用于内层滚动 div，定义所有滚动条样式
//   .scroll-area-autohide  — 配合使用，平时透明，hover 时显示（需手动传 autoHide={true}）
//
// 关键语义变量速查（theme.css :root）：
//   滑块颜色      #DDDFE7 — 正常态（rgba(221,223,231,1)，无对应 CSS 变量，使用精确值）
//   滑块 hover    --color-gray-3 (#A5ABB8) — 悬浮态
//   滑块 active   --color-gray-4 (#878D99) — 拖拽态
//   轨道背景      transparent
//   滑块宽度      6px，轨道宽 6px（直接宽度，无 border hack）
//   滑块最小高度  40px
//   圆角          12px（对齐 Figma rounded-[12px]）
//   右边距        2px（内层滚动 div 的 margin-right: 2px 实现）
// ────────────────────────────────────────────────────────────
const scrollAreaVariants = cva(
  [
    "relative overflow-hidden",
  ],
  {
    variants: {
      /**
       * orientation — 滚动方向
       * vertical: 仅垂直滚动（默认）
       * horizontal: 仅水平滚动
       * both: 双向滚动
       */
      orientation: {
        vertical: "",
        horizontal: "",
        both: "",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────
export interface ScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scrollAreaVariants> {
  /** 滚动条粗细（px），默认 6 */
  scrollbarSize?: number;
  /** 是否仅在 hover 时显示滚动条，默认 false */
  autoHide?: boolean;
}

export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 滚动条方向 */
  orientation?: "vertical" | "horizontal";
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/**
 * ScrollArea — 自定义滚动区域容器
 * 隐藏浏览器默认滚动条，通过 CSS 伪元素实现主题化滚动条样式。
 * 滚动条宽度 6px，圆角全圆，颜色跟随主题变量。
 */
export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      orientation = "vertical",
      scrollbarSize = 6,
      autoHide = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // 根据 orientation 决定 overflow 方向
    const overflowClass =
      orientation === "horizontal"
        ? "overflow-x-auto overflow-y-hidden"
        : orientation === "both"
          ? "overflow-auto"
          : "overflow-y-auto overflow-x-hidden";

    return (
      <div
        ref={ref}
        className={cn(scrollAreaVariants({ orientation }), className)}
        {...props}
      >
        <div
          className={cn(
            "h-full mr-[2px] scroll-area-viewport",
            overflowClass,
            // autoHide 模式：平时透明，hover 时显示滚动条（依赖 index.css 中的作用域 CSS 类）
            autoHide && "scroll-area-autohide"
          )}
          style={
            {
              "--scrollbar-size": `${scrollbarSize}px`,
              ...style,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

/**
 * ScrollBar — 可独立使用的滚动条指示器（装饰性）
 * 用于在 ScrollArea 外部显示滚动位置指示，或作为自定义布局参考。
 */
export const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, orientation = "vertical", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[12px]",
          "bg-[#DDDFE7]",
          "hover:bg-[var(--color-gray-3)]",
          "active:bg-[var(--color-gray-4)]",
          "transition-colors duration-150",
          orientation === "vertical"
            ? "w-1.5 min-h-[40px]"
            : "h-1.5 min-w-[40px]",
          className
        )}
        {...props}
      />
    );
  }
);

ScrollBar.displayName = "ScrollBar";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { scrollAreaVariants };
