// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronRight } from "lucide-react";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// DropdownMenu Token 速查（基于 Figma 实测）：
//   面板背景：      --bg-primary        (#FFFFFF)     ← Figma rgba(255,255,255,1)
//   面板阴影：      --shadow-md         (0 2px 20px 0 rgba(17, 20, 26, 0.16))  ← 浮层/下拉专用
//   面板圆角：      --corner-sm         (4px)         ← Figma rounded-[3px]
//   面板上下内边距：py-[6px]
//   选项高度：      30px                              ← Figma h-[30px]
//   选项水平内边距：px-[14px]                          ← Figma pr/pl-[14px]
//   选项字号：      --font-label-size   (13px)
//   选项文字色：    --text-heading      (#11141A)     ← Figma rgba(17,20,26,1)
//   选项 hover 背：--bg-ghost-hover    (#F7F8FA)
//   禁用文字色：    --text-disabled     (#C7CDD9)     ← Figma rgba(200,201,204,1)
//   分割线颜色：    --border-color      (#DCDFE5)
//   分组标题字号：  11px
//   分组标题颜色：  --text-help         (#878D99)     ← Figma rgba(113,120,134,1)
//   子菜单箭头：    ChevronRight 12px / --text-help
// ────────────────────────────────────────────────────────────

/** 下拉面板容器样式 */
const dropdownMenuContentVariants = cva([
  "absolute z-50",
  "bg-[var(--bg-primary)]",
  "rounded-[var(--corner-sm)]",
  "shadow-[var(--shadow-md)]",
  "py-[6px]",
  "min-w-[120px]",
  "outline-none",
]);

/** 菜单选项样式 */
const dropdownMenuItemVariants = cva(
  [
    "relative flex flex-row items-center justify-between",
    "w-full h-[30px] px-[14px]",
    "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
    "font-['PingFang_SC',sans-serif] font-normal",
    "whitespace-nowrap select-none",
    "transition-colors duration-100",
  ],
  {
    variants: {
      /**
       * disabled — 禁用态控制
       *   yes: 灰色文字，禁止指针事件，无 hover 效果
       *   no:  正常文字，pointer 鼠标，hover/active 浅灰背景
       */
      disabled: {
        yes: [
          "text-[var(--text-disabled)]",
          "cursor-not-allowed",
        ],
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

/** 下拉菜单触发按钮样式（独立规范，不依赖 Button 组件）*/
const dropdownMenuButtonVariants = cva([
  "inline-flex items-center justify-center gap-[var(--space-intimate)]",
  "h-[26px] px-[4px]",
  "rounded-[3px]",
  "bg-[var(--bg-secondary)]",
  "text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)]",
  "font-['PingFang_SC',sans-serif] font-normal",
  "text-[var(--text-heading)]",
  "whitespace-nowrap select-none cursor-pointer",
  "transition-colors",
  "hover:bg-[var(--bg-secondary-hover)]",
  "active:bg-[var(--bg-secondary-active)]",
  "disabled:text-[var(--text-disabled)] disabled:cursor-not-allowed",
]);

// ── Part 4: Props 类型定义 ────────────────────────────────────

/** 弹出方向 */
export type DropdownMenuPlacement =
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight"
  | "topLeft"
  | "top"
  | "topRight";

/** 触发方式 */
export type DropdownMenuTriggerMode = "click" | "hover";

// —— 内部 Context 值类型（不对外暴露） ——
interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (fn: boolean | ((prev: boolean) => boolean)) => void;
  triggerMode: DropdownMenuTriggerMode;
  placement: DropdownMenuPlacement;
  closeOnSelect: boolean;
  startCloseTimer: () => void;
  cancelCloseTimer: () => void;
}

interface DropdownMenuSubContextValue {
  subOpen: boolean;
  setSubOpen: (open: boolean) => void;
}

// —— 组件 Props 接口 ——

export interface DropdownMenuProps {
  /** 受控展开状态 */
  open?: boolean;
  /** 非受控默认展开状态 */
  defaultOpen?: boolean;
  /** 展开状态变更回调 */
  onOpenChange?: (open: boolean) => void;
  /** 弹出方向，默认 bottomLeft */
  placement?: DropdownMenuPlacement;
  /** 触发方式，默认 click */
  trigger?: DropdownMenuTriggerMode;
  /** 选中项后是否自动关闭面板，默认 true */
  closeOnSelect?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface DropdownMenuTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否禁用触发器 */
  disabled?: boolean;
  children: React.ReactNode;
}

export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 最大高度（超出时可滚动）。
   * number 类型单位为 px；string 类型为任意 CSS 值。
   */
  maxHeight?: number | string;
  children: React.ReactNode;
}

export interface DropdownMenuItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  /** 是否禁用该项 */
  disabled?: boolean;
  /** 点击回调（禁用时不触发） */
  onClick?: () => void;
  children: React.ReactNode;
}

export interface DropdownMenuSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownMenuGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 分组标题文案 */
  label?: string;
  children: React.ReactNode;
}

export interface DropdownMenuSubProps {
  children: React.ReactNode;
}

