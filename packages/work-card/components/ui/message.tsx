// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  悬浮菜单图标信息,
  悬浮菜单图标成功,
  悬浮菜单图标警告,
  悬浮菜单图标危险,
  通用工具关闭,
} from "../icons";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// Figma 设计稿颜色映射（Message 全局提示 — 白底阴影浮层风格）：
//   背景：#FFFFFF  → var(--bg-primary)
//   阴影：0px 0px 9.23px 0px rgba(196,205,223,0.4) → var(--message-shadow)
//   圆角：4px       → var(--corner-sm)
//   水平内边距：20px → var(--space-section)
//   图标尺寸：24px  （Figma 实测，组件内直接使用 w-[24px] h-[24px]）
//   图标↔文字间距：6px（介于 --space-intimate(4px) 与 --space-tight(8px) 之间，取 Figma 实测值）
//   文字：14px / var(--text-body) / leading-[22px]
//   关闭图标：16px → var(--height-icon-small)
//
// variant 仅影响默认图标，背景色与阴影在所有变体中保持一致（白底浮层）。
// ────────────────────────────────────────────────────────────
const messageVariants = cva(
  [
    // 布局
    "relative w-fit mx-auto flex flex-row items-center",
    // 白色背景
    "bg-[var(--bg-primary)]",
    // 圆角：Figma 实测 4px → --corner-sm
    "rounded-[var(--corner-sm)]",
    // 阴影：Figma Message 专用阴影 → --message-shadow
    "shadow-[var(--message-shadow)]",
    // 内边距：水平 20px → --space-section；垂直居中达到 48px 最小高度
    "px-[var(--space-section)] py-[12px]",
    // 最小高度与 Figma 一致
    "min-h-[48px]",
    // 字体族
    "font-['PingFang_SC',sans-serif]",
  ],
  {
    variants: {
      /**
       * variant — 语义类型，决定默认图标
       * 所有变体背景色一致（白底），仅图标不同
       */
      variant: {
        /** info — 蓝色信息图标 */
        info: "",
        /** success — 绿色成功图标 */
        success: "",
        /** warning — 橙色警告图标 */
        warning: "",
        /** error — 红色危险图标 */
        error: "",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

// ── variant → 默认图标节点（来自自定义图标库，颜色内置）──────
const defaultIconMap: Record<string, React.ReactNode> = {
  info: <悬浮菜单图标信息 size={24} />,
  success: <悬浮菜单图标成功 size={24} />,
  warning: <悬浮菜单图标警告 size={24} />,
  error: <悬浮菜单图标危险 size={24} />,
};

// ── Part 4: Props 类型定义 ────────────────────────────────────
export interface MessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageVariants> {
  /**
   * 是否显示左侧图标，默认 true。
   * 设为 false 时隐藏左侧图标区域。
   */
  showIcon?: boolean;
  /**
   * 自定义左侧图标节点，覆盖默认图标。
   * 传入 null 时效果等同于 showIcon=false。
   */
  icon?: React.ReactNode;
  /** 是否显示右侧默认关闭按钮（X 图标）。点击后触发 onClose 并隐藏组件。 */
  closeable?: boolean;
  /**
   * 自定义关闭元素，替换默认 X 按钮渲染于右侧。
   * 点击后同样触发 onClose 并隐藏组件。
   */
  closeElement?: React.ReactNode;
  /** 关闭回调，无论使用默认关闭按钮还是自定义关闭元素点击后均触发。 */
  onClose?: () => void;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────
export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      className,
      variant = "info",
      showIcon = true,
      icon,
      closeable,
      closeElement,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(true);

    if (!visible) return null;

    const handleClose = () => {
      setVisible(false);
      onClose?.();
    };

    // 图标节点：showIcon=false 或 icon=null 时不渲染；否则优先用自定义 icon，再用默认图标
    const iconNode: React.ReactNode =
      !showIcon || icon === null
        ? null
        : icon !== undefined
        ? icon
        : defaultIconMap[variant ?? "info"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(messageVariants({ variant, className }))}
        {...props}
      >
        {/* 左侧图标（24px，颜色内置在 SVG 中）*/}
        {iconNode && (
          <span
            className="shrink-0 inline-flex mr-[6px]"
            aria-hidden="true"
          >
            {iconNode}
          </span>
        )}

        {/* 主体文字 */}
        <span
          className={cn(
            "flex-1 text-[length:var(--font-body-md-size)] leading-[22px] font-normal",
            "text-[var(--text-body)]"
          )}
        >
          {children}
        </span>

        {/* 右侧关闭区域：自定义关闭元素 > 默认 X 按钮 */}
        {closeElement ? (
          <div
            role="button"
            tabIndex={0}
            onClick={handleClose}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClose(); } }}
            className="shrink-0 ml-[var(--space-content)] cursor-pointer inline-flex items-center"
          >
            {closeElement}
          </div>
        ) : closeable ? (
          <button
            type="button"
            onClick={handleClose}
            className={cn(
              "shrink-0 ml-[var(--space-content)]",
              "inline-flex items-center justify-center",
              "text-[var(--text-secondary)] hover:text-[var(--text-heading)]",
              "transition-colors cursor-pointer",
              // 关闭按钮尺寸：Figma 实测 16×16px → --height-icon-small
              "w-[var(--height-icon-small)] h-[var(--height-icon-small)]"
            )}
            aria-label="关闭"
          >
            <通用工具关闭 size={16} />
          </button>
        ) : null}
      </div>
    );
  }
);

Message.displayName = "Message";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { messageVariants };
