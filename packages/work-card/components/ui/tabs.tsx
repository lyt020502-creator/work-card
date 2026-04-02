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
// Tabs 标签页组件
//
// 关键语义变量速查（theme.css :root）：
//   品牌色        --brand-base (#3377FF) — 选中态下划线/文字
//   品牌 hover    --brand-hover (#5993FF)
//   文本色        --text-heading (#11141A) / --text-secondary (#5C6473)
//   禁用色        --text-disabled (#C7CDD9)
//   边框色        --border-color (#DCDFE5)
//   背景色        --bg-primary (#FFFFFF) / --bg-ghost-hover (#F7F8FA)
//   间距          --space-tight (8px) / --space-content (12px) / --space-group (16px)
//   字号          --font-label-size (13px) / --font-body-md-size (14px)
// ────────────────────────────────────────────────────────────

/** 标签栏列表容器 */
const tabsListVariants = cva(
  [
    "relative flex",
    "font-['PingFang_SC',sans-serif]",
    "border-b border-[var(--border-color)]",
  ],
  {
    variants: {
      size: {
        sm: "gap-[var(--space-group)]",
        md: "gap-[var(--space-section)]",
        lg: "gap-[var(--space-region)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/** 单个标签触发器 */
const tabsTriggerVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "whitespace-nowrap select-none cursor-pointer",
    "transition-colors duration-150",
    "border-b-2 border-transparent",
    // 底部指示线偏移（与容器 border-b 重叠）
    "mb-[-1px]",
    "focus-visible:outline-none",
  ],
  {
    variants: {
      size: {
        sm: [
          "pb-[var(--space-tight)]",
          "text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)]",
        ],
        md: [
          "pb-[var(--space-content)]",
          "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
        ],
        lg: [
          "pb-[var(--space-content)]",
          "text-[length:var(--font-body-md-size)] leading-[var(--font-body-md-height)]",
        ],
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (key: string) => void;
  size: "sm" | "md" | "lg";
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">,
    VariantProps<typeof tabsListVariants> {
  /** 受控当前激活 tab key */
  value?: string;
  /** 非受控默认激活 tab key */
  defaultValue?: string;
  /** tab 切换回调 */
  onValueChange?: (value: string) => void;
}

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Tab 唯一标识（必填） */
  value: string;
  /** 是否禁用 */
  disabled?: boolean;
}

export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 对应的 tab key（必填） */
  value: string;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("useTabsContext must be used within <Tabs>");
  return ctx;
}

/**
 * Tabs — 标签页根容器
 * 管理激活标签状态，支持受控/非受控模式。
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      size = "md",
      value: valueProp,
      defaultValue = "",
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [localActive, setLocalActive] = React.useState(defaultValue);
    const activeTab = isControlled ? valueProp : localActive;

    const setActiveTab = React.useCallback(
      (key: string) => {
        if (!isControlled) setLocalActive(key);
        onValueChange?.(key);
      },
      [isControlled, onValueChange]
    );

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab, size: size ?? "md" }}>
        <div
          ref={ref}
          className={cn("w-full", className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

/**
 * TabsList — 标签栏列表容器
 * 水平排列所有 TabsTrigger，底部带分割线。
 */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useTabsContext();

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(tabsListVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = "TabsList";

/**
 * TabsTrigger — 单个标签触发按钮
 * 选中态显示品牌色下划线和文字，hover 态文字变深。
 */
export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const { activeTab, setActiveTab, size } = useTabsContext();
    const isActive = activeTab === value;

    const handleClick = () => {
      if (disabled) return;
      setActiveTab(value);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled}
        disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        className={cn(
          tabsTriggerVariants({ size }),
          isActive
            ? "text-[var(--brand-base)] border-b-[var(--brand-base)] font-medium"
            : "text-[var(--text-secondary)] hover:text-[var(--text-heading)]",
          disabled && "text-[var(--text-disabled)] cursor-not-allowed hover:text-[var(--text-disabled)]",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

/**
 * TabsContent — 标签页内容面板
 * 仅当对应 tab 激活时渲染。
 */
export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab } = useTabsContext();
    if (activeTab !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        className={cn("pt-[var(--space-group)]", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = "TabsContent";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { tabsListVariants, tabsTriggerVariants };
