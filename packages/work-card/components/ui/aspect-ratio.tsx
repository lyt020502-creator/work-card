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
// AspectRatio 宽高比容器组件
//
// 使用 CSS padding-bottom 百分比实现宽高比约束，
// 子元素通过 absolute 定位填满容器。
//
// 关键语义变量速查（theme.css :root）：
//   圆角    --corner-none (0px) / --corner-sm (4px) / --corner-md (8px)
// ────────────────────────────────────────────────────────────
const aspectRatioVariants = cva(
  [
    "relative w-full overflow-hidden",
  ],
  {
    variants: {
      /**
       * ratio — 预设宽高比
       * 16/9: 视频/横幅常用
       * 4/3: 传统屏幕比例
       * 1/1: 正方形（默认）
       * 21/9: 超宽屏
       */
      ratio: {
        "16/9": "[aspect-ratio:16/9]",
        "4/3": "[aspect-ratio:4/3]",
        "1/1": "[aspect-ratio:1/1]",
        "21/9": "[aspect-ratio:21/9]",
      },
    },
    defaultVariants: {
      ratio: "16/9",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────
export interface AspectRatioProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aspectRatioVariants> {
  /**
   * 自定义宽高比数值（如 16/9 = 1.778），优先于 ratio 变体。
   * 传入后忽略 ratio 预设，使用 CSS aspect-ratio 属性。
   */
  value?: number;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio, value, children, style, ...props }, ref) => {
    // 如果传入自定义 value，使用 inline style 覆盖
    const customStyle: React.CSSProperties = value
      ? { aspectRatio: value, ...style }
      : { ...style };

    return (
      <div
        ref={ref}
        className={cn(
          value
            ? "relative w-full overflow-hidden"
            : aspectRatioVariants({ ratio, className })
        )}
        style={customStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { aspectRatioVariants };
