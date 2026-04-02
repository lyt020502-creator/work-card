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
// Figma 实测值 → Token 映射：
//   checkbox 默认边框   rgba(200,201,204) ≈ --color-gray-2 (#C7CDD9)
//   checkbox hover 边框  --brand-base (#3377FF)
//   checkbox hover 背景  --brand-light-bg (#F2F8FF)
//   checkbox 选中背景    --brand-base (#3377FF)
//   checkbox 选中 hover  --brand-hover (#5993FF)
//   checkbox 中间态背景  --brand-base (#3377FF)（与选中相同）
//   未选禁用边框         --border-color (#DCDFE5)
//   未选禁用背景         --bg-secondary (#F2F4F7)
//   已选禁用             opacity-40 + --brand-base（Figma 实测）
//   标签文字             --text-heading (#11141A)
//   禁用标签文字         --text-disabled (#C7CDD9)
//   标签字号             --font-label-size (13px)，--font-label-height (20px)
//   checkbox 框尺寸(md)  14×14px（Figma 默认）
//   圆角                 3px → rounded-[3px]（--corner-sm 4px 最接近）
//   图标↔文字间距        8px → --space-tight
// ────────────────────────────────────────────────────────────

/**
 * checkboxVariants — Checkbox 根元素（<label>）的 cva
 * group/checkbox 类名用于子元素 hover 联动
 */
