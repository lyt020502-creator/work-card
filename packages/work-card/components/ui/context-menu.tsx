// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronRight, Check } from "lucide-react";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// ContextMenu 上下文菜单组件（右键菜单）
//
// 与 DropdownMenu 共享视觉规格，区别在于触发方式为右键点击。
//
// 关键语义变量速查（theme.css :root）：
//   面板背景      --bg-primary (#FFFFFF)
//   面板阴影      --shadow-md (0 2px 20px 0 rgba(17, 20, 26, 0.16))
//   面板圆角      --corner-sm (4px)
//   选项高度      30px
//   选项内边距    px-[14px]
//   选项字号      --font-label-size (13px) / --font-label-height (20px)
//   选项文字色    --text-heading (#11141A)
//   hover 背景    --bg-ghost-hover (#F7F8FA)
//   禁用文字色    --text-disabled (#C7CDD9)
//   分割线颜色    --border-color (#DCDFE5)
//   分组标题      11px / --text-help (#878D99)
//   子菜单箭头    ChevronRight 12px / --text-help
//   勾选图标      Check 12px / --brand-base (#3377FF)
// ────────────────────────────────────────────────────────────

/** 上下文菜单面板容器 */
const contextMenuContentVariants = cva([
  "fixed z-50",
  "bg-[var(--bg-primary)]",
  "rounded-[var(--corner-sm)]",
  "shadow-[var(--shadow-md)]",
  "py-[6px]",
  "min-w-[160px]",
  "outline-none",
  "font-['PingFang_SC',sans-serif]",
]);

/** 上下文菜单项 */
const contextMenuItemVariants = cva(
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

interface ContextMenuContextValue {
  open: boolean;
  position: { x: number; y: number };
  setOpen: (open: boolean) => void;
  setPosition: (pos: { x: number; y: number }) => void;
}

export interface ContextMenuProps {
  children: React.ReactNode;
}

export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 最大高度（超出时可滚动） */
  maxHeight?: number | string;
}

export interface ContextMenuItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击回调 */
  onClick?: () => void;
  /** 快捷键提示文本 */
  shortcut?: string;
  /** 左侧图标 */
  icon?: React.ReactNode;
}

export interface ContextMenuCheckboxItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  /** 是否选中 */
  checked?: boolean;
  /** 选中状态变化回调 */
  onCheckedChange?: (checked: boolean) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

export interface ContextMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ContextMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 分组标题 */
  label?: string;
}

export interface ContextMenuSubProps {
  children: React.ReactNode;
}

export interface ContextMenuSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否禁用 */
  disabled?: boolean;
}

export interface ContextMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 最大高度 */
  maxHeight?: number | string;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

const ContextMenuContext = React.createContext<ContextMenuContextValue | null>(null);

function useContextMenuContext(): ContextMenuContextValue {
  const ctx = React.useContext(ContextMenuContext);
  if (!ctx) throw new Error("useContextMenuContext must be used within <ContextMenu>");
  return ctx;
}

/**
 * ContextMenu — 上下文菜单根组件
 * 管理右键菜单的显示状态和位置。
 */
export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    // 点击外部或滚动时关闭
    React.useEffect(() => {
      if (!open) return;
      const close = () => setOpen(false);
      document.addEventListener("mousedown", close);
      document.addEventListener("scroll", close, true);
      return () => {
        document.removeEventListener("mousedown", close);
        document.removeEventListener("scroll", close, true);
      };
    }, [open]);

    // Escape 键关闭
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open]);

    return (
      <ContextMenuContext.Provider value={{ open, position, setOpen, setPosition }}>
        <div ref={ref} className="contents">
          {children}
        </div>
      </ContextMenuContext.Provider>
    );
  }
);

ContextMenu.displayName = "ContextMenu";

/**
 * ContextMenuTrigger — 右键触发区域
 * 包裹目标元素，监听 contextmenu 事件。
 */
