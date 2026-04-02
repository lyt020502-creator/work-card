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
// Form 表单组件（复合组件）
//
// 提供结构化的表单布局：Form → FormItem → (FormLabel + FormControl + FormMessage)
// 通过 Context 管理字段级别的 error / disabled 状态传递。
//
// 关键语义变量速查（theme.css :root）：
//   文本色      --text-heading (#11141A)
//   辅助文本    --text-help (#878D99)
//   禁用文本    --text-disabled (#C7CDD9)
//   错误色      --status-error (#FF5040)
//   间距        --space-intimate (4px) / --space-tight (8px) / --space-content (12px)
//              --space-group (16px) / --space-section (20px)
//   标签字号    --font-label-size (13px) / --font-label-height (20px)
//   提示字号    --font-caption-size (12px) / --font-caption-height (18px)
// ────────────────────────────────────────────────────────────

/** 表单整体布局变体 */
const formVariants = cva(
  [
    "w-full",
    "font-['PingFang_SC',sans-serif]",
  ],
  {
    variants: {
      /**
       * layout — 表单布局模式
       * vertical: 标签在上、控件在下（默认）
       * horizontal: 标签在左、控件在右
       */
      layout: {
        vertical: "flex flex-col",
        horizontal: "flex flex-col",
      },
    },
    defaultVariants: {
      layout: "vertical",
    },
  }
);

/** 表单项样式变体 */
const formItemVariants = cva(
  [
    "w-full",
  ],
  {
    variants: {
      layout: {
        vertical: "flex flex-col gap-[var(--space-intimate)]",
        horizontal: "flex flex-row items-start gap-[var(--space-group)]",
      },
    },
    defaultVariants: {
      layout: "vertical",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

/** Form Context 值 */
interface FormContextValue {
  layout: "vertical" | "horizontal";
}

/** FormItem Context 值 */
interface FormItemContextValue {
  id: string;
  error?: string;
  disabled?: boolean;
}

export interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "layout">,
    VariantProps<typeof formVariants> {
  /** 表单项之间的间距，默认 --space-section (20px) */
  gap?: string;
}

export interface FormItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 字段错误信息，传入后自动渲染 FormMessage 并标红 */
  error?: string;
  /** 是否禁用该字段 */
  disabled?: boolean;
}

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** 是否显示必填标记（红色星号） */
  required?: boolean;
  /** 标签宽度（仅 horizontal 布局下生效），如 '120px' */
  width?: string;
}

export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

// ── Part 5: 组件实现 ─────────────────────────────────────────

const FormContext = React.createContext<FormContextValue>({ layout: "vertical" });

function useFormContext(): FormContextValue {
  return React.useContext(FormContext);
}

const FormItemContext = React.createContext<FormItemContextValue>({
  id: "",
});

function useFormItemContext(): FormItemContextValue {
  return React.useContext(FormItemContext);
}

/**
 * Form — 表单根容器
 * 管理整体布局模式（vertical / horizontal），向子组件传递 layout。
 */
export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, layout = "vertical", gap, children, ...props }, ref) => {
    return (
      <FormContext.Provider value={{ layout: layout ?? "vertical" }}>
        <form
          ref={ref}
          className={cn(
            formVariants({ layout, className }),
            "gap-[var(--space-section)]",
          )}
          style={gap ? { gap } : undefined}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

Form.displayName = "Form";

/**
 * FormItem — 单个表单项容器
 * 为子组件提供 id / error / disabled 上下文。
 */
export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, error, disabled, children, ...props }, ref) => {
    const id = React.useId();
    const { layout } = useFormContext();

    return (
      <FormItemContext.Provider value={{ id, error, disabled }}>
        <div
          ref={ref}
          className={cn(formItemVariants({ layout }), className)}
          {...props}
        >
          {children}
        </div>
      </FormItemContext.Provider>
    );
  }
);

FormItem.displayName = "FormItem";

/**
 * FormLabel — 表单项标签
 * 自动通过 htmlFor 关联同一 FormItem 下的控件。
 * 支持必填星号标记，horizontal 布局下可设置固定宽度。
 */
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, width, children, ...props }, ref) => {
    const { id, error, disabled } = useFormItemContext();

    return (
      <label
        ref={ref}
        htmlFor={id}
        className={cn(
          "inline-flex items-center gap-[var(--space-intimate)] shrink-0",
          "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
          "font-medium",
          error ? "text-[var(--status-error)]" : "text-[var(--text-heading)]",
          disabled && "text-[var(--text-disabled)] cursor-not-allowed",
          className
        )}
        style={width ? { width } : undefined}
        {...props}
      >
        {children}
        {required && (
          <span className="text-[var(--status-error)] font-normal" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

FormLabel.displayName = "FormLabel";

/**
 * FormControl — 表单控件容器
 * 包裹输入控件，将 FormItem 的 id 注入为子元素的 id。
 */
export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, children, ...props }, ref) => {
    const { id } = useFormItemContext();

    return (
      <div
        ref={ref}
        className={cn("flex-1 min-w-0", className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(
              child as React.ReactElement<{ id?: string }>,
              { id }
            );
          }
          return child;
        })}
      </div>
    );
  }
);

FormControl.displayName = "FormControl";

/**
 * FormDescription — 表单项描述/帮助文本
 * 显示在控件下方，灰色辅助文字。
 */
export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)]",
        "text-[var(--text-help)]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

FormDescription.displayName = "FormDescription";

/**
 * FormMessage — 表单项错误/校验消息
 * 自动读取 FormItem 的 error 上下文，也可通过 children 覆盖显示内容。
 */
export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps
>(({ className, children, ...props }, ref) => {
  const { error } = useFormItemContext();
  const message = children || error;

  if (!message) return null;

  return (
    <p
      ref={ref}
      role="alert"
      className={cn(
        "text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)]",
        "text-[var(--status-error)]",
        className
      )}
      {...props}
    >
      {message}
    </p>
  );
});

FormMessage.displayName = "FormMessage";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { formVariants, formItemVariants };
