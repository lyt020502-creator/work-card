// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { 通用工具关闭, 大模型添加 } from "../icons";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// Figma 实测 → Token 映射（badge标签 node-id=6-491）：
//   默认背景   rgba(238,240,245,1) ≈ --bg-secondary-hover (#EDF0F5)
//   hover 背景 rgba(51,119,255,0.1) = --tag-info-bg
//   选中背景   rgba(51,119,255,0.2) —— 无对应 token，直接写 rgba
//   尺寸：
//     sm  h-16px (--comp-height-2xs) px-4px (--space-intimate) font-10px
//     md  h-18px (--comp-height-xs)  px-4px (--space-intimate) font-11px  ← 默认
//     lg  h-20px (--comp-height-sm)  px-8px (--space-tight)   font-12px (--font-size-xs)
//   圆角：2px (--radius-xs)
//   关闭图标：10×10px (通用工具关闭 from ../icons)
//   前缀图标：16×16px（由调用方传入，须为图标库图标）；add 变体默认 大模型添加 12×12
//
// 多色变体（14 色，均使用 color-* 原始色板 token）：
//   skyblue  → --color-skyblue-0 / --color-skyblue-6
//   lakeblue → --color-lakeblue-0 / --color-lakeblue-6
//   blue     → --color-brandblue-0 / --color-brandblue-5
//   violet   → --color-violet-0 / --color-violet-5
//   purple   → --color-redpurple-0 / --color-redpurple-5
//   magenta  → --color-magenta-0 / --color-magenta-5
//   red      → --color-red-0 / --color-red-5
//   orange   → --color-orange-0 / --color-orange-5
//   yellow   → --color-yellow-0 / --color-yellow-6
//   gold     → --color-apricot-0 / --color-apricot-6
//   lime     → --color-grassgreen-0 / --color-grassgreen-6
//   teal     → --color-viridity-0 / --color-viridity-6
//   cyan     → --color-cyan-0 / --color-cyan-6
//   gray     → --color-gray-1 / --color-gray-4
// ────────────────────────────────────────────────────────────
const tagVariants = cva(
  [
    // 布局
    "inline-flex items-center justify-center gap-[2px]",
    // 圆角
    "rounded-[var(--radius-xs)]",
    // 排版
    "font-['PingFang_SC',sans-serif] font-normal whitespace-nowrap",
    // 过渡
    "transition-colors duration-150",
  ],
  {
    variants: {
      variant: {
        /**
         * default — 默认中性标签
         * 正常态 ≈ --bg-secondary-hover；hover 态品牌蓝 10%
         */
        default: [
          "bg-[var(--bg-secondary-hover)] text-[var(--text-heading)]",
          "hover:bg-[var(--tag-info-bg)]",
        ],
        /**
         * add — 「添加标签」占位态
         * 背景与 default 相同，文字使用 --text-disabled（Figma: #BEC2CC ≈ --color-gray-2）
         */
        add: [
          "bg-[var(--bg-secondary-hover)] text-[var(--text-disabled)]",
          "cursor-pointer",
          "hover:bg-[var(--tag-info-bg)]",
        ],
        // ── 多色变体 ────────────────────────────────────────
        /** 天蓝 */
        skyblue: "bg-[var(--color-skyblue-0)] text-[var(--color-skyblue-6)]",
        /** 湖蓝 */
        lakeblue: "bg-[var(--color-lakeblue-0)] text-[var(--color-lakeblue-6)]",
        /** 品牌蓝 */
        blue: "bg-[var(--color-brandblue-0)] text-[var(--color-brandblue-5)]",
        /** 紫罗兰 */
        violet: "bg-[var(--color-violet-0)] text-[var(--color-violet-5)]",
        /** 紫色 */
        purple: "bg-[var(--color-redpurple-0)] text-[var(--color-redpurple-5)]",
        /** 品红 */
        magenta: "bg-[var(--color-magenta-0)] text-[var(--color-magenta-5)]",
        /** 红色 */
        red: "bg-[var(--color-red-0)] text-[var(--color-red-5)]",
        /** 橙色 */
        orange: "bg-[var(--color-orange-0)] text-[var(--color-orange-5)]",
        /** 黄色 */
        yellow: "bg-[var(--color-yellow-0)] text-[var(--color-yellow-6)]",
        /** 金色 */
        gold: "bg-[var(--color-apricot-0)] text-[var(--color-apricot-6)]",
        /** 草绿 */
        lime: "bg-[var(--color-grassgreen-0)] text-[var(--color-grassgreen-6)]",
        /** 青绿 */
        teal: "bg-[var(--color-viridity-0)] text-[var(--color-viridity-6)]",
        /** 青色 */
        cyan: "bg-[var(--color-cyan-0)] text-[var(--color-cyan-6)]",
        /** 灰色 */
        gray: "bg-[var(--color-gray-1)] text-[var(--color-gray-4)]",
      },
      size: {
        /**
         * sm — 高度 16px（--comp-height-2xs），水平内边距 4px（--space-intimate），字号 10px
         */
        sm: "h-[var(--comp-height-2xs)] px-[var(--space-intimate)] text-[10px] leading-normal",
        /**
         * md（默认）— 高度 18px（--comp-height-xs），水平内边距 4px（--space-intimate），字号 11px
         * Figma 注：「推荐及默认尺寸为「中」」
         */
        md: "h-[var(--comp-height-xs)] px-[var(--space-intimate)] text-[11px] leading-[12px]",
        /**
         * lg — 高度 20px（--comp-height-sm），水平内边距 8px（--space-tight），字号 12px（--font-size-xs）
         */
        lg: "h-[var(--comp-height-sm)] px-[var(--space-tight)] text-[length:var(--font-size-xs)] leading-[var(--font-height-xs)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────
export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /** 是否显示右侧关闭按钮 */
  closeable?: boolean;
  /** 点击关闭按钮时的回调 */
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 标签左侧前缀图标，须使用图标库（../icons）中的图标（Figma 建议 16×16）；add 变体未传时自动使用 大模型添加（12×12） */
  icon?: React.ReactNode;
  /** 是否禁用（内容整体降为 40% 透明度，禁止交互） */
  disabled?: boolean;
  /** 是否选中（仅对 variant="default" 生效，呈现品牌蓝 20% 背景） */
  checked?: boolean;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant,
      size,
      closeable,
      onClose,
      icon,
      disabled,
      checked,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          tagVariants({ variant, size }),
          // 选中态：品牌蓝 20% 背景，覆盖 hover 态
          checked && "bg-[rgba(51,119,255,0.2)] hover:bg-[rgba(51,119,255,0.2)] w-[64px]",
          // 禁用态：整体降低透明度 + 禁止交互
          disabled && "opacity-40 pointer-events-none select-none",
          // closeable 时左右内边距收窄为 4px（覆盖 lg 的 8px）
          closeable && "px-[var(--space-intimate)]",
          className
        )}
        {...props}
      >
        {/* 前缀图标：add 变体未传 icon 时自动使用 大模型添加（图标库，12×12） */}
        {(icon || variant === "add") && (
          <span className="inline-flex shrink-0 items-center" aria-hidden="true">
            {icon ?? <大模型添加 size={12} />}
          </span>
        )}

        {/* 标签文本 */}
        {children}

        {/* 关闭按钮：hover 时图标高亮为品牌蓝 */}
        {closeable && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "inline-flex shrink-0 items-center cursor-pointer",
              "text-current opacity-50",
              "hover:opacity-100 hover:text-[var(--brand-base)]",
              "transition-all duration-150",
              "focus-visible:outline-none"
            )}
            aria-label="移除标签"
          >
            <通用工具关闭 size={10} />
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = "Tag";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { tagVariants };
