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
//   radio 默认边框  #BEC2CC ≈ --color-gray-2 (#C7CDD9)（参见 tag.tsx 同款注释）
//   radio hover 边框  --brand-base (#3377FF)
//   radio hover 背景  --bg-primary (#FFFFFF)
//   radio 选中背景    --bg-primary (#FFFFFF)
//   radio 选中 hover  --bg-primary (#FFFFFF)
//   radio 禁用边框    --text-disabled (#C7CDD9)
//   radio 禁用背景    --bg-secondary (#F2F4F7)
//   radio 禁用已选中  opacity-30 + --brand-base (#3377FF)（Figma 实测，非 --brand-disabled）
//   标签文字         --text-heading (#11141A)
//   标签字号         --font-label-size (13px)，--font-label-height (20px)
//   图标尺寸         16×16px（Figma 默认）
//   图标↔文字间距    --space-intimate (4px)
// ────────────────────────────────────────────────────────────

/**
 * radioVariants — Radio 根元素（<label>）的 cva，控制整体布局与文字尺寸
 * group/radio 类名用于子元素 hover 联动
 */
const radioVariants = cva(
  [
    // 布局与间距
    "group/radio inline-flex items-center gap-[var(--space-intimate)]",
    // 排版
    "font-['PingFang_SC',sans-serif] font-normal",
    // 交互
    "cursor-pointer select-none",
    // 过渡
    "transition-colors duration-150",
  ],
  {
    variants: {
      size: {
        /** sm — 图标 14px，字号 12px */
        sm: "text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)]",
        /** md（默认）— 图标 16px，字号 13px */
        md: "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
        /** lg — 图标 18px，字号 14px */
        lg: "text-[length:var(--font-body-md-size)] leading-[var(--font-body-md-height)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * radioGroupVariants — RadioGroup 容器的 cva，控制子项排列方向
 */
const radioGroupVariants = cva("flex", {
  variants: {
    direction: {
      /** horizontal（默认）— 横向排列，换行间距 8px */
      horizontal:
        "flex-row flex-wrap gap-x-[var(--space-group)] gap-y-[var(--space-tight)]",
      /** vertical — 纵向排列，行间距 8px */
      vertical: "flex-col gap-[var(--space-tight)]",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
});

// RadioGroup → Radio 的 Context，用于共享选中值与禁用状态
type RadioContextValue = {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

const RadioContext = React.createContext<RadioContextValue | null>(null);

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface RadioProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange">,
    VariantProps<typeof radioVariants> {
  /** radio 的值，在 RadioGroup 中唯一标识该选项 */
  value?: string;
  /** 是否选中（独立使用时的受控属性，RadioGroup 内由 context 接管） */
  checked?: boolean;
  /** 选中状态变化回调，参数为当前 radio 的 value */
  onChange?: (value: string) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof radioGroupVariants> {
  /** 当前选中的值（受控模式） */
  value?: string;
  /** 默认选中的值（非受控模式） */
  defaultValue?: string;
  /** 选中状态变化回调 */
  onChange?: (value: string) => void;
  /** 原生 name 属性，作用于内部 <input type="radio">，用于表单提交 */
  name?: string;
  /** 是否整组禁用 */
  disabled?: boolean;
  /** 子 Radio 的统一尺寸，可被单个 Radio 的 size prop 覆盖 */
  size?: "sm" | "md" | "lg";
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

export const Radio = React.forwardRef<HTMLLabelElement, RadioProps>(
  (
    {
      className,
      size,
      value,
      checked,
      onChange,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const ctx = React.useContext(RadioContext);

    // 优先级：单个 Radio 的 size > RadioGroup context 的 size > defaultVariant "md"
    const resolvedSize = size ?? ctx?.size ?? "md";
    // RadioGroup 内：比较 context.value 与当前 value；独立使用：取 checked prop
    const isChecked = ctx ? ctx.value === value : (checked ?? false);
    const isDisabled = disabled ?? ctx?.disabled ?? false;

    const handleChange = () => {
      if (isDisabled) return;
      if (ctx) {
        ctx.onChange(value ?? "");
      } else {
        onChange?.(value ?? "");
      }
    };

    // 指示器（圆圈）尺寸随 size 适配
    const indicatorSize =
      resolvedSize === "sm"
        ? "w-[14px] h-[14px]"
        : resolvedSize === "lg"
        ? "w-[18px] h-[18px]"
        : "w-[16px] h-[16px]";

    // 内部白点尺寸随 size 适配（约为指示器直径的 50%，Figma 实测 sm:7/14）
    const innerDotSize =
      resolvedSize === "sm"
        ? "w-[7px] h-[7px]"
        : resolvedSize === "lg"
        ? "w-[9px] h-[9px]"
        : "w-[8px] h-[8px]";

    return (
      <label
        ref={ref}
        className={cn(
          radioVariants({ size: resolvedSize, className }),
          isDisabled && "cursor-not-allowed"
        )}
        {...props}
      >
        {/* 隐藏的原生 radio，保留无障碍语义 */}
        <input
          type="radio"
          className="sr-only"
          checked={isChecked}
          disabled={isDisabled}
          name={ctx?.name}
          value={value}
          onChange={handleChange}
          readOnly={!onChange && !ctx}
        />

        {/* 自定义视觉指示器
          ┌─ 四种状态 ──────────────────────────────────────────────────┐
          │ 未选中默认：灰色边框 --color-gray-2，白色背景                 │
          │ 未选中 hover：品牌蓝边框 --brand-base，浅蓝背景 --brand-light │
          │ 已选中默认：蓝色填充 --brand-base，白色内点                   │
          │ 已选中 hover：加深蓝填充 --brand-hover，白色内点              │
          │ 禁用已选中：opacity-30 + --brand-base（Figma），文字 --text-disabled │
          │ 禁用未选中：灰色边框 --text-disabled + 灰背景，文字 --text-disabled  │
          └────────────────────────────────────────────────────────────┘ */}
        <span
          aria-hidden="true"
          className={cn(
            "relative flex items-center justify-center",
            "rounded-full border-[1.5px] transition-colors duration-150 shrink-0",
            indicatorSize,
            isDisabled
              ? isChecked
                ? // 禁用 + 选中：Figma 实测使用 opacity-30 + --bg-primary，非独立 --brand-disabled 色值
                  "opacity-30 bg-[var(--bg-primary)] border-[var(--brand-base)]"
                : // 禁用 + 未选中
                  "bg-[var(--bg-secondary)] border-[var(--text-disabled)]"
              : isChecked
              ? // 正常 + 选中（含 hover）
                [
                  "bg-[var(--bg-primary)] border-[var(--brand-base)]",
                  "group-hover/radio:bg-[var(--bg-primary)] group-hover/radio:border-[var(--brand-hover)]",
                ]
              : // 正常 + 未选中（含 hover）
                [
                  "bg-[var(--bg-primary)] border-[var(--color-gray-2)]",
                  "group-hover/radio:border-[var(--brand-base)] group-hover/radio:bg-[var(--brand-light-bg)]",
                ]
          )}
        >
          {/* 已选中时渲染蓝色内点 */}
          {isChecked && (
            <span
              className={cn("rounded-full bg-[var(--brand-base)]", innerDotSize)}
            />
          )}
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

Radio.displayName = "Radio";

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      direction,
      value: controlledValue,
      defaultValue,
      onChange,
      name,
      disabled,
      size,
      children,
      ...props
    },
    ref
  ) => {
    // 非受控模式内部状态
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      defaultValue ?? ""
    );

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    const handleChange = React.useCallback(
      (val: string) => {
        if (!isControlled) {
          setUncontrolledValue(val);
        }
        onChange?.(val);
      },
      [isControlled, onChange]
    );

    return (
      <RadioContext.Provider
        value={{
          value: currentValue,
          onChange: handleChange,
          name,
          disabled,
          size,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={cn(radioGroupVariants({ direction, className }))}
          {...props}
        >
          {children}
        </div>
      </RadioContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { radioVariants, radioGroupVariants };