export const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const { setOpen, setPosition } = useContextMenuContext();

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setOpen(true);
    };

    return (
      <div
        ref={ref}
        className={cn("", className)}
        onContextMenu={handleContextMenu}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ContextMenuTrigger.displayName = "ContextMenuTrigger";

/**
 * ContextMenuContent — 上下文菜单面板
 * 使用 fixed 定位，位置跟随右键点击坐标。
 */
export const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, maxHeight, children, style, ...props }, ref) => {
    const { open, position } = useContextMenuContext();

    if (!open) return null;

    const maxHeightStyle =
      maxHeight !== undefined
        ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }
        : undefined;

    return (
      <div
        ref={ref}
        role="menu"
        className={cn(
          contextMenuContentVariants(),
          maxHeight !== undefined && "overflow-y-auto",
          className
        )}
        style={{
          left: position.x,
          top: position.y,
          ...maxHeightStyle,
          ...style,
        }}
        // 阻止 mousedown 冒泡，避免触发外部关闭
        onMouseDown={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ContextMenuContent.displayName = "ContextMenuContent";

/**
 * ContextMenuItem — 单个菜单项
 */
export const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, disabled = false, onClick, shortcut, icon, children, ...props }, ref) => {
    const { setOpen } = useContextMenuContext();

    const handleClick = () => {
      if (disabled) return;
      onClick?.();
      setOpen(false);
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        className={cn(
          contextMenuItemVariants({ disabled: disabled ? "yes" : "no" }),
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="flex items-center gap-[var(--space-tight)] flex-1 truncate">
          {icon && (
            <span className="inline-flex shrink-0 w-4 h-4 items-center justify-center" aria-hidden="true">
              {icon}
            </span>
          )}
          {children}
        </span>
        {shortcut && (
          <span className="ml-[var(--space-section)] text-[length:var(--font-caption-size)] text-[var(--text-help)]">
            {shortcut}
          </span>
        )}
      </div>
    );
  }
);

ContextMenuItem.displayName = "ContextMenuItem";

/**
 * ContextMenuCheckboxItem — 可勾选菜单项
 */
export const ContextMenuCheckboxItem = React.forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ className, checked = false, onCheckedChange, disabled = false, children, ...props }, ref) => {
    const handleClick = () => {
      if (disabled) return;
      onCheckedChange?.(!checked);
    };

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        aria-disabled={disabled}
        className={cn(
          contextMenuItemVariants({ disabled: disabled ? "yes" : "no" }),
          "pl-[30px]",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {checked && (
          <Check
            size={12}
            className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[var(--brand-base)]"
            aria-hidden="true"
          />
        )}
        {children}
      </div>
    );
  }
);

ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

/**
 * ContextMenuSeparator — 分割线
 */
export const ContextMenuSeparator = React.forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
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

ContextMenuSeparator.displayName = "ContextMenuSeparator";

/**
 * ContextMenuGroup — 菜单项分组
 */
export const ContextMenuGroup = React.forwardRef<HTMLDivElement, ContextMenuGroupProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <div ref={ref} role="group" className={cn("", className)} {...props}>
        {label && (
          <div className="flex items-center h-[20px] px-[14px] mb-[2px]">
            <span className="text-[11px] leading-normal font-normal text-[var(--text-help)] whitespace-nowrap">
              {label}
            </span>
          </div>
        )}
        {children}
      </div>
    );
  }
);

ContextMenuGroup.displayName = "ContextMenuGroup";

/**
 * ContextMenuSub — 子菜单容器
 */
export const ContextMenuSub = React.forwardRef<HTMLDivElement, ContextMenuSubProps>(
  ({ children }, ref) => {
    const [subOpen, setSubOpen] = React.useState(false);

    return (
      <div
        ref={ref}
        className="relative"
        onMouseLeave={() => setSubOpen(false)}
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

ContextMenuSub.displayName = "ContextMenuSub";

/**
 * ContextMenuSubTrigger — 子菜单触发项，右侧显示 ChevronRight 箭头
 */
export const ContextMenuSubTrigger = React.forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
  ({ className, disabled = false, children, ...props }, ref) => {
    const setSubOpen = props["data-set-sub-open" as keyof typeof props] as ((v: boolean) => void) | undefined;

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-haspopup="menu"
        aria-disabled={disabled}
        className={cn(
          contextMenuItemVariants({ disabled: disabled ? "yes" : "no" }),
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

ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

/**
 * ContextMenuSubContent — 子菜单面板
 * 定位于父触发项右侧。
 */
export const ContextMenuSubContent = React.forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  ({ className, maxHeight, children, style, ...props }, ref) => {
    const isOpen = props["data-sub-open" as keyof typeof props] as boolean | undefined;

    if (!isOpen) return null;

    const maxHeightStyle =
      maxHeight !== undefined
        ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }
        : undefined;

    return (
      <div
        ref={ref}
        role="menu"
        className={cn(
          "absolute z-50 left-full top-0",
          "bg-[var(--bg-primary)]",
          "rounded-[var(--corner-sm)]",
          "shadow-[var(--shadow-md)]",
          "py-[6px]",
          "min-w-[120px]",
          maxHeight !== undefined && "overflow-y-auto",
          className
        )}
        style={{ ...maxHeightStyle, ...style }}
        onMouseDown={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ContextMenuSubContent.displayName = "ContextMenuSubContent";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { contextMenuContentVariants, contextMenuItemVariants };
