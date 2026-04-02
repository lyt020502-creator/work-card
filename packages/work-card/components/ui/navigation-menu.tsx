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
// NavigationMenu 导航菜单组件
//
// 关键语义变量速查（theme.css :root）：
//   品牌色        --brand-base (#3377FF) — 激活项指示线/文字
//   品牌 hover    --brand-hover (#5993FF)
//   文本色        --text-heading (#11141A) / --text-secondary (#5C6473)
//   禁用色        --text-disabled (#C7CDD9)
//   hover 背景    --bg-ghost-hover (#F7F8FA)
//   active 背景   --bg-ghost-active (#EDF0F5)
//   面板背景      --bg-primary (#FFFFFF)
//   面板阴影      --shadow-md
//   面板圆角      --corner-sm (4px)
//   边框色        --border-color (#DCDFE5)
//   字号          --font-label-size (13px) / --font-body-md-size (14px)
// ────────────────────────────────────────────────────────────
const navigationMenuVariants = cva(
  [
    "relative",
    "font-['PingFang_SC',sans-serif]",
  ],
  {
    variants: {
      /**
       * orientation — 导航方向
       * horizontal: 水平导航（默认）
       * vertical: 垂直导航
       */
      orientation: {
        horizontal: "flex items-center",
        vertical: "flex flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const navigationMenuItemVariants = cva(
  [
    "relative inline-flex items-center",
    "whitespace-nowrap select-none cursor-pointer",
    "transition-colors duration-150",
    "text-[var(--text-secondary)]",
    "hover:text-[var(--text-heading)]",
    "active:text-[var(--text-heading)]",
  ],
  {
    variants: {
      orientation: {
        horizontal: [
          "px-[var(--space-content)] h-[var(--comp-height-xl)]",
          "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
        ],
        vertical: [
          "w-full px-[var(--space-group)] h-[var(--comp-height-lg)]",
          "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
          "rounded-[var(--corner-sm)]",
          "hover:bg-[var(--bg-ghost-hover)]",
          "active:bg-[var(--bg-ghost-active)]",
        ],
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

interface NavigationMenuContextValue {
  activeItem: string | null;
  setActiveItem: (key: string | null) => void;
  orientation: "horizontal" | "vertical";
  hoverItem: string | null;
  setHoverItem: (key: string | null) => void;
}

export interface NavigationMenuProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationMenuVariants> {
  /** 受控当前激活导航项 */
  value?: string;
  /** 非受控默认激活项 */
  defaultValue?: string;
  /** 激活项变化回调 */
  onValueChange?: (value: string) => void;
}

export interface NavigationMenuListProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface NavigationMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 导航项唯一标识 */
  value: string;
  /** 是否禁用 */
  disabled?: boolean;
}

export interface NavigationMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 对应导航项 value（内部自动传入） */
  value?: string;
}

export interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 对应导航项 value（内部自动传入） */
  value?: string;
}

export interface NavigationMenuLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 是否为当前激活链接 */
  active?: boolean;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

const NavigationMenuContext = React.createContext<NavigationMenuContextValue | null>(null);

function useNavigationMenuContext(): NavigationMenuContextValue {
  const ctx = React.useContext(NavigationMenuContext);
  if (!ctx) throw new Error("useNavigationMenuContext must be used within <NavigationMenu>");
  return ctx;
}

/**
 * NavigationMenu — 导航菜单根容器
 * 管理激活/悬浮状态，支持水平/垂直两种布局。
 */
export const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  (
    {
      className,
      orientation = "horizontal",
      value: valueProp,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [localActive, setLocalActive] = React.useState<string | null>(defaultValue ?? null);
    const [hoverItem, setHoverItem] = React.useState<string | null>(null);
    const activeItem = isControlled ? valueProp ?? null : localActive;
    const containerRef = React.useRef<HTMLElement | null>(null);

    const setActiveItem = React.useCallback(
      (key: string | null) => {
        if (!isControlled) setLocalActive(key);
        if (key) onValueChange?.(key);
      },
      [isControlled, onValueChange]
    );

    // 点击外部关闭悬浮面板
    React.useEffect(() => {
      if (!hoverItem) return;
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setHoverItem(null);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [hoverItem]);

    const mergeRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      },
      [ref]
    );

    return (
      <NavigationMenuContext.Provider
        value={{
          activeItem,
          setActiveItem,
          orientation: orientation ?? "horizontal",
          hoverItem,
          setHoverItem,
        }}
      >
        <nav
          ref={mergeRef}
          className={cn(navigationMenuVariants({ orientation, className }))}
          {...props}
        >
          {children}
        </nav>
      </NavigationMenuContext.Provider>
    );
  }
);

NavigationMenu.displayName = "NavigationMenu";

/**
 * NavigationMenuList — 导航项列表容器
 */
export const NavigationMenuList = React.forwardRef<HTMLDivElement, NavigationMenuListProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useNavigationMenuContext();

    return (
      <div
        ref={ref}
        className={cn(
          orientation === "horizontal"
            ? "flex items-center"
            : "flex flex-col gap-[1px]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavigationMenuList.displayName = "NavigationMenuList";

/**
 * NavigationMenuItem — 单个导航项
 * 包裹 NavigationMenuTrigger（或 NavigationMenuLink）和可选的 NavigationMenuContent。
 */
export const NavigationMenuItem = React.forwardRef<HTMLDivElement, NavigationMenuItemProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const { activeItem, orientation, hoverItem, setHoverItem } = useNavigationMenuContext();
    const isActive = activeItem === value;

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          orientation === "horizontal" ? "inline-flex" : "w-full",
          className
        )}
        onMouseEnter={() => {
          if (!disabled) setHoverItem(value);
        }}
        onMouseLeave={() => setHoverItem(null)}
        data-active={isActive || undefined}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ value?: string; disabled?: boolean }>, {
              value,
              disabled,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

NavigationMenuItem.displayName = "NavigationMenuItem";

/**
 * NavigationMenuTrigger — 导航项触发按钮
 * 点击激活该导航项，带子面板时显示 ChevronDown 图标。
 */
export const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    const { activeItem, setActiveItem, orientation, hoverItem } = useNavigationMenuContext();
    const isActive = activeItem === value;
    const isHovered = hoverItem === value;

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isHovered}
        aria-disabled={disabled}
        disabled={disabled}
        className={cn(
          navigationMenuItemVariants({ orientation }),
          "gap-1",
          isActive && [
            "text-[var(--brand-base)] font-medium",
            orientation === "horizontal" &&
              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--brand-base)]",
          ],
          disabled && "text-[var(--text-disabled)] cursor-not-allowed hover:text-[var(--text-disabled)]",
          className
        )}
        onClick={() => {
          if (!disabled && value) setActiveItem(value);
        }}
        {...props}
      >
        {children}
        <ChevronDown
          size={12}
          className={cn(
            "shrink-0 transition-transform duration-200",
            isHovered && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

/**
 * NavigationMenuContent — 导航项下拉面板
 * 仅当对应导航项被 hover 时显示。
 */
export const NavigationMenuContent = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { hoverItem, orientation } = useNavigationMenuContext();

    if (hoverItem !== value) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50",
          orientation === "horizontal"
            ? "top-full left-0 mt-[2px]"
            : "left-full top-0 ml-[2px]",
          "min-w-[200px]",
          "bg-[var(--bg-primary)]",
          "rounded-[var(--corner-sm)]",
          "shadow-[var(--shadow-md)]",
          "p-[var(--space-content)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavigationMenuContent.displayName = "NavigationMenuContent";

/**
 * NavigationMenuLink — 简单导航链接（无子面板）
 */
export const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ className, active, onClick, children, ...props }, ref) => {
    const { orientation, activeItem, setActiveItem } = useNavigationMenuContext();
    // value 由 NavigationMenuItem 的 cloneElement 注入
    const value = (props as { value?: string }).value;
    const isActive = active ?? (value != null && activeItem === value);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = props.href;
      // 阻止空锚点（"#"、""或无 href）的默认跳转行为
      if (!href || href === "#") {
        e.preventDefault();
      }
      if (value) setActiveItem(value);
      onClick?.(e);
    };

    return (
      <a
        ref={ref}
        className={cn(
          navigationMenuItemVariants({ orientation }),
          isActive && [
            "text-[var(--brand-base)] font-medium",
            orientation === "horizontal" &&
              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--brand-base)]",
          ],
          className
        )}
        aria-current={isActive ? "page" : undefined}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavigationMenuLink.displayName = "NavigationMenuLink";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { navigationMenuVariants, navigationMenuItemVariants };
