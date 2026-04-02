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
// Switch 轨道颜色（基于 Figma 像素实测）：
//
//   checked on  → 纯色 #3377FF (--brand-base)
//   checked hover  → 纯色 #5993FF (--brand-hover)
//   checked active → 纯色 #215BD9 (--brand-active)
//   unchecked off  → solid #C7CDD9 (--color-gray-2)
//   unchecked hover → solid #A5ABB8 (--color-gray-3)
//   disabled on    → solid #80AEFF (--brand-disabled)
//   disabled off   → solid #DCDFE5 (--border-color)
//   thumb          → solid #FFFFFF (--bg-primary)
//
// 背景色由 style.background 动态注入，cva 仅管理尺寸与结构类。
//
// 尺寸规格（Figma 实测）：
//   sm：轨道 30×17px，圆点 13×13px，行程 13px
//   md：轨道 36×20px，圆点 16×16px，行程 16px（默认）
//   lg：轨道 44×24px，圆点 20×20px，行程 20px
// ────────────────────────────────────────────────────────────

/** 轨道（track）样式变体 ── 不包含背景色（由 style 注入） */
const switchTrackVariants = cva(
  [
    "relative inline-flex shrink-0",
    "rounded-[var(--corner-pill)]",
    "cursor-pointer",
    "transition-[background] duration-200",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-[var(--brand-base)] focus-visible:ring-offset-2",
  ],
  {
    variants: {
      size: {
        /** sm — 30×17px（Figma small） */
        sm: "w-[30px] h-[17px]",
        /** md（默认）— 36×20px */
        md: "w-[36px] h-[20px]",
        /** lg — 44×24px（Figma large） */
        lg: "w-[44px] h-[24px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/** 圆点（thumb）样式变体 */
const switchThumbVariants = cva(
  [
    "absolute top-[2px] left-[2px]",
    "rounded-full",
    "bg-[var(--bg-primary)]",
    "shadow-[0_1px_3px_rgba(17,20,26,0.15)]",
    "pointer-events-none",
    "transition-transform duration-200",
  ],
  {
    variants: {
      size: {
        sm: "w-[13px] h-[13px]",
        md: "w-[16px] h-[16px]",
        lg: "w-[20px] h-[20px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────
export interface SwitchProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "onChange" | "checked" | "defaultChecked"
    >,
    VariantProps<typeof switchTrackVariants> {
  /** 是否开启（受控模式） */
  checked?: boolean;
  /** 默认是否开启（非受控模式） */
  defaultChecked?: boolean;
  /** 切换回调，参数为切换后的状态 */
  onChange?: (checked: boolean) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/** 圆点行程映射：track 宽度 - thumb 宽度 - 两侧 padding（2px×2） */
const thumbTravelMap: Record<NonNullable<SwitchProps["size"]>, number> = {
  sm: 13, // 30 - 13 - 4
  md: 16, // 36 - 16 - 4
  lg: 20, // 44 - 20 - 4
};

/**
 * 根据状态计算轨道背景
 *
 * checked on（纯色品牌蓝）：
 *   --brand-base (#3377FF)
 */
function getTrackBackground(
  checked: boolean,
  disabled: boolean,
  hovered: boolean,
  pressed: boolean
): string {
  if (disabled) {
    return checked
      ? "var(--brand-disabled)"   // #80AEFF — 禁用开启
      : "var(--border-color)";    // #DCDFE5 — 禁用关闭
  }
  if (checked) {
    if (pressed)
      return "var(--brand-active)";
    if (hovered)
      return "var(--brand-hover)";
    return "var(--brand-base)";
  }
  // unchecked
  if (pressed) return "var(--bg-secondary-active)"; // #E8E9EB
  if (hovered) return "var(--color-gray-3)";        // #A5ABB8
  return "var(--color-gray-2)";                     // #C7CDD9
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size = "md",
      checked: checkedProp,
      defaultChecked = false,
      onChange,
      disabled = false,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...props
    },
    ref
  ) => {
    // 支持受控与非受控两种模式
    const isControlled = checkedProp !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const checked = isControlled ? checkedProp : internalChecked;

    // 交互态（用于渐变过渡）
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);

    const handleClick = () => {
      if (disabled) return;
      const next = !checked;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next);
    };

    const thumbTranslate = thumbTravelMap[size ?? "md"];
    const trackBackground = getTrackBackground(checked, disabled, isHovered, isPressed);

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        onMouseEnter={(e) => {
          if (!disabled) setIsHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          setIsPressed(false);
          onMouseLeave?.(e);
        }}
        onMouseDown={(e) => {
          if (!disabled) setIsPressed(true);
          onMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          setIsPressed(false);
          onMouseUp?.(e);
        }}
        className={cn(
          switchTrackVariants({ size }),
          disabled && "cursor-not-allowed",
          className
        )}
        style={{ background: trackBackground }}
        {...props}
      >
        <span
          className={cn(switchThumbVariants({ size }))}
          style={{
            transform: checked
              ? `translateX(${thumbTranslate}px)`
              : "translateX(0px)",
          }}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { switchTrackVariants, switchThumbVariants };