const checkboxVariants = cva(
  [
    "group/checkbox inline-flex items-center gap-[var(--space-tight)]",
    "font-['PingFang_SC',sans-serif] font-normal",
    "cursor-pointer select-none",
    "transition-colors duration-150",
  ],
  {
    variants: {
      size: {
        /** sm — 框 12px，字号 12px */
        sm: "text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)]",
        /** md（默认）— 框 14px，字号 13px */
        md: "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
        /** lg — 框 16px，字号 14px */
        lg: "text-[length:var(--font-body-md-size)] leading-[var(--font-body-md-height)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * checkboxGroupVariants — CheckboxGroup 容器的 cva，控制子项排列方向
 */
const checkboxGroupVariants = cva("flex", {
  variants: {
    direction: {
      /** horizontal（默认）— 横向排列 */
      horizontal:
        "flex-row flex-wrap gap-x-[var(--space-group)] gap-y-[var(--space-tight)]",
      /** vertical — 纵向排列 */
      vertical: "flex-col gap-[var(--space-tight)]",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
});

// CheckboxGroup → Checkbox 的 Context，用于共享选中值与禁用状态
type CheckboxContextValue = {
  value: string[];
  onChange: (value: string, checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

const CheckboxContext = React.createContext<CheckboxContextValue | null>(null);

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface CheckboxProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange">,
    VariantProps<typeof checkboxVariants> {
  /** checkbox 的值，在 CheckboxGroup 中唯一标识该选项 */
  value?: string;
  /** 是否选中（独立使用时的受控属性，CheckboxGroup 内由 context 接管） */
  checked?: boolean;
  /** 默认是否选中（非受控模式，仅独立使用时有效） */
  defaultChecked?: boolean;
  /** 是否为不确定状态（半选，优先级高于 checked） */
  indeterminate?: boolean;
  /** 选中状态变化回调 */
  onChange?: (checked: boolean) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof checkboxGroupVariants> {
  /** 当前选中的值数组（受控模式） */
  value?: string[];
  /** 默认选中的值数组（非受控模式） */
  defaultValue?: string[];
  /** 选中状态变化回调，参数为更新后的值数组 */
  onChange?: (values: string[]) => void;
  /** 是否整组禁用 */
  disabled?: boolean;
  /** 子 Checkbox 的统一尺寸，可被单个 Checkbox 的 size prop 覆盖 */
  size?: "sm" | "md" | "lg";
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/** 选中态 checkmark SVG（白色，适配 md 14px 框） */
function CheckIcon({ size }: { size: "sm" | "md" | "lg" }) {
  if (size === "sm") {
    return (
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
        <path
          d="M1 2.8L3 5L7 1"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (size === "lg") {
    return (
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
        <path
          d="M1 4L3.8 6.5L9 1"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // md (default)
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
      <path
        d="M1 3.2L3.5 5.5L8 1"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 中间态 dash SVG（白色横线） */
function IndeterminateIcon() {
  return (
    <svg width="7" height="2" viewBox="0 0 7 2" fill="none" aria-hidden="true">
      <rect width="7" height="2" rx="1" fill="white" />
    </svg>
  );
}

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      className,
      size,
      value,
      checked,
      defaultChecked,
      indeterminate = false,
      onChange,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const ctx = React.useContext(CheckboxContext);

    // 优先级：单个 Checkbox 的 size > CheckboxGroup context 的 size > defaultVariant "md"
    const resolvedSize = size ?? ctx?.size ?? "md";
    const isDisabled = disabled ?? ctx?.disabled ?? false;

    // 受控 vs 非受控
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(
      defaultChecked ?? false
    );

    // CheckboxGroup 内：由 context 判断是否选中；独立使用：取 checked prop 或内部状态
    let isChecked: boolean;
    if (ctx) {
      isChecked = value ? ctx.value.includes(value) : false;
    } else if (checked !== undefined) {
      isChecked = checked;
    } else {
      isChecked = uncontrolledChecked;
    }

    const handleChange = () => {
      if (isDisabled) return;
      const nextChecked = !isChecked;
      if (ctx) {
        ctx.onChange(value ?? "", nextChecked);
      } else {
        if (checked === undefined) {
          setUncontrolledChecked(nextChecked);
        }
        onChange?.(nextChecked);
      }
    };

    // 指示框尺寸随 size 适配
    const boxSize =
      resolvedSize === "sm"
        ? "w-[12px] h-[12px]"
        : resolvedSize === "lg"
        ? "w-[16px] h-[16px]"
        : "w-[14px] h-[14px]";

    // 是否渲染填充态（已选 或 indeterminate）
    const isFilled = isChecked || indeterminate;

    return (
      <label
        ref={ref}
        className={cn(
          checkboxVariants({ size: resolvedSize, className }),
          isDisabled && "cursor-not-allowed"
        )}
        {...props}
      >
        {/* 隐藏的原生 checkbox，保留无障碍语义 */}
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          disabled={isDisabled}
          value={value}
          onChange={handleChange}
          ref={(el) => {
            if (el) el.indeterminate = indeterminate;
          }}
          readOnly={!onChange && !ctx}
        />

        {/* 自定义视觉指示器
          ┌─ 六种状态 ──────────────────────────────────────────────────┐
          │ 未选中默认：灰色边框 --color-gray-2，白色背景                 │
          │ 未选中 hover：品牌蓝边框 --brand-base，浅蓝背景               │
          │ 已选中默认：蓝色填充 --brand-base，白色 checkmark             │
          │ 已选中 hover：加深蓝填充 --brand-hover，白色 checkmark        │
          │ 中间态(indeterminate)：蓝色填充 --brand-base，白色横线        │
          │ 禁用未选中：灰色边框 --border-color + --bg-secondary 背景     │
          │ 禁用已选中/中间态：opacity-40 + --brand-base（Figma 实测）    │
          └────────────────────────────────────────────────────────────┘ */}
        <span
          aria-hidden="true"
          className={cn(
            "relative flex items-center justify-center shrink-0",
            "rounded-[3px] border transition-colors duration-150",
            boxSize,
            isDisabled
              ? isFilled
                ? // 禁用 + 选中/中间态：Figma 实测 opacity-40 + brand-base
                  "opacity-40 bg-[var(--brand-base)] border-[var(--brand-base)]"
                : // 禁用 + 未选中
                  "bg-[var(--bg-secondary)] border-[var(--border-color)]"
              : isFilled
              ? // 正常 + 选中/中间态（含 hover）
                [
                  "bg-[var(--brand-base)] border-[var(--brand-base)]",
                  "group-hover/checkbox:bg-[var(--brand-hover)] group-hover/checkbox:border-[var(--brand-hover)]",
                ]
              : // 正常 + 未选中（含 hover）
                [
                  "bg-[var(--bg-primary)] border-[var(--color-gray-2)]",
                  "group-hover/checkbox:border-[var(--brand-base)] group-hover/checkbox:bg-[var(--brand-light-bg)]",
                ]
          )}
        >
          {/* 选中时渲染 checkmark；中间态渲染横线 */}
          {indeterminate ? (
            <IndeterminateIcon />
          ) : isChecked ? (
            <CheckIcon size={resolvedSize} />
          ) : null}
        </span>

        {/* 标签文字：禁用时使用 --text-disabled，正常时使用 --text-heading */}
        {children && (
          <span
            className={cn(
              isDisabled
                ? "text-[var(--text-disabled)]"
                : "text-[var(--text-heading)]"
            )}
          >
            {children}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      className,
      direction,
      value: controlledValue,
      defaultValue,
      onChange,
      disabled,
      size,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(
      defaultValue ?? []
    );

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    const handleChange = React.useCallback(
      (val: string, checked: boolean) => {
        const next = checked
          ? [...currentValue, val]
          : currentValue.filter((v) => v !== val);
        if (!isControlled) {
          setUncontrolledValue(next);
        }
        onChange?.(next);
      },
      [currentValue, isControlled, onChange]
    );

    return (
      <CheckboxContext.Provider
        value={{
          value: currentValue,
          onChange: handleChange,
          disabled,
          size,
        }}
      >
        <div
          ref={ref}
          role="group"
          className={cn(checkboxGroupVariants({ direction, className }))}
          {...props}
        >
          {children}
        </div>
      </CheckboxContext.Provider>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { checkboxVariants, checkboxGroupVariants };
