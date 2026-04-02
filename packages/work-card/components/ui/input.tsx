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
// Input / Textarea Token 速查（基于 Figma 实测）：
//   默认边框：  --color-other-0   (#E8E9EB) ← Figma rgba(232,233,235,1)
//   hover边框： --brand-base      (#3377FF)
//   focus边框： --brand-base      (#3377FF)
//   错误边框：  --status-error    (#FF5040)
//   错误文字：  --status-error    (#FF5040)
//   placeholder：--text-disabled  (#C7CDD9)
//   输入文字：  --text-heading    (#11141A)
//   字数统计：  --text-help       (#878D99)
//   高度：      --comp-height-lg  (32px)
//   横向内边距：--space-tight     (8px)
//   纵向内边距（textarea）：6px
//   横向内边距（textarea）：左右各 8px（--space-tight）
//   默认圆角：  --corner-sm       (4px)
//   场景圆角：  --corner-xl       (20px, 用于工作卡)
//   字号：      --font-label-size (13px)
//   统计字号：  --font-caption-size (12px)
// ────────────────────────────────────────────────────────────

/** 单行输入框外层容器变体 */
const inputWrapperVariants = cva(
  [
    "w-full inline-flex items-center",
    "bg-[var(--bg-primary)]",
    "border border-[var(--color-other-0)]",
    "transition-colors duration-150",
    "hover:border-[var(--brand-base)]",
    "focus-within:border-[var(--brand-base)]",
  ],
  {
    variants: {
      /**
       * status — 输入框语义状态
       *   default: 标准态
       *   error:   错误态，红色边框，hover/focus 保持红色
       */
      status: {
        default: "",
        error: [
          "border-[var(--status-error)]",
          "hover:border-[var(--status-error)]",
          "focus-within:border-[var(--status-error)]",
        ],
      },
      /**
       * radius — 圆角场景
       *   default: 4px，通用
       *   pill:    20px，用于工作卡等场景
       */
      radius: {
        default: "rounded-[var(--corner-sm)]",
        pill: "rounded-[var(--corner-xl)]",
      },
    },
    defaultVariants: {
      status: "default",
      radius: "default",
    },
  }
);

