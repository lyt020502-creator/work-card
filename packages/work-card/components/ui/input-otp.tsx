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
// InputOTP 一次性密码输入框组件
//
// 用于短信验证码、邮箱验证码等场景，渲染为一组等宽单字符输入格。
// 每个格子接受一个字符，输入后自动跳转到下一格，支持键盘退格回退。
//
// 关键语义变量速查（theme.css :root）：
//   默认边框      --border-color (#DCDFE5)
//   聚焦边框      --brand-base (#3377FF)
//   错误边框      --status-error (#FF5040)
//   背景色        --bg-primary (#FFFFFF)
//   文本色        --text-heading (#11141A)
//   禁用文本      --text-disabled (#C7CDD9)
//   圆角          --corner-sm (4px)
//   间距          --space-tight (8px)
//   字号          --font-body-md-size (14px) / --font-body-md-height (21px)
//   组件高度      --comp-height-xl (36px)
// ────────────────────────────────────────────────────────────

/** 单个 OTP 格子样式 */
const inputOtpSlotVariants = cva(
  [
    "flex items-center justify-center",
    "border border-[var(--border-color)]",
    "rounded-[var(--corner-sm)]",
    "bg-[var(--bg-primary)]",
    "text-[var(--text-heading)]",
    "text-center",
    "font-['PingFang_SC',sans-serif] font-medium",
    "outline-none",
    "transition-colors duration-150",
    "caret-[var(--brand-base)]",
  ],
  {
    variants: {
      /**
       * status — 输入格语义状态
       * default: 标准态，hover / focus 品牌蓝边框
       * error:   错误态，红色边框覆盖所有交互态
       */
      status: {
        default: [
          "hover:border-[var(--brand-base)]",
          "focus:border-[var(--brand-base)]",
          "active:border-[var(--brand-base)]",
        ],
        error: [
          "border-[var(--status-error)]",
          "hover:border-[var(--status-error)]",
          "focus:border-[var(--status-error)]",
          "active:border-[var(--status-error)]",
        ],
      },
      /**
       * size — 格子尺寸
       * sm: 32×32 / 14px 字号
       * md: 36×36 / 16px 字号（默认）
       * lg: 44×44 / 18px 字号
       */
      size: {
        sm: [
          "w-[var(--comp-height-lg)] h-[var(--comp-height-lg)]",
          "text-[length:var(--font-body-md-size)] leading-[var(--font-body-md-height)]",
        ],
        md: [
          "w-[var(--comp-height-xl)] h-[var(--comp-height-xl)]",
          "text-[16px] leading-[24px]",
        ],
        lg: [
          "w-[44px] h-[44px]",
          "text-[18px] leading-[28px]",
        ],
      },
    },
    defaultVariants: {
      status: "default",
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface InputOTPProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof inputOtpSlotVariants> {
  /** 验证码位数，默认 6 */
  length?: number;
  /** 受控值 */
  value?: string;
  /** 非受控默认值 */
  defaultValue?: string;
  /** 值变更回调，返回当前完整字符串 */
  onChange?: (value: string) => void;
  /** 全部输入完成回调 */
  onComplete?: (value: string) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否以密码形式显示（圆点遮盖） */
  mask?: boolean;
  /** 只允许数字输入，默认 true */
  numericOnly?: boolean;
  /** 错误提示文案，传入后自动切换为 error 状态 */
  errorMessage?: string;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/**
 * InputOTP — 一次性密码 / 验证码输入框
 * 渲染为一组等宽单字符输入格，支持自动前进/后退、粘贴、密码遮盖。
 */
export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      className,
      length = 6,
      value: valueProp,
      defaultValue = "",
      onChange,
      onComplete,
      disabled = false,
      mask = false,
      numericOnly = true,
      status: statusProp,
      size,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [localValue, setLocalValue] = React.useState(defaultValue);
    const value = isControlled ? valueProp : localValue;
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const derivedStatus = errorMessage ? "error" : (statusProp ?? "default");

    const updateValue = React.useCallback(
      (newValue: string) => {
        const clamped = newValue.slice(0, length);
        if (!isControlled) setLocalValue(clamped);
        onChange?.(clamped);
        if (clamped.length === length) {
          onComplete?.(clamped);
        }
      },
      [isControlled, length, onChange, onComplete]
    );

    const focusSlot = (index: number) => {
      const clamped = Math.max(0, Math.min(index, length - 1));
      inputRefs.current[clamped]?.focus();
    };

    const handleInput = (index: number, char: string) => {
      if (numericOnly && !/^\d$/.test(char)) return;
      if (!numericOnly && char.length !== 1) return;

      const chars = value.split("");
      // 填充空位
      while (chars.length < index) chars.push("");
      chars[index] = char;
      const newValue = chars.join("");
      updateValue(newValue);

      if (index < length - 1) {
        focusSlot(index + 1);
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const chars = value.split("");
        if (chars[index]) {
          chars[index] = "";
          updateValue(chars.join(""));
        } else if (index > 0) {
          chars[index - 1] = "";
          updateValue(chars.join(""));
          focusSlot(index - 1);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusSlot(index - 1);
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        focusSlot(index + 1);
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      let pasted = e.clipboardData.getData("text/plain").trim();
      if (numericOnly) pasted = pasted.replace(/\D/g, "");
      if (pasted) {
        updateValue(pasted.slice(0, length));
        focusSlot(Math.min(pasted.length, length) - 1);
      }
    };

    return (
      <div className="flex flex-col gap-[var(--space-intimate)]">
        <div
          ref={ref}
          className={cn(
            "inline-flex items-center gap-[var(--space-tight)]",
            className
          )}
          {...props}
        >
          {Array.from({ length }, (_, i) => {
            const char = value[i] ?? "";
            return (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type={mask ? "password" : "text"}
                inputMode={numericOnly ? "numeric" : "text"}
                autoComplete="one-time-code"
                maxLength={1}
                value={char}
                disabled={disabled}
                aria-label={`验证码第 ${i + 1} 位`}
                className={cn(
                  inputOtpSlotVariants({ status: derivedStatus, size }),
                  disabled && "opacity-50 cursor-not-allowed",
                )}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) handleInput(i, val.slice(-1));
                }}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </div>

        {/* 错误提示文案 */}
        {errorMessage && (
          <span className="text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)] text-[var(--status-error)]">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

InputOTP.displayName = "InputOTP";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { inputOtpSlotVariants };
