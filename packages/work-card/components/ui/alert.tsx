// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";
import {
  悬浮菜单图标信息,
  悬浮菜单图标成功,
  悬浮菜单图标警告,
  悬浮菜单图标危险,
} from "../icons";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// Figma 设计稿颜色映射（来自 theme.css Alert 专属 token）：
//   info    背景 #EBF3FF → var(--alert-info-bg)
//   success 背景 #DCF5E4 → var(--alert-success-bg)
//   warning 背景 #FFF5EB → var(--alert-warning-bg)
//   error   背景 #FFF1F0 → var(--alert-error-bg)
//
// 图标颜色：
//   info    #3377FF → var(--status-processing) / var(--brand-base)
//   success #1BB23E → var(--status-success)
//   warning #FF7733 → var(--status-warning)
//   error   #FF5040 → var(--status-error)
//
// 文字颜色：
//   有图标模式：深色文字 var(--text-body)（与图标形成层次）
//   无图标模式：文字色跟随 variant 状态色（同图标色）
// ────────────────────────────────────────────────────────────
const alertVariants = cva(
  [
    // 布局
    "relative w-full flex flex-row items-center",
    // 圆角：Figma 实测 4px → --corner-sm
    "rounded-[var(--corner-sm)]",
    // 内边距：Figma 水平 12px → --space-content；垂直 10px 使高度达到 44px
    "px-[var(--space-content)] py-[10px]",
    // 最小高度保证单行展示与 Figma 44px 一致，多行时自然撑开
    "min-h-[44px]",
    // 字体族
    "font-['PingFang_SC',sans-serif]",
  ],
  {
    variants: {
      /**
       * variant — 语义类型，决定背景色
       * 图标色 / 无图标文字色由组件内部 map 处理（不在 cva 中，避免与 showIcon 状态耦合）
       */
      variant: {
        /** info — 蓝色信息提示，背景 #EBF3FF */
        info: "bg-[var(--alert-info-bg)]",
        /** success — 绿色成功提示，背景 #DCF5E4 */
        success: "bg-[var(--alert-success-bg)]",
        /** warning — 橙色警告提示，背景 #FFF5EB */
        warning: "bg-[var(--alert-warning-bg)]",
        /** error — 红色错误提示，背景 #FFF1F0 */
        error: "bg-[var(--alert-error-bg)]",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

// ── variant → 图标/无图标文字颜色 class ───────────────────
const variantIconColorClass: Record<string, string> = {
  info: "text-[var(--status-processing)]",       // #3377FF
  success: "text-[var(--status-success)]",        // #1BB23E
  warning: "text-[var(--status-warning)]",        // #FF7733
  error: "text-[var(--status-error)]",            // #FF5040
};

// ── variant → 默认图标节点（Figma: 22×22px，使用自定义图标库）──
const defaultIconMap: Record<string, React.ReactNode> = {
  info: <悬浮菜单图标信息 size={22} />,
  success: <悬浮菜单图标成功 size={22} />,
  warning: <悬浮菜单图标警告 size={22} />,
  error: <悬浮菜单图标危险 size={22} />,
};

// ── Part 4: Props 类型定义 ────────────────────────────────────
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /**
   * 是否显示左侧图标，默认 true。
   * 设为 false 时隐藏图标，文字色自动切换为 variant 对应的状态色（"文字色跟随"模式）。
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
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
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

    const colorClass = variantIconColorClass[variant ?? "info"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, className }))}
        {...props}
      >
        {/* 左侧图标 */}
        {iconNode && (
          <span
            className={cn(
              "shrink-0 inline-flex mr-[var(--space-intimate)]",
              colorClass
            )}
            aria-hidden="true"
          >
            {iconNode}
          </span>
        )}

        {/* 主体文字 */}
        <span
          className={cn(
            "flex-1 text-[length:var(--font-body-md-size)] leading-[var(--font-height-xl)] font-normal",
            // 有图标：深色正文；无图标：文字色跟随 variant 状态色
            iconNode ? "text-[var(--text-body)]" : colorClass
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
            <X size={16} />
          </button>
        ) : null}
      </div>
    );
  }
);

Alert.displayName = "Alert";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { alertVariants };