/** 多行文本域外层容器变体 */
const textareaWrapperVariants = cva(
  [
    "w-full flex flex-col",
    "bg-[var(--bg-primary)]",
    "rounded-[var(--corner-sm)]",
    "border border-[var(--color-other-0)]",
    "transition-colors duration-150",
    "hover:border-[var(--brand-base)]",
    "focus-within:border-[var(--brand-base)]",
  ],
  {
    variants: {
      status: {
        default: "",
        error: [
          "border-[var(--status-error)]",
          "hover:border-[var(--status-error)]",
          "focus-within:border-[var(--status-error)]",
        ],
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    VariantProps<typeof inputWrapperVariants> {
  /** 错误提示文案，传入后自动切换为 error 状态 */
  errorMessage?: string;
  /** 前缀节点（如图标），显示在输入框左侧 */
  prefix?: React.ReactNode;
  /** 后缀节点（如图标、操作按钮），显示在输入框右侧 */
  suffix?: React.ReactNode;
  /** 是否显示字数统计，需配合 maxLength 使用 */
  showCount?: boolean;
  /** 外层容器附加类名 */
  wrapperClassName?: string;
}

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "prefix">,
    VariantProps<typeof textareaWrapperVariants> {
  /** 错误提示文案，传入后自动切换为 error 状态 */
  errorMessage?: string;
  /** 是否显示字数统计，需配合 maxLength 使用 */
  showCount?: boolean;
  /** 外层容器附加类名 */
  wrapperClassName?: string;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/** 公共 input/textarea 内层文字样式 */
const innerTextClass = [
  "bg-transparent outline-none border-none",
  "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
  "font-['PingFang_SC',sans-serif] font-normal",
  "text-[var(--text-heading)]",
  "placeholder:text-[var(--text-disabled)]",
  "placeholder:font-normal",
  "disabled:cursor-not-allowed",
].join(" ");

// ── Input ────────────────────────────────────────────────────

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      status: statusProp,
      radius,
      errorMessage,
      prefix,
      suffix,
      showCount,
      maxLength,
      disabled,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    // 字数统计需要感知当前值长度
    const isControlled = value !== undefined;
    const [localLen, setLocalLen] = React.useState<number>(() => {
      if (typeof value === "string") return value.length;
      if (typeof defaultValue === "string") return defaultValue.length;
      return 0;
    });

    React.useEffect(() => {
      if (isControlled && typeof value === "string") {
        setLocalLen(value.length);
      }
    }, [isControlled, value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setLocalLen(e.target.value.length);
      onChange?.(e);
    };

    const derivedStatus = errorMessage ? "error" : (statusProp ?? "default");
    const hasSuffix = !!suffix || (showCount && !!maxLength);

    return (
      <div className="flex flex-col gap-[var(--space-intimate)]">
        <div
          className={cn(
            inputWrapperVariants({ status: derivedStatus, radius }),
            // 高度：32px（Figma 实测）
            "h-[var(--comp-height-lg)]",
            // 横向内边距：8px
            "px-[var(--space-tight)]",
            // 禁用态：降低不透明度，禁止 hover/focus 变色
            disabled && [
              "opacity-50 cursor-not-allowed",
              "hover:border-[var(--color-other-0)]",
              "focus-within:border-[var(--color-other-0)]",
            ],
            wrapperClassName
          )}
        >
          {/* 前缀（图标 / 文字） */}
          {prefix && (
            <span
              className="shrink-0 inline-flex items-center mr-[var(--space-intimate)] text-[var(--icon-main)]"
              aria-hidden="true"
            >
              {prefix}
            </span>
          )}

          <input
            ref={ref}
            disabled={disabled}
            value={value}
            defaultValue={isControlled ? undefined : defaultValue}
            maxLength={maxLength}
            onChange={handleChange}
            className={cn("flex-1 min-w-0", innerTextClass, className)}
            {...props}
          />

          {/* 后缀（图标 / 字数统计） */}
          {hasSuffix && (
            <span className="shrink-0 inline-flex items-center gap-[var(--space-intimate)] ml-[var(--space-intimate)] text-[var(--icon-main)]">
              {suffix}
              {showCount && maxLength && (
                <span className="text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)] text-[var(--text-help)] whitespace-nowrap tabular-nums">
                  {localLen}/{maxLength}
                </span>
              )}
            </span>
          )}
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

Input.displayName = "Input";

// ── Textarea ─────────────────────────────────────────────────

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      wrapperClassName,
      status: statusProp,
      errorMessage,
      showCount,
      maxLength,
      disabled,
      value,
      defaultValue,
      onChange,
      rows = 5,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [localLen, setLocalLen] = React.useState<number>(() => {
      if (typeof value === "string") return value.length;
      if (typeof defaultValue === "string") return defaultValue.length;
      return 0;
    });

    React.useEffect(() => {
      if (isControlled && typeof value === "string") {
        setLocalLen(value.length);
      }
    }, [isControlled, value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setLocalLen(e.target.value.length);
      onChange?.(e);
    };

    const derivedStatus = errorMessage ? "error" : (statusProp ?? "default");

    return (
      <div className="flex flex-col gap-[var(--space-intimate)]">
        <div
          className={cn(
            textareaWrapperVariants({ status: derivedStatus }),
            // 纵向内边距 6px（Figma 实测），横向内边距左右各 8px（--space-tight）
            "pt-[6px] pb-[6px] px-[var(--space-tight)]",
            disabled && [
              "opacity-50 cursor-not-allowed",
              "hover:border-[var(--color-other-0)]",
              "focus-within:border-[var(--color-other-0)]",
            ],
            wrapperClassName
          )}
        >
          <textarea
            ref={ref}
            disabled={disabled}
            value={value}
            defaultValue={isControlled ? undefined : defaultValue}
            maxLength={maxLength}
            rows={rows}
            onChange={handleChange}
            className={cn(
              "w-full resize-none overflow-y-auto",
              // ── 自定义滚动条（Figma 实测：4px 宽、圆角、浅蓝灰色轨道）────
              // Webkit（Chrome / Safari / Edge）
              "[&::-webkit-scrollbar]:w-[4px]",
              "[&::-webkit-scrollbar-track]:bg-transparent",
              // 滚动条轨道上下留 4px 间距（Figma: top-[4px]）
              "[&::-webkit-scrollbar-track]:py-[4px]",
              // thumb：圆角 pill，颜色 rgba(225,230,240,1) ≈ --color-other-0
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb]:bg-[var(--color-other-0)]",
              // Firefox
              "[scrollbar-width:thin]",
              "[scrollbar-color:var(--color-other-0)_transparent]",
              innerTextClass,
              className
            )}
            {...props}
          />

          {/* 字数统计 */}
          {showCount && maxLength && (
            <div className="text-right text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)] text-[var(--text-help)] mt-[2px] tabular-nums">
              {localLen}/{maxLength}
            </div>
          )}
        </div>

        {errorMessage && (
          <span className="text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)] text-[var(--status-error)]">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { inputWrapperVariants, textareaWrapperVariants };
