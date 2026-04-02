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
// Accordion 折叠面板组件
//
// 关键语义变量速查（theme.css :root）：
//   边框色        --border-color (#DCDFE5)
//   背景色        --bg-primary (#FFFFFF)
//   标题文本      --text-heading (#11141A)
//   内容文本      --text-body (#11141A)
//   辅助文本      --text-secondary (#5C6473)
//   圆角          --corner-sm (4px)
//   间距          --space-tight (8px) / --space-content (12px) / --space-group (16px)
//   标题字号      --font-body-md-size (14px) / --font-body-md-height (21px)
//   内容字号      --font-label-size (13px) / --font-label-height (20px)
// ────────────────────────────────────────────────────────────
const accordionVariants = cva(
  [
    "w-full",
    "font-['PingFang_SC',sans-serif]",
  ],
  {
    variants: {
      /**
       * variant — 面板外观
       * default: 分割线分隔，无边框（默认）
       * bordered: 带边框和圆角
       */
      variant: {
        default: "divide-y divide-[var(--border-color)]",
        bordered: [
          "border border-[var(--border-color)]",
          "rounded-[var(--corner-sm)]",
          "divide-y divide-[var(--border-color)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const accordionItemVariants = cva(
  [
    "bg-[var(--bg-primary)]",
  ],
  {
    variants: {
      variant: {
        default: "",
        bordered: "first:rounded-t-[var(--corner-sm)] last:rounded-b-[var(--corner-sm)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

/** Accordion 根组件 Context 值 */
interface AccordionContextValue {
  expandedItems: Set<string>;
  toggle: (key: string) => void;
  variant: "default" | "bordered";
}

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  /** 受控展开项的 key 集合 */
  expandedKeys?: string[];
  /** 非受控默认展开项的 key 集合 */
  defaultExpandedKeys?: string[];
  /** 展开项变化回调 */
  onExpandedChange?: (keys: string[]) => void;
  /** 是否只允许同时展开一项（手风琴模式），默认 false */
  single?: boolean;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 面板唯一标识（必填），用于控制展开/收起 */
  itemKey: string;
  /** 是否禁用该项 */
  disabled?: boolean;
}

export interface AccordionTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** 对应 AccordionItem 的 itemKey（内部自动传入，无需手动设置） */
  itemKey?: string;
  /** 是否禁用 */
  disabled?: boolean;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 对应 AccordionItem 的 itemKey（内部自动传入，无需手动设置） */
  itemKey?: string;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext(): AccordionContextValue {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("useAccordionContext must be used within <Accordion>");
  return ctx;
}

/**
 * Accordion — 折叠面板根容器
 * 管理展开状态，支持单项/多项展开模式。
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      variant = "default",
      expandedKeys: expandedKeysProp,
      defaultExpandedKeys = [],
      onExpandedChange,
      single = false,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = expandedKeysProp !== undefined;
    const [localExpanded, setLocalExpanded] = React.useState<Set<string>>(
      new Set(defaultExpandedKeys)
    );
    const expandedItems = isControlled
      ? new Set(expandedKeysProp)
      : localExpanded;

    const toggle = React.useCallback(
      (key: string) => {
        const next = new Set(expandedItems);
        if (next.has(key)) {
          next.delete(key);
        } else {
          if (single) next.clear();
          next.add(key);
        }
        if (!isControlled) setLocalExpanded(next);
        onExpandedChange?.(Array.from(next));
      },
      [expandedItems, isControlled, single, onExpandedChange]
    );

    return (
      <AccordionContext.Provider value={{ expandedItems, toggle, variant: variant ?? "default" }}>
        <div
          ref={ref}
          className={cn(accordionVariants({ variant, className }))}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

/**
 * AccordionItem — 单个折叠面板项
 * 包裹 AccordionTrigger 和 AccordionContent，
 * 自动将 itemKey 向下传递给子组件。
 */
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, itemKey, disabled = false, children, ...props }, ref) => {
    const { variant } = useAccordionContext();

    return (
      <div
        ref={ref}
        className={cn(accordionItemVariants({ variant }), className)}
        data-accordion-item={itemKey}
        data-disabled={disabled || undefined}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ itemKey?: string; disabled?: boolean }>, {
              itemKey,
              disabled,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

/**
 * AccordionTrigger — 折叠面板触发按钮
 * 点击切换展开/收起，右侧显示 ChevronDown 图标随展开状态旋转。
 */
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, itemKey, disabled = false, children, ...props }, ref) => {
    const { expandedItems, toggle } = useAccordionContext();
    const isExpanded = itemKey ? expandedItems.has(itemKey) : false;

    const handleClick = () => {
      if (disabled || !itemKey) return;
      toggle(itemKey);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isExpanded}
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
        onClick={handleClick}
        {...props}
      >
        <span className="flex-1 text-left">{children}</span>
        <ChevronDown
          size={16}
          className={cn(
            "shrink-0 ml-[var(--space-tight)]",
            "text-[var(--text-secondary)]",
            "transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

/**
 * AccordionContent — 折叠面板内容区域
 * 展开时显示，收起时隐藏（使用 CSS grid 动画过渡高度）。
 */
export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, itemKey, children, ...props }, ref) => {
    const { expandedItems } = useAccordionContext();
    const isExpanded = itemKey ? expandedItems.has(itemKey) : false;

    return (
      <div
        ref={ref}
        role="region"
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-in-out",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
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
  }
);

AccordionContent.displayName = "AccordionContent";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { accordionVariants, accordionItemVariants };
