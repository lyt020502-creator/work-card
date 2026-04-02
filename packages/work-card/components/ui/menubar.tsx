// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronRight } from "lucide-react";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// Menubar 顶部菜单栏组件
//
// 关键语义变量速查（theme.css :root）：
//   背景色        --bg-primary (#FFFFFF) — 菜单栏背景
//   边框色        --border-color (#DCDFE5) — 底部边框
//   文本色        --text-heading (#11141A) / --text-secondary (#5C6473)
//   禁用色        --text-disabled (#C7CDD9)
//   hover 背景    --bg-ghost-hover (#F7F8FA)
//   active 背景   --bg-ghost-active (#EDF0F5)
//   品牌色        --brand-base (#3377FF) — 选中态
//   面板背景      --bg-primary (#FFFFFF)
//   面板阴影      --shadow-md
//   面板圆角      --corner-sm (4px)
//   选项高度      30px（同 DropdownMenu）
//   字号          --font-label-size (13px) / --font-label-height (20px)
// ────────────────────────────────────────────────────────────
const menubarVariants = cva(
  [
    "flex items-center",
    "bg-[var(--bg-primary)]",
    "border-b border-[var(--border-color)]",
    "font-['PingFang_SC',sans-serif]",
    "h-[var(--comp-height-xl)]",
    "px-[var(--space-tight)]",
  ],
  {
    variants: {
      size: {
        sm: "h-[var(--comp-height-lg)] gap-0",
        md: "h-[var(--comp-height-xl)] gap-0",
        lg: "h-[var(--comp-height-2xl)] gap-[var(--space-intimate)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/** 顶级菜单触发项样式 */
const menubarTriggerVariants = cva(
  [
    "inline-flex items-center justify-center",
    "px-[var(--space-content)] h-[var(--comp-height-md)]",
    "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
    "font-normal text-[var(--text-heading)]",
    "rounded-[var(--corner-sm)]",
    "whitespace-nowrap select-none cursor-pointer",
    "transition-colors duration-100",
    "hover:bg-[var(--bg-ghost-hover)]",
    "active:bg-[var(--bg-ghost-active)]",
  ],
  {
    variants: {
      size: {
        sm: "px-[var(--space-tight)] h-[22px] text-[length:var(--font-caption-size)]",
        md: "px-[var(--space-content)] h-[var(--comp-height-md)]",
        lg: "px-[var(--space-group)] h-[28px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/** 下拉面板项样式 */
const menubarItemVariants = cva(
  [
    "relative flex items-center justify-between",
    "w-full h-[30px] px-[14px]",
    "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
    "font-normal whitespace-nowrap select-none",
    "transition-colors duration-100",
  ],
  {
    variants: {
      disabled: {
        yes: "text-[var(--text-disabled)] cursor-not-allowed",
        no: [
          "text-[var(--text-heading)]",
          "cursor-pointer",
          "hover:bg-[var(--bg-ghost-hover)]",
          "active:bg-[var(--bg-ghost-hover)]",
        ],
      },
    },
    defaultVariants: {
      disabled: "no",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

interface MenubarContextValue {
  activeMenu: string | null;
  setActiveMenu: (key: string | null) => void;
  size: "sm" | "md" | "lg";
}

interface MenubarMenuContextValue {
  menuKey: string;
}

export interface MenubarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menubarVariants> {}

export interface MenubarMenuProps {
  /** 菜单唯一标识 */
  value: string;
  children: React.ReactNode;
}

export interface MenubarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 对齐方式，默认 start */
  align?: "start" | "center" | "end";
}

export interface MenubarItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击回调 */
  onClick?: () => void;
  /** 快捷键提示文本 */
  shortcut?: string;
}

export interface MenubarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface MenubarSubProps {
  children: React.ReactNode;
}

export interface MenubarSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否禁用 */
  disabled?: boolean;
}

export interface MenubarSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

// ── Part 5: 组件实现 ─────────────────────────────────────────

const MenubarContext = React.createContext<MenubarContextValue | null>(null);
const MenubarMenuContext = React.createContext<MenubarMenuContextValue | null>(null);

function useMenubarContext(): MenubarContextValue {
  const ctx = React.useContext(MenubarContext);
  if (!ctx) throw new Error("useMenubarContext must be used within <Menubar>");
  return ctx;
}

function useMenubarMenuContext(): MenubarMenuContextValue {
  const ctx = React.useContext(MenubarMenuContext);
  if (!ctx) throw new Error("useMenubarMenuContext must be used within <MenubarMenu>");
  return ctx;
}

/**
 * Menubar — 顶部菜单栏根容器
 * 管理当前激活的顶级菜单项。
 */
export const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // 点击外部关闭所有菜单
    React.useEffect(() => {
      if (!activeMenu) return;
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setActiveMenu(null);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [activeMenu]);

    // Escape 键关闭
    React.useEffect(() => {
      if (!activeMenu) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveMenu(null);
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [activeMenu]);

    const mergeRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    return (
      <MenubarContext.Provider value={{ activeMenu, setActiveMenu, size: size ?? "md" }}>
        <div
          ref={mergeRef}
          role="menubar"
          className={cn(menubarVariants({ size, className }))}
          {...props}
        >
          {children}
        </div>
      </MenubarContext.Provider>
    );
  }
);

Menubar.displayName = "Menubar";

/**
 * MenubarMenu — 单个顶级菜单容器
 * 包裹 MenubarTrigger 和 MenubarContent。
 */
export const MenubarMenu = React.forwardRef<HTMLDivElement, MenubarMenuProps>(
  ({ value, children }, ref) => {
    return (
      <MenubarMenuContext.Provider value={{ menuKey: value }}>
        <div ref={ref} className="relative inline-flex">
          {children}
        </div>
      </MenubarMenuContext.Provider>
    );
  }
);

MenubarMenu.displayName = "MenubarMenu";

/**
 * MenubarTrigger — 顶级菜单触发按钮
 * 点击打开/关闭面板；当已有菜单打开时，hover 可切换到其他菜单。
 */
export const MenubarTrigger = React.forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { activeMenu, setActiveMenu, size } = useMenubarContext();
    const { menuKey } = useMenubarMenuContext();
    const isActive = activeMenu === menuKey;

    const handleClick = () => {
      setActiveMenu(isActive ? null : menuKey);
    };

    const handleMouseEnter = () => {
      // 当已有菜单展开时，hover 自动切换
      if (activeMenu !== null && activeMenu !== menuKey) {
        setActiveMenu(menuKey);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        aria-expanded={isActive}
        aria-haspopup="true"
        className={cn(
          menubarTriggerVariants({ size }),
          isActive && "bg-[var(--bg-ghost-active)]",
          className
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MenubarTrigger.displayName = "MenubarTrigger";

/**
 * MenubarContent — 菜单下拉面板
 * 仅在对应菜单激活时渲染。
 */
export const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className, align = "start", children, ...props }, ref) => {
    const { activeMenu } = useMenubarContext();
    const { menuKey } = useMenubarMenuContext();

    if (activeMenu !== menuKey) return null;

    const alignClass =
      align === "center"
        ? "left-1/2 -translate-x-1/2"
        : align === "end"
          ? "right-0"
          : "left-0";

    return (
      <div
        ref={ref}
        role="menu"
        className={cn(
          "absolute z-50 top-full mt-[2px]",
          alignClass,
          "min-w-[160px]",
          "bg-[var(--bg-primary)]",
          "rounded-[var(--corner-sm)]",
          "shadow-[var(--shadow-md)]",
          "py-[6px]",
          "outline-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MenubarContent.displayName = "MenubarContent";

/**
 * MenubarItem — 菜单项
 * 支持禁用、快捷键提示。
 */
export const MenubarItem = React.forwardRef<HTMLDivElement, MenubarItemProps>(
  ({ className, disabled = false, onClick, shortcut, children, ...props }, ref) => {
    const { setActiveMenu } = useMenubarContext();

    const handleClick = () => {
      if (disabled) return;
      onClick?.();
      setActiveMenu(null);
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        className={cn(
          menubarItemVariants({ disabled: disabled ? "yes" : "no" }),
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="flex-1 truncate">{children}</span>
        {shortcut && (
          <span className="ml-[var(--space-section)] text-[length:var(--font-caption-size)] text-[var(--text-help)]">
            {shortcut}
          </span>
        )}
      </div>
    );
  }
);

MenubarItem.displayName = "MenubarItem";

/**
 * MenubarSeparator — 菜单分割线
 */
export const MenubarSeparator = React.forwardRef<HTMLDivElement, MenubarSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("mx-[14px] my-[4px] h-px bg-[var(--border-color)]", className)}
        {...props}
      />
    );
  }
);

MenubarSeparator.displayName = "MenubarSeparator";

/**
 * MenubarSub — 子菜单容器
 */
export const MenubarSub = React.forwardRef<HTMLDivElement, MenubarSubProps>(
  ({ children }, ref) => {
    const [subOpen, setSubOpen] = React.useState(false);

    return (
      <div
        ref={ref}
        className="relative"
        onMouseLeave={() => setSubOpen(false)}
        data-sub-open={subOpen || undefined}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ "data-sub-open"?: boolean; "data-set-sub-open"?: (v: boolean) => void }>, {
              "data-sub-open": subOpen,
              "data-set-sub-open": setSubOpen,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

MenubarSub.displayName = "MenubarSub";

/**
 * MenubarSubTrigger — 子菜单触发项，右侧显示箭头图标
 */
export const MenubarSubTrigger = React.forwardRef<HTMLDivElement, MenubarSubTriggerProps>(
  ({ className, disabled = false, children, ...props }, ref) => {
    const setSubOpen = props["data-set-sub-open" as keyof typeof props] as ((v: boolean) => void) | undefined;

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-haspopup="menu"
        aria-disabled={disabled}
        className={cn(
          menubarItemVariants({ disabled: disabled ? "yes" : "no" }),
          className
        )}
        onMouseEnter={() => {
          if (!disabled && setSubOpen) setSubOpen(true);
        }}
        {...props}
      >
        <span className="flex-1 truncate">{children}</span>
        <ChevronRight
          size={12}
          className="shrink-0 ml-[var(--space-tight)] text-[var(--text-help)]"
          aria-hidden="true"
        />
      </div>
    );
  }
);

MenubarSubTrigger.displayName = "MenubarSubTrigger";

/**
 * MenubarSubContent — 子菜单面板
 */
export const MenubarSubContent = React.forwardRef<HTMLDivElement, MenubarSubContentProps>(
  ({ className, children, ...props }, ref) => {
    const isOpen = props["data-sub-open" as keyof typeof props] as boolean | undefined;

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        role="menu"
        className={cn(
          "absolute z-50 left-full top-0",
          "min-w-[160px]",
          "bg-[var(--bg-primary)]",
          "rounded-[var(--corner-sm)]",
          "shadow-[var(--shadow-md)]",
          "py-[6px]",
          "outline-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MenubarSubContent.displayName = "MenubarSubContent";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { menubarVariants, menubarTriggerVariants, menubarItemVariants };
