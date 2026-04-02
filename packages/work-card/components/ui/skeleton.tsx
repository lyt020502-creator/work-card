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
// Skeleton 骨架屏加载占位组件
//
// 关键语义变量速查（theme.css :root）：
//   背景色  --bg-secondary (#F2F4F7) — 骨架块基色
//   圆角    --corner-sm (4px) / --corner-md (8px) / --corner-pill (9999px)
//   动画    使用 Tailwind animate-pulse 实现呼吸闪烁效果
// ────────────────────────────────────────────────────────────
const skeletonVariants = cva(
  [
    // 基础：骨架块背景 + 脉冲动画
    "bg-[var(--bg-secondary)]",
    "animate-pulse",
  ],
  {
    variants: {
      /**
       * variant — 骨架块形状
       * rectangular: 矩形（默认），适用于文本行/图片/卡片占位
       * circular: 圆形，适用于头像等占位
       */
      variant: {
        rectangular: "rounded-[var(--corner-sm)]",
        circular: "rounded-[var(--corner-pill)]",
      },
      /**
       * size — 预设尺寸（基于常见骨架场景）
       * sm: 高 16px，单行文字占位
       * md: 高 24px，标题/中等元素占位（默认）
       * lg: 高 32px，按钮/输入框占位
       */
      size: {
        sm: "h-[var(--comp-height-2xs)] w-full",
        md: "h-[var(--comp-height-md)] w-full",
        lg: "h-[var(--comp-height-lg)] w-full",
      },
    },
    defaultVariants: {
      variant: "rectangular",
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────
export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /** 自定义宽度，如 '200px' 或 '50%' */
  width?: string | number;
  /** 自定义高度，如 '40px'（覆盖 size 预设高度） */
  height?: string | number;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, size, width, height, style, ...props }, ref) => {
    const customStyle: React.CSSProperties = {
      ...style,
      ...(width !== undefined
        ? { width: typeof width === "number" ? `${width}px` : width }
        : {}),
      ...(height !== undefined
        ? { height: typeof height === "number" ? `${height}px` : height }
        : {}),
    };

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, size, className }))}
        style={Object.keys(customStyle).length > 0 ? customStyle : style}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { skeletonVariants };
