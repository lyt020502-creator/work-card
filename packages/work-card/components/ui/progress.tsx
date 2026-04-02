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
const progressVariants = cva(
  [
    // 布局与排版
    "flex flex-col",
    // 过渡
    "transition-all duration-300",
  ],
  {
    variants: {
      variant: {
        /**
         * light — 亮色模式进度条
         * 白色背景，深色文字，品牌蓝进度条
         */
        light: [
          "bg-[var(--bg-primary)]",
          "text-[var(--text-heading)]",
        ],
        /**
         * dark — 暗色模式进度条
         * 深色背景，白色文字
         */
        dark: [
          "bg-[var(--color-gray-9)]",
          "text-[var(--bg-primary)]",
        ],
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "md",
    },
  }
);

// 标题样式变体
const titleVariants = cva("font-medium", {
  variants: {
    variant: {
      light: "text-[var(--text-heading)]",
      dark: "text-[var(--bg-primary)]",
    },
    size: {
      sm: "text-[length:var(--font-size-xs)]",
      md: "text-[length:var(--font-size-sm)]",
      lg: "text-[length:var(--font-size-md)]",
    },
  },
  defaultVariants: {
    variant: "light",
    size: "md",
  },
});

// 辅助信息样式变体
const infoVariants = cva("", {
  variants: {
    variant: {
      light: "text-[var(--text-secondary)]",
      dark: "text-[var(--color-gray-3)]",
    },
    size: {
      sm: "text-[length:var(--font-size-xs)]",
      md: "text-[length:var(--font-size-xs)]",
      lg: "text-[length:var(--font-size-sm)]",
    },
  },
  defaultVariants: {
    variant: "light",
    size: "md",
  },
});

// ── Part 4: Props 类型定义 ────────────────────────────────────
export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /** 进度条标题 */
  title?: React.ReactNode;
  /** 进度条辅助信息 */
  info?: React.ReactNode;
  /** 当前进度值（0-100） */
  value: number;
  /** 是否显示进度百分比 */
  showPercent?: boolean;
  /** 进度条高度 */
  strokeHeight?: number;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      variant = "light",
      size = "md",
      title,
      info,
      value,
      showPercent = true,
      strokeHeight = 5,
      style,
      ...props
    },
    ref
  ) => {
    // 进度值 clamped 到 0-100
    const clampedValue = Math.min(100, Math.max(0, value));

    // 进度条轨道和填充的背景色
    const trackBg = variant === "dark" ? "var(--color-gray-7)" : "var(--color-gray-2)";
    const fillColor = "var(--brand-base)";

    // 百分比文字颜色
    const percentColor = variant === "dark" ? "var(--bg-primary)" : "var(--text-secondary)";

    // 进度条容器高度（根据strokeHeight）
    const trackHeight = strokeHeight;

    return (
      <div
        ref={ref}
        className={cn(progressVariants({ variant, size, className }))}
        style={style}
        {...props}
      >
        {/* 标题 */}
        {title && (
          <div className={cn(titleVariants({ variant, size }))}>
            {title}
          </div>
        )}

        {/* 进度条区域 */}
        <div className="flex flex-row items-center w-full">
          {/* 进度条轨道 */}
          <div
            className="flex-1 rounded-full overflow-hidden"
            style={{
              height: trackHeight,
              backgroundColor: trackBg,
            }}
          >
            {/* 进度条填充 */}
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${clampedValue}%`,
                backgroundColor: fillColor,
              }}
            />
          </div>

          {/* 百分比显示 */}
          {showPercent && (
            <div
              className={clsx(
                "text-center shrink-0",
                size === "sm" && "w-6 ml-1.5 text-[length:var(--font-size-xs)]",
                size === "md" && "w-[31px] ml-1.5 text-[length:var(--font-size-xs)]",
                size === "lg" && "w-8 ml-2 text-[length:var(--font-size-sm)]"
              )}
              style={{ color: percentColor }}
            >
              {clampedValue}%
            </div>
          )}
        </div>

        {/* 辅助信息 */}
        {info && (
          <div className={cn(infoVariants({ variant, size }))}>
            {info}
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { progressVariants };
