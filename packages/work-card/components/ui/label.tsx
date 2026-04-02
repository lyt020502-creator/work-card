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
// Label 表单标签组件
//
// 用于关联表单控件的语义化标签，支持必填标记（红色星号）。
//
// 关键语义变量速查（theme.css :root）：
//   标签文本      --text-heading (#11141A)
//   辅助文本      --text-secondary (#5C6473)
//   禁用文本      --text-disabled (#C7CDD9)
//   必填标记      --status-error (#FF5040)
//   字号/行高     --font-label-size (13px) / --font-label-height (20px)
//   间距          --space-intimate (4px)
// ────────────────────────────────────────────────────────────

const labelVariants = cva(
  [
    "inline-flex items-center",
    "font-['PingFang_SC',sans-serif] font-medium",
    "select-none",
  ],
  {
    variants: {
      /**
       * variant — 标签外观
       * default: 标准深色文本
       * secondary: 辅助灰色文本
       */
      variant: {
        default: [
          "text-[var(--text-heading)]",
          "hover:text-[var(--text-heading)]",
          "active:text-[var(--text-heading)]",
        ],
        secondary: [
          "text-[var(--text-secondary)]",
          "hover:text-[var(--text-secondary)]",
          "active:text-[var(--text-secondary)]",
        ],
      },
      /**
       * size — 标签字号
       * sm: 12px（--font-caption-size）
       * md: 13px（--font-label-size）（默认）
       * lg: 14px（--font-body-md-size）
       */
      size: {
        sm: "text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)]",
        md: "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
        lg: "text-[length:var(--font-body-md-size)] leading-[var(--font-body-md-height)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  /** 是否显示必填标记（红色星号），默认 false */
  required?: boolean;
  /** 是否禁用态（降低不透明度），默认 false */
  disabled?: boolean;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/**
 * Label — 表单标签
 * 语义化 <label> 元素，支持必填星号标记和禁用态。
 * 通过 htmlFor 属性关联对应的表单控件。
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, size, required = false, disabled = false, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          labelVariants({ variant, size, className }),
          disabled && "text-[var(--text-disabled)] hover:text-[var(--text-disabled)] active:text-[var(--text-disabled)] cursor-not-allowed",
        )}
        {...props}
      >
        {children}
        {required && (
          <span
            className="ml-[2px] text-[var(--status-error)] font-normal"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { labelVariants };
