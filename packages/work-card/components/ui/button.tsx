// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { 按钮加载 } from "../icons";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// 颜色引用规则：
//   ① 语义变量 → var(--语义变量)，来自 theme.css :root（HEX 值）
//   ② @theme 工具类 → Tailwind v4 类名（bg-primary, text-text-heading 等）
//
// 关键语义变量速查（theme.css :root）：
//   品牌色  --brand-base (#3377FF) / --brand-hover (#5993FF)
//           --brand-active (#215BD9) / --brand-disabled (#80AEFF)
//           --brand-light-bg (#F2F8FF)
//   文本色  --text-heading (#11141A) / --text-body (#11141A)
//           --text-help (#878D99) / --text-disabled (#C7CDD9)
//   背景色  --bg-primary (#FFFFFF) / --bg-secondary (#F2F4F7)
//           --bg-secondary-hover (#EDF0F5) / --bg-secondary-active (#E8E9EB)
//           --bg-tertiary (#F4F5F7) / --bg-quaternary (#F7F8FA)
//           --bg-quinary (#EDF0F5)
//           --bg-ghost-hover (#F7F8FA) / --bg-ghost-active (#EDF0F5)
//   边框色  --border-color (#DCDFE5) / --divider-color (#F4F5F7)
//   状态色  --status-error (#FF5040) / --status-error-hover (#FF7066)
//           --status-error-active (#D93936)
// ────────────────────────────────────────────────────────────
const buttonVariants = cva(
  [
    // 布局与排版
    "inline-flex items-center justify-center gap-1.5",
    "font-['PingFang_SC',sans-serif] font-normal whitespace-nowrap",
    "rounded-[var(--radius-full)]",
    // 过渡
    "transition-colors duration-150",
    // 交互
    "cursor-pointer select-none",
    // 默认排版（所有 size 共用 12px / 18px，variant 可覆盖）
    "text-[length:var(--font-size-xs)] leading-[var(--font-height-xs)]",
    // 焦点可访问性
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-[var(--brand-base)] focus-visible:ring-offset-1",
    // 禁用态（全局覆盖）
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        /**
         * primary — 主要操作，高强调实色
         * --brand-base (#3377FF) → --brand-hover (#5993FF) → --brand-active (#215BD9)
         */
        primary: [
          "bg-[var(--brand-base)]",
          "text-[var(--bg-primary)]",
          "border border-transparent",
          "hover:bg-[var(--brand-hover)]",
          "active:bg-[var(--brand-active)]",
        ],
        /**
         * secondary — 次要操作，灰色低强调
         * --bg-secondary (#F2F4F7) → --bg-secondary-hover (#EDF0F5) → --bg-secondary-active (#E8E9EB)
         */
        secondary: [
          "bg-[var(--bg-secondary)]",
          "text-[var(--text-heading)]",
          "border border-transparent",
          "hover:bg-[var(--bg-secondary-hover)]",
          "active:bg-[var(--bg-secondary-active)]",
        ],
        /**
         * outline — 线框按钮，透明底 + 灰色边框
         * --bg-primary → --bg-secondary (#F2F4F7) → --bg-secondary-active (#E8E9EB)
         */
        outline: [
          "bg-[var(--bg-primary)]",
          "text-[var(--text-heading)]",
          "border border-[var(--color-gray-2)]",
          "hover:bg-[var(--bg-secondary)]",
          "active:bg-[var(--bg-secondary-active)]",
        ],
        /**
         * outline-primary — 品牌蓝线框按钮（工作卡主要按钮）
         * Figma「⭐️按钮组件 — 主要按钮」五态：
         *   默认：白底 + 蓝边框 + 蓝文字 13px
         *   悬浮：背景 rgba(51,119,255,0.10)
         *   点击：背景 rgba(51,119,255,0.30)
         *   禁用：opacity 0.40
         *   加载：Spinner（由组件 loading prop 控制）
         * 高度固定 32px（由 compoundVariants 强制覆盖 size）
         */
        "outline-primary": [
          "bg-[var(--bg-primary)]",
          "text-[var(--brand-base)]",
          "text-[length:13px] leading-[var(--font-height-xs)]",
          "border border-[var(--brand-base)]",
          "hover:bg-[rgba(51,119,255,0.10)]",
          "active:bg-[rgba(51,119,255,0.30)]",
          "disabled:opacity-40",
        ],
        /**
         * outline-destructive — 红色线框按钮（危险操作场景）
         * Figma「⭐️按钮组件 — 主要按钮（红色）」四态：
         *   默认：白底 + 红边框 + 红文字 13px
         *   悬浮：背景 rgba(255,80,64,0.10)
         *   点击：背景 rgba(255,80,64,0.30)
         *   禁用：opacity 0.40
         * 高度固定 32px（由 compoundVariants 强制覆盖 size）
         */
        "outline-destructive": [
          "bg-[var(--bg-primary)]",
          "text-[var(--status-error)]",
          "text-[length:13px] leading-[var(--font-height-xs)]",
          "border border-[var(--status-error)]",
          "hover:bg-[rgba(255,80,64,0.10)]",
          "active:bg-[rgba(255,80,64,0.30)]",
          "disabled:opacity-40",
        ],
        /**
         * ghost — 幽灵按钮，无边框极低感知
         * transparent → --bg-ghost-hover (#F7F8FA) → --bg-ghost-active (#EDF0F5)
         */
        ghost: [
          "bg-transparent",
          "text-[var(--text-heading)]",
          "border border-transparent",
          "hover:bg-[var(--bg-ghost-hover)]",
          "active:bg-[var(--bg-ghost-active)]",
        ],
        /**
         * destructive — 独立危险操作按钮（如页面级删除入口）
         * 注意：AlertDialog 确认删除场景中不使用此变体，
         *       应使用 primary（蓝色）作为确认按钮 + outline-destructive 作为取消按钮
         * --status-error (#FF5040) → --status-error-hover (#FF7066) → --status-error-active (#D93936)
         */
        destructive: [
          "bg-[var(--status-error)]",
          "text-[var(--bg-primary)]",
          "border border-transparent",
          "hover:bg-[var(--status-error-hover)]",
          "active:bg-[var(--status-error-active)]",
        ],
      },
      size: {
        /**
         * sm — 高度 24px（--comp-height-md），水平内边距 12px
         * 字号继承 base 默认 12px（variant 可覆盖为 13px）
         */
        sm: "h-[var(--comp-height-md)] px-3",
        /**
         * md（默认）— 高度 28px，水平内边距 18px
         * 字号继承 base 默认 12px（variant 可覆盖为 13px）
         * Note: 28px 无对应 token，来源于 Figma 设计稿「主要按钮-28px」
         */
        md: "h-7 px-[18px]",
        /**
         * lg — 高度 32px（--comp-height-lg），水平内边距 22px
         * 字号继承 base 默认 12px（variant 可覆盖为 13px）
         */
        lg: "h-[var(--comp-height-lg)] px-[22px]",
      },
    },
    compoundVariants: [
      /**
       * 工作卡按钮高度固定 32px，不随 size 变化。
       * outline-primary / outline-destructive 为工作卡专用变体，
       * compoundVariants 排序位于 size 之后，twMerge 会以此覆盖 size 的高度。
       */
      {
        variant: ["outline-primary", "outline-destructive"],
        className: "h-8",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** 是否处于加载中状态；加载时禁用交互，左侧显示旋转 Spinner */
  loading?: boolean;
  /** 按钮左侧图标节点（loading=true 时被 Spinner 替代） */
  leftIcon?: React.ReactNode;
  /** 按钮右侧图标节点（loading=true 时自动隐藏） */
  rightIcon?: React.ReactNode;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Spinner 尺寸随 size 自适应（单位：px，对应 sm=12 / md=16 / lg=16）
    // md=16 对齐 Figma「主要按钮-28px」设计稿中 16×16 的加载图标
    const spinnerSize =
      size === "sm" ? 12 : 16;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {loading ? (
          <按钮加载
            size={spinnerSize}
            className="animate-spin shrink-0"
            aria-hidden="true"
          />
        ) : leftIcon ? (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}

        {children}

        {!loading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { buttonVariants };