export interface DropdownMenuSubTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否禁用该项 */
  disabled?: boolean;
  children: React.ReactNode;
}

export interface DropdownMenuSubContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 最大高度（超出时可滚动）。
   * number 类型单位为 px；string 类型为任意 CSS 值。
   */
  maxHeight?: number | string;
  children: React.ReactNode;
}

export interface DropdownMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 右侧图标，通常传入 ChevronDown */
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

// —— 内部 Context ——
const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);
const DropdownMenuSubContext = React.createContext<DropdownMenuSubContextValue | null>(null);

function useDropdownMenuContext(): DropdownMenuContextValue {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx) throw new Error("useDropdownMenuContext must be used within <DropdownMenu>");
  return ctx;
}

function useDropdownMenuSubContext(): DropdownMenuSubContextValue {
  const ctx = React.useContext(DropdownMenuSubContext);
  if (!ctx) throw new Error("useDropdownMenuSubContext must be used within <DropdownMenuSub>");
  return ctx;
}

// —— 弹出方向定位工具函数 ——
function getPlacementClasses(placement: DropdownMenuPlacement): string {
  switch (placement) {
    case "bottomLeft":
      return "left-0 top-full mt-[2px]";
    case "bottomCenter":
      return "left-1/2 top-full mt-[2px] -translate-x-1/2";
    case "bottomRight":
      return "right-0 top-full mt-[2px]";
    case "topLeft":
      return "left-0 bottom-full mb-[2px]";
    case "top":
      return "left-1/2 bottom-full mb-[2px] -translate-x-1/2";
    case "topRight":
      return "right-0 bottom-full mb-[2px]";
    default:
      return "left-0 top-full mt-[2px]";
  }
}

/**
 * 下拉菜单根组件，管理展开状态、触发方式和弹出方向。
 * 作为上下文提供者，包裹 DropdownMenuTrigger 和 DropdownMenuContent。
 */
export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      placement = "bottomLeft",
      trigger = "click",
      closeOnSelect = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = openProp !== undefined;
    const [localOpen, setLocalOpen] = React.useState(defaultOpen);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const open = isControlled ? openProp! : localOpen;

    const setOpen = React.useCallback(
      (fn: boolean | ((prev: boolean) => boolean)) => {
        const next = typeof fn === "function" ? fn(open) : fn;
        if (!isControlled) setLocalOpen(next);
        onOpenChange?.(next);
      },
      [isControlled, open, onOpenChange]
    );

    const startCloseTimer = React.useCallback(() => {
      if (trigger !== "hover") return;
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => setOpen(false), 150);
    }, [trigger, setOpen]);

    const cancelCloseTimer = React.useCallback(() => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }, []);

    // click 模式：点击外部关闭面板
    React.useEffect(() => {
      if (!open || trigger !== "click") return;
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open, trigger, setOpen]);

    // Escape 键关闭面板
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open, setOpen]);

    // 卸载时清理 hover 延时器
    React.useEffect(() => {
      return () => {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      };
    }, []);

    // 合并内部 ref 与外部 ref
    const mergeRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    return (
      <DropdownMenuContext.Provider
        value={{
          open,
          setOpen,
          triggerMode: trigger,
          placement,
          closeOnSelect,
          startCloseTimer,
          cancelCloseTimer,
        }}
      >
        <div
          ref={mergeRef}
          className={cn("relative inline-flex", className)}
          {...props}
        >
          {children}
        </div>
      </DropdownMenuContext.Provider>
    );
  }
);
DropdownMenu.displayName = "DropdownMenu";

/**
 * 触发器，包裹任意触发元素并绑定 click / hover 交互事件。
 * click 模式：点击切换面板展开/收起。
 * hover 模式：鼠标进入时展开，鼠标离开后延迟 150ms 收起。
 */
