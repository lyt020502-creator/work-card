// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDown } from "lucide-react";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// Collapsible 可折叠面板/容器组件
//
// 与 Accordion 的区别：Collapsible 是独立的单个折叠容器，
// 不需要在列表上下文中使用，适用于单个区域的展开/收起。
//
// 关键语义变量速查（theme.css :root）：
//   背景色        --bg-primary (#FFFFFF)
//   文本色        --text-heading (#11141A)
//   辅助文本      --text-secondary (#5C6473)
//   边框色        --border-color (#DCDFE5)
//   圆角          --corner-sm (4px) / --corner-md (8px)
//   间距          --space-tight (8px) / --space-content (12px) / --space-group (16px)
//   字号          --font-body-md-size (14px) / --font-body-md-height (21px)
//   Ghost 悬停    --bg-ghost-hover (#F7F8FA) / --bg-ghost-active (#EDF0F5)
// ────────────────────────────────────────────────────────────

const collapsibleVariants = cva(
  [
    "w-full",
    "font-['PingFang_SC',sans-serif]",
  ],
  {
    variants: {
      /**
       * variant — 外观风格
       * default: 无边框，适合嵌入页面内容流
       * bordered: 带边框和圆角的独立卡片样式
       * ghost: 无边框无背景，仅 trigger 有悬停态
       */
      variant: {
        default: [
          "bg-[var(--bg-primary)]",
          "hover:bg-[var(--bg-primary)]",
          "active:bg-[var(--bg-primary)]",
        ],
        bordered: [
          "bg-[var(--bg-primary)]",
          "border border-[var(--border-color)]",
          "rounded-[var(--corner-md)]",
          "hover:bg-[var(--bg-primary)]",
          "active:bg-[var(--bg-primary)]",
        ],
        ghost: [
          "bg-transparent",
          "hover:bg-transparent",
          "active:bg-transparent",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface CollapsibleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof collapsibleVariants> {
  /** 受控展开状态 */
  open?: boolean;
  /** 非受控默认展开状态，默认 false */
  defaultOpen?: boolean;
  /** 展开状态变更回调 */
  onOpenChange?: (open: boolean) => void;
  /** 是否禁用展开/收起交互 */
  disabled?: boolean;
}

export interface CollapsibleTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /** 是否隐藏右侧展开/收起箭头图标，默认 false */
  hideIcon?: boolean;
}

export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/** Context 传递展开状态 */
interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
  disabled: boolean;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext(): CollapsibleContextValue {
  const ctx = React.useContext(CollapsibleContext);
  if (!ctx) throw new Error("useCollapsibleContext must be used within <Collapsible>");
  return ctx;
}

/**
 * Collapsible — 可折叠容器根组件
 * 管理展开/收起状态，支持受控/非受控模式。
 */
export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      className,
      variant,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = openProp !== undefined;
    const [localOpen, setLocalOpen] = React.useState(defaultOpen);
    const open = isControlled ? openProp! : localOpen;

    const toggle = React.useCallback(() => {
      if (disabled) return;
      const next = !open;
      if (!isControlled) setLocalOpen(next);
      onOpenChange?.(next);
    }, [disabled, open, isControlled, onOpenChange]);

    return (
      <CollapsibleContext.Provider value={{ open, toggle, disabled }}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          data-disabled={disabled || undefined}
          className={cn(collapsibleVariants({ variant, className }))}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);

Collapsible.displayName = "Collapsible";

/**
 * CollapsibleTrigger — 折叠触发按钮
 * 点击切换展开/收起，右侧默认显示 ChevronDown 图标随展开状态旋转。
 */
export const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ className, hideIcon = false, children, ...props }, ref) => {
  const { open, toggle, disabled } = useCollapsibleContext();

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-disabled={disabled}
      disabled={disabled}
      className={cn(
        "flex w-full items-center justify-between",
        "py-[var(--space-content)] px-[var(--space-group)]",
        "text-[length:var(--font-body-md-size)] leading-[var(--font-body-md-height)]",
        "font-medium text-[var(--text-heading)]",
        "cursor-pointer select-none",
        "transition-colors duration-150",
        "hover:bg-[var(--bg-ghost-hover)]",
        "active:bg-[var(--bg-ghost-active)]",
        "disabled:text-[var(--text-disabled)] disabled:cursor-not-allowed disabled:hover:bg-transparent",
        "focus-visible:outline-none",
        className
      )}
      onClick={toggle}
      {...props}
    >
      <span className="flex-1 text-left">{children}</span>
      {!hideIcon && (
        <ChevronDown
          size={16}
          className={cn(
            "shrink-0 ml-[var(--space-tight)]",
            "text-[var(--text-secondary)]",
            "transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      )}
    </button>
  );
});

CollapsibleTrigger.displayName = "CollapsibleTrigger";

/**
 * CollapsibleContent — 折叠内容区域
 * 使用 CSS grid 动画过渡高度，展开时 grid-rows-[1fr]，收起时 grid-rows-[0fr]。
 */
export const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ className, children, ...props }, ref) => {
  const { open } = useCollapsibleContext();

  return (
    <div
      ref={ref}
      role="region"
      data-state={open ? "open" : "closed"}
      className={cn(
        "grid transition-[grid-template-rows] duration-200 ease-in-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "px-[var(--space-group)] pb-[var(--space-content)]",
            "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
            "text-[var(--text-body)]",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

CollapsibleContent.displayName = "CollapsibleContent";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { collapsibleVariants };
