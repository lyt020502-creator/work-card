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
// Slider 滑块/范围选择器组件
//
// 关键语义变量速查（theme.css :root）：
//   轨道背景色    --bg-secondary (#F2F4F7)
//   已填充轨道    --brand-base (#3377FF)
//   滑块（thumb）  --bg-primary (#FFFFFF) + 边框 --brand-base (#3377FF)
//   hover        --brand-hover (#5993FF)
//   active       --brand-active (#215BD9)
//   禁用态       --brand-disabled (#80AEFF) / --text-disabled (#C7CDD9)
//   高度          轨道 4px，滑块 sm=12px / md=16px / lg=20px
//   圆角          --corner-pill (9999px)
// ────────────────────────────────────────────────────────────
const sliderTrackVariants = cva(
  [
    "relative w-full",
    "bg-[var(--bg-secondary)]",
    "rounded-[var(--corner-pill)]",
    "cursor-pointer",
  ],
  {
    variants: {
      size: {
        sm: "h-[2px]",
        md: "h-[4px]",
        lg: "h-[6px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const sliderThumbVariants = cva(
  [
    "absolute top-1/2 left-0",
    "rounded-[var(--corner-pill)]",
    "bg-[var(--bg-primary)]",
    "border-2 border-[var(--brand-base)]",
    "shadow-[var(--shadow-sm)]",
    "cursor-grab active:cursor-grabbing",
    "transition-shadow duration-150",
    "hover:border-[var(--brand-hover)]",
    "hover:shadow-[0_0_0_4px_rgba(51,119,255,0.1)]",
    "active:border-[var(--brand-active)]",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-[var(--brand-base)] focus-visible:ring-offset-1",
  ],
  {
    variants: {
      size: {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────
export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    VariantProps<typeof sliderTrackVariants> {
  /** 最小值，默认 0 */
  min?: number;
  /** 最大值，默认 100 */
  max?: number;
  /** 步长，默认 1 */
  step?: number;
  /** 受控当前值（单值模式为 number，范围模式为 [number, number]） */
  value?: number | [number, number];
  /** 非受控默认值 */
  defaultValue?: number | [number, number];
  /** 值变化回调 */
  onChange?: (value: number | [number, number]) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/**
 * clamp 辅助函数：将值限制在 min-max 范围内，并按 step 对齐
 */
function clampValue(val: number, min: number, max: number, step: number): number {
  const clamped = Math.min(Math.max(val, min), max);
  return Math.round((clamped - min) / step) * step + min;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      size,
      min = 0,
      max = 100,
      step = 1,
      value: valueProp,
      defaultValue = 0,
      onChange,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const isRange = Array.isArray(valueProp) || Array.isArray(defaultValue);

    // 内部状态
    const [localValue, setLocalValue] = React.useState<number | [number, number]>(defaultValue);
    const currentValue = isControlled ? valueProp! : localValue;

    const trackRef = React.useRef<HTMLDivElement>(null);
    const draggingRef = React.useRef<number | null>(null); // 拖拽中的 thumb index

    // 获取百分比位置
    const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

    // 从鼠标位置获取值
    const getValueFromPosition = (clientX: number): number => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      return clampValue(min + percent * (max - min), min, max, step);
    };

    const updateValue = (newVal: number, thumbIndex: number) => {
      if (isRange) {
        const arr = Array.isArray(currentValue) ? [...currentValue] : [currentValue, currentValue];
        arr[thumbIndex] = newVal;
        // 确保 range 有序
        if (thumbIndex === 0 && arr[0] > arr[1]) arr[0] = arr[1];
        if (thumbIndex === 1 && arr[1] < arr[0]) arr[1] = arr[0];
        const result: [number, number] = [arr[0], arr[1]];
        if (!isControlled) setLocalValue(result);
        onChange?.(result);
      } else {
        if (!isControlled) setLocalValue(newVal);
        onChange?.(newVal);
      }
    };

    // 鼠标拖拽逻辑
    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (draggingRef.current === null || disabled) return;
        const newVal = getValueFromPosition(e.clientX);
        updateValue(newVal, draggingRef.current);
      };
      const handleMouseUp = () => {
        draggingRef.current = null;
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    });

    // 点击轨道跳转
    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      const newVal = getValueFromPosition(e.clientX);
      if (isRange) {
        const arr = Array.isArray(currentValue) ? currentValue : [currentValue, currentValue];
        // 选择距离最近的 thumb
        const idx = Math.abs(newVal - arr[0]) <= Math.abs(newVal - arr[1]) ? 0 : 1;
        updateValue(newVal, idx);
      } else {
        updateValue(newVal, 0);
      }
    };

    const handleThumbMouseDown = (index: number) => (e: React.MouseEvent) => {
      if (disabled) return;
      e.stopPropagation();
      draggingRef.current = index;
    };

    // 键盘操作
    const handleThumbKeyDown = (index: number) => (e: React.KeyboardEvent) => {
      if (disabled) return;
      const vals = isRange
        ? (Array.isArray(currentValue) ? currentValue : [currentValue, currentValue])
        : [currentValue as number];
      let newVal = vals[index];
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        newVal = clampValue(newVal + step, min, max, step);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        newVal = clampValue(newVal - step, min, max, step);
      }
      updateValue(newVal, index);
    };

    // 渲染 thumb
    const renderThumb = (val: number, index: number) => {
      const percent = getPercent(val);
      return (
        <div
          key={index}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={val}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className={cn(
            sliderThumbVariants({ size }),
            disabled && "border-[var(--brand-disabled)] cursor-not-allowed"
          )}
          style={{ left: `${percent}%`, transform: `translate(-50%, -50%)` }}
          onMouseDown={handleThumbMouseDown(index)}
          onKeyDown={handleThumbKeyDown(index)}
        />
      );
    };

    // 填充条位置
    const fillStyle = (() => {
      if (isRange) {
        const arr = Array.isArray(currentValue) ? currentValue : [currentValue, currentValue];
        const left = getPercent(arr[0]);
        const right = getPercent(arr[1]);
        return { left: `${left}%`, width: `${right - left}%` };
      }
      return { left: "0%", width: `${getPercent(currentValue as number)}%` };
    })();

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center w-full select-none",
          "py-[var(--space-tight)]",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {/* 轨道 */}
        <div
          ref={trackRef}
          className={cn(sliderTrackVariants({ size }))}
          onClick={handleTrackClick}
        >
          {/* 已填充部分 */}
          <div
            className={cn(
              "absolute top-0 h-full rounded-[var(--corner-pill)]",
              disabled
                ? "bg-[var(--brand-disabled)]"
                : "bg-[var(--brand-base)]"
            )}
            style={fillStyle}
          />
          {/* Thumb(s) */}
          {isRange
            ? (Array.isArray(currentValue) ? currentValue : [currentValue, currentValue]).map(
                (val, idx) => renderThumb(val as number, idx)
              )
            : renderThumb(currentValue as number, 0)}
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { sliderTrackVariants, sliderThumbVariants };