export const DropdownMenuTrigger = React.forwardRef<HTMLDivElement, DropdownMenuTriggerProps>(
  ({ children, disabled = false, className, ...props }, ref) => {
    const { open, setOpen, triggerMode, startCloseTimer, cancelCloseTimer } =
      useDropdownMenuContext();

    const handleClick = () => {
      if (disabled) return;
      setOpen((prev) => !prev);
    };

    const handleMouseEnter = () => {
      if (disabled) return;
      cancelCloseTimer();
      setOpen(true);
    };

    const handleMouseLeave = () => {
      startCloseTimer();
    };

    return (
      <div
        ref={ref}
        className={cn("inline-flex", className)}
        onClick={triggerMode === "click" ? handleClick : undefined}
        onMouseEnter={triggerMode === "hover" ? handleMouseEnter : undefined}
        onMouseLeave={triggerMode === "hover" ? handleMouseLeave : undefined}
        aria-expanded={open}
        aria-haspopup="menu"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

/**
 * 下拉菜单触发按钮（独立规范，不依赖 Button 组件）。
 * 圆角 3px，左右内边距 4px，样式固定不受外部 Button 变体影响。
 * 通过 rightIcon 传入右侧图标（如 ChevronDown）。
 */
export const DropdownMenuButton = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuButtonProps
>(({ children, rightIcon, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(dropdownMenuButtonVariants(), className)}
      {...props}
    >
      {children}
      {rightIcon}
    </button>
  );
});
DropdownMenuButton.displayName = "DropdownMenuButton";

/**
 * 下拉面板。面板不展开时返回 null。
 * 支持 maxHeight 属性设定最大高度，超出时垂直滚动。
 * hover 模式下，鼠标移入面板时取消延迟关闭。
 */
export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ children, maxHeight, className, style, ...props }, ref) => {
    const { open, triggerMode, placement, startCloseTimer, cancelCloseTimer } =
      useDropdownMenuContext();

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
          dropdownMenuContentVariants(),
          getPlacementClasses(placement),
          maxHeight !== undefined && "overflow-y-auto",
          className
        )}
        style={{ ...maxHeightStyle, ...style }}
        onMouseEnter={triggerMode === "hover" ? cancelCloseTimer : undefined}
        onMouseLeave={triggerMode === "hover" ? startCloseTimer : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

/**
 * 单个菜单项。点击时触发 onClick 回调，并在 closeOnSelect=true 时自动关闭面板。
 * 禁用态下不触发点击事件，文字颜色降灰。
 */
export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ children, disabled = false, onClick, className, ...props }, ref) => {
    const { setOpen, closeOnSelect } = useDropdownMenuContext();

    const handleClick = () => {
      if (disabled) return;
      onClick?.();
      if (closeOnSelect) setOpen(false);
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        className={cn(
          dropdownMenuItemVariants({ disabled: disabled ? "yes" : "no" }),
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";

/**
 * 分割线。以 1px 水平线分隔菜单区域，使用 --border-color token。
 */
export const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="separator"
      className={cn("mx-[14px] my-[4px] h-px bg-[var(--border-color)]", className)}
      {...props}
    />
  );
});
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

/**
 * 分组容器，可选显示分组标题。
 * 标题字号 11px，颜色使用 --text-help token。
 */
export const DropdownMenuGroup = React.forwardRef<HTMLDivElement, DropdownMenuGroupProps>(
  ({ label, children, className, ...props }, ref) => {
    return (
      <div ref={ref} role="group" className={cn("", className)} {...props}>
        {label && (
          <div className="flex items-center h-[20px] px-[14px] mb-[2px]">
            <span className="text-[11px] leading-normal font-['PingFang_SC',sans-serif] font-normal text-[var(--text-help)] whitespace-nowrap">
              {label}
            </span>
          </div>
        )}
        {children}
      </div>
    );
  }
);
DropdownMenuGroup.displayName = "DropdownMenuGroup";

/**
 * 多级子菜单根容器，维护子菜单的展开状态。
 * 鼠标离开整个子菜单区域（触发项 + 子面板）时立即关闭，无延迟。
 */
export const DropdownMenuSub = React.forwardRef<HTMLDivElement, DropdownMenuSubProps>(
  ({ children }, ref) => {
    const [subOpen, setSubOpen] = React.useState(false);

    return (
      <DropdownMenuSubContext.Provider value={{ subOpen, setSubOpen }}>
        <div
          ref={ref}
          className="relative"
          onMouseLeave={() => setSubOpen(false)}
        >
          {children}
        </div>
      </DropdownMenuSubContext.Provider>
    );
  }
);
DropdownMenuSub.displayName = "DropdownMenuSub";

/**
 * 多级菜单触发项，右侧显示 ChevronRight 箭头图标。
 * 鼠标悬停时展开子菜单，激活态背景高亮。
 */
export const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSubTriggerProps
>(({ children, disabled = false, className, ...props }, ref) => {
  const { subOpen, setSubOpen } = useDropdownMenuSubContext();

  return (
    <div
      ref={ref}
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={subOpen}
      aria-disabled={disabled}
      className={cn(
        dropdownMenuItemVariants({ disabled: disabled ? "yes" : "no" }),
        className
      )}
      onMouseEnter={() => {
        if (disabled) return;
        setSubOpen(true);
      }}
      {...props}
    >
      <span className="flex-1 truncate">{children}</span>
      <ChevronRight
        size={12}
        className="flex-shrink-0 ml-[var(--space-tight)] text-[var(--text-help)]"
        aria-hidden="true"
      />
    </div>
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

/**
 * 多级菜单内容面板，定位于父触发项右侧（left: 100%，top: 0）。
 */
export const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSubContentProps
>(({ children, maxHeight, className, style, ...props }, ref) => {
  const { subOpen } = useDropdownMenuSubContext();

  if (!subOpen) return null;

  const maxHeightStyle =
    maxHeight !== undefined
      ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }
      : undefined;

  return (
    <div
      ref={ref}
      role="menu"
      className={cn(
        dropdownMenuContentVariants(),
        "left-full top-0",
        maxHeight !== undefined && "overflow-y-auto",
        className
      )}
      style={{ ...maxHeightStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { dropdownMenuContentVariants, dropdownMenuItemVariants, dropdownMenuButtonVariants };
