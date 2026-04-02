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
// Figma 参数映射：
//   分割线颜色   rgba(220,223,229,1) / #DCDFE5 → var(--border-color)   【default】
//               rgba(244,245,247,1) / #F4F5F7 → var(--divider-color)  【muted】
//   带文字渐变   rgba(190,194,204,1) / #BEC2CC → var(--color-gray-2) 最近匹配
//   文字颜色     rgba(17,20,26,1)   / #11141A → var(--text-heading)
//   文字字号     13px → var(--font-label-size)
//   文字行高     20px → var(--font-label-height)
//   竖直高度     由父容器 flex 上下文决定（self-stretch）
//
const separatorVariants = cva(
  ["shrink-0"],
  {
    variants: {
      /**
       * orientation — 分割线方向
       * horizontal（默认）：横向 1px 线，撑满父容器宽度
       * vertical：纵向 1px 线，在 flex 容器内自动撑满行高
       */
      orientation: {
        horizontal: "block h-px w-full",
        vertical: "inline-block w-px self-stretch",
      },
      /**
       * color — 分割线颜色
       * default：--border-color (#DCDFE5)，常规分割线
       * muted：--divider-color (#F4F5F7)，更轻量的区域分割
       */
      color: {
        default: "bg-[var(--border-color)]",
        muted: "bg-[var(--divider-color)]",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      color: "default",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────
// Omit<...,'color'> 避免与 HTML 历史遗留 color 属性产生类型冲突
export interface SeparatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof separatorVariants> {
  /**
   * 分割线方向：horizontal（水平，默认）| vertical（垂直）
   * 传入 children 时仅对 horizontal 有效，将渲染带文字的渐变分割线
   */
  orientation?: "horizontal" | "vertical";
  /** 分割线颜色：default（--border-color）| muted（--divider-color） */
  color?: "default" | "muted";
}

// ── Part 5: 组件实现 ─────────────────────────────────────────
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      color = "default",
      children,
      ...props
    },
    ref
  ) => {
    // 带文字的水平分割线（仅 orientation="horizontal" + 有 children 时生效）
    // 渐变端点使用 --color-gray-2（#C7CDD9），为 Figma #BEC2CC 最近 token 映射
    if (children && orientation === "horizontal") {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn(
            "flex items-center w-full gap-[var(--space-tight)]",
            className
          )}
          {...props}
        >
          {/* 左侧渐变：透明 → --color-gray-2 */}
          <div
            className="flex-1 h-px shrink"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, var(--color-gray-2) 70%)",
            }}
          />
          {/* 中间文字 */}
          <span
            className={cn(
              "text-[length:var(--font-label-size)]",
              "leading-[var(--font-label-height)]",
              "font-['PingFang_SC',sans-serif] font-normal",
              "text-[var(--text-heading)]",
              "whitespace-nowrap shrink-0"
            )}
          >
            {children}
          </span>
          {/* 右侧渐变：--color-gray-2 → 透明 */}
          <div
            className="flex-1 h-px shrink"
            style={{
              background:
                "linear-gradient(90deg, var(--color-gray-2) 30%, rgba(255,255,255,0) 100%)",
            }}
          />
        </div>
      );
    }

    // 简单水平分割线 / 垂直分割线
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation === "vertical" ? "vertical" : "horizontal"}
        className={cn(separatorVariants({ orientation, color }), className)}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { separatorVariants };
