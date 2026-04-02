// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Check } from "lucide-react";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// Popover Token 速查（基于 Figma 实测）：
//   深色面板背景：   --color-gray-9   (#242933)   ← Figma rgba(36,41,51,1)
//   浅色面板背景：   --bg-primary     (#FFFFFF)
//   面板圆角：       --corner-sm      (4px)        ← Figma rounded-[4px]
//   浅色阴影：       --shadow-sm                   ← 浮层/卡片专用
//   浅色边框：       --border-color   (#DCDFE5)
//   深色面板文字：   --color-gray-1   (#EFF0F1)    ← Figma rgba(233,233,235,1) 近似
//   浅色面板文字：   --text-heading   (#11141A)
//   深色分组标题：   --color-gray-4   (#878D99)    ← Figma rgba(153,155,159,1) 近似
//   浅色分组标题：   --text-help      (#878D99)
//   深色条目悬停：   --color-gray-8   (#39404D)
//   浅色条目悬停：   --bg-ghost-hover (#F7F8FA)
//   条目文字字号：   --font-label-size (13px)
//   条目行高：       --font-label-height (20px)
//   条目水平内边距： --space-group    (16px)
// ────────────────────────────────────────────────────────────

/** Popover 面板容器样式 */
const popoverContentVariants = cva(
  [
    "absolute z-50",
    "w-max",
    "rounded-[var(--corner-sm)]",
    "font-['PingFang_SC',sans-serif]",
    "outline-none",
  ],
  {
    variants: {
      theme: {
        dark: [
          "bg-[var(--color-gray-9)]",
          "text-[var(--color-gray-1)]",
        ],
        light: [
          "bg-[var(--bg-primary)]",
          "text-[var(--text-heading)]",
          "shadow-[var(--shadow-sm)]",
        ],
      },
    },
    defaultVariants: {
      theme: "dark",
    },
  }
);

/** Popover 菜单条目样式 */
const popoverItemVariants = cva(
  [
    "relative flex items-center",
    "w-full h-[30px] px-[var(--space-group)]",
    "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
    "font-['PingFang_SC',sans-serif] font-normal",
    "whitespace-nowrap select-none",
    "transition-colors duration-100",
  ],
  {
    variants: {
      theme: {
        dark: ["text-[var(--color-gray-1)]"],
        light: ["text-[var(--text-heading)]"],
      },
      disabled: {
        yes: ["opacity-40 cursor-not-allowed"],
        no: ["cursor-pointer"],
      },
    },
    compoundVariants: [
      {
        theme: "dark",
        disabled: "no",
        className: "hover:bg-[var(--color-gray-8)]",
      },
      {
        theme: "light",
        disabled: "no",
        className: "hover:bg-[var(--bg-ghost-hover)]",
      },
    ],
    defaultVariants: {
      theme: "dark",
      disabled: "no",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

/** 弹出方向（12 个位置） */
export type PopoverPlacement =
  | "topLeft"
  | "top"
  | "topRight"
  | "rightTop"
  | "right"
  | "rightBottom"
  | "bottomRight"
  | "bottom"
  | "bottomLeft"
  | "leftBottom"
  | "left"
  | "leftTop";

/** 颜色主题 */
export type PopoverTheme = "dark" | "light";

/** 触发方式 */
export type PopoverTriggerMode = "click" | "hover" | "focus";

// —— 内部 Context 值类型（不对外暴露）——
interface PopoverContextValue {
  open: boolean;
  setOpen: (fn: boolean | ((prev: boolean) => boolean)) => void;
  triggerMode: PopoverTriggerMode;
  placement: PopoverPlacement;
  theme: PopoverTheme;
  showArrow: boolean;
  startCloseTimer: () => void;
  cancelCloseTimer: () => void;
}

// —— 组件 Props 接口 ——

export interface PopoverProps {
  /** 受控展开状态 */
  open?: boolean;
  /** 非受控默认展开状态 */
  defaultOpen?: boolean;
  /** 展开状态变更回调 */
  onOpenChange?: (open: boolean) => void;
  /** 弹出方向，默认 top */
  placement?: PopoverPlacement;
  /** 触发方式，默认 click */
  trigger?: PopoverTriggerMode;
  /** 颜色主题，默认 dark */
  theme?: PopoverTheme;
  /** 是否显示指向箭头，默认 true */
  showArrow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface PopoverTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否禁用触发器 */
  disabled?: boolean;
  children: React.ReactNode;
}

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface PopoverHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface PopoverBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface PopoverFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface PopoverItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  /** 左侧图标 */
  icon?: React.ReactNode;
  /** 右侧内容（如开关、快捷键文本等） */
  rightContent?: React.ReactNode;
  /** 是否显示选中勾选图标（选中态显示 √，未选中保留等宽占位） */
  checked?: boolean;
  /** 是否禁用该项 */
  disabled?: boolean;
  /** 点击回调（禁用时不触发） */
  onClick?: () => void;
  children: React.ReactNode;
}

export interface PopoverSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface PopoverGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 分组标题文案 */
  label?: string;
  children: React.ReactNode;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

// —— 内部 Context ——
const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopoverContext(): PopoverContextValue {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) throw new Error("usePopoverContext must be used within <Popover>");
  return ctx;
}

// —— 面板定位工具函数 ——
function getContentPlacementClasses(placement: PopoverPlacement): string {
  // margin = 箭头高度(8px) + 期望间距(8px) = 16px
  // 这样箭头尖端与触发元素之间保持 8px 间距
  switch (placement) {
    case "topLeft":     return "bottom-full mb-[16px] left-0";
    case "top":         return "bottom-full mb-[16px] left-1/2 -translate-x-1/2";
    case "topRight":    return "bottom-full mb-[16px] right-0";
    case "rightTop":    return "left-full ml-[16px] top-0";
    case "right":       return "left-full ml-[16px] top-1/2 -translate-y-1/2";
    case "rightBottom": return "left-full ml-[16px] bottom-0";
    case "bottomRight": return "top-full mt-[16px] right-0";
    case "bottom":      return "top-full mt-[16px] left-1/2 -translate-x-1/2";
    case "bottomLeft":  return "top-full mt-[16px] left-0";
    case "leftBottom":  return "right-full mr-[16px] bottom-0";
    case "left":        return "right-full mr-[16px] top-1/2 -translate-y-1/2";
    case "leftTop":     return "right-full mr-[16px] top-0";
  }
}

// —— 箭头渲染 ——
// 采用 SVG 路径 + 圆滑贝塞尔曲线实现箭头，
// 箭头与面板连接处使用 cubic-bezier 平滑过渡（concave curve），
// 完美复刻 Figma 设计稿中弹出框尖角与主体的圆角衔接。
//
// 箭头尺寸：水平方向 20×8，垂直方向 8×20。
// 浅色主题下，仅箭头外边缘（斜边+弧线）绘制描边，
// 与面板衔接的平边不绘制描边，避免出现双重边框。
//
// SVG 路径说明（以向下箭头为例）：
//   M 0,0         — 起点（左侧与面板底边齐平）
//   C 2,0 4,2 6,4 — 左侧 concave 弧线：水平出发，G1 连续抵达肩部
//                   CP2=(4,2) 使切线方向 (2,2) = 肩部→尖端方向 (4,4) ✓
//   L 10,8        — 斜线到箭头尖端
//   L 14,4        — 尖端→右侧斜线
//   C 16,2 18,0 20,0 — 右侧 concave 弧线：G1 连续离开肩部，水平收尾
//   Z             — 闭合

/** 箭头 SVG 尺寸常量 */
const ARROW_W = 20;  // 水平箭头宽度 / 垂直箭头高度
const ARROW_H = 8;   // 水平箭头高度 / 垂直箭头宽度
const ARROW_OFFSET = 8; // 箭头外伸量，使平边与面板边缘完全贴合（= ARROW_H）

/** 四方向 SVG 闭合路径（fill 用）
 *
 * 控制点选取原则（G1 连续）：
 *   CP2 使贝塞尔曲线在肩部的切线方向等于肩部→尖端直线的方向（45°），
 *   消除折角，实现圆弧与直线的平滑衔接。
 *
 * 尖端圆角：1px（使用 Q 命令在尖端创建 quadratic 贝塞尔曲线）
 *   在45度斜边上，1px偏移量 ≈ 0.7px (1/√2)
 *   尖端前后各偏移约0.7px开始曲线，控制点为原尖端位置
 *
 * 以 down 为例（viewBox 0 0 20 8）：
 *   肩部 (6,4) → 尖端 (10,8)，斜率 = (8-4)/(10-6) = 1 → CP2 = (4,2)
 *   切线向量 = (6,4)-(4,2) = (2,2) ✓ 与直线方向一致
 *   尖端圆角：L 9.3,7.3 Q 10,8 10.7,7.3
 */
const ARROW_PATHS = {
  down: "M 0,0 C 2,0 4,2 6,4 L 9.3,7.3 Q 10,8 10.7,7.3 L 14,4 C 16,2 18,0 20,0 Z",
  up:   "M 0,8 C 2,8 4,6 6,4 L 9.3,0.7 Q 10,0 10.7,0.7 L 14,4 C 16,6 18,8 20,8 Z",
  left: "M 8,0 C 8,2 6,4 4,6 L 0.7,9.3 Q 0,10 0.7,10.7 L 4,14 C 6,16 8,18 8,20 Z",
  right:"M 0,0 C 0,2 2,4 4,6 L 7.3,9.3 Q 8,10 7.3,10.7 L 4,14 C 2,16 0,18 0,20 Z",
};


function ArrowElement({
  placement,
  theme,
}: {
  placement: PopoverPlacement;
  theme: PopoverTheme;
}) {
  const fillColor =
    theme === "dark" ? "var(--color-gray-9)" : "var(--bg-primary)";

  // ── bottom* : arrow at top of panel, tip points UP ──
  if (placement.startsWith("bottom")) {
    const left =
      placement === "bottomLeft"
        ? 8
        : placement === "bottomRight"
        ? undefined
        : undefined;
    const right = placement === "bottomRight" ? 8 : undefined;
    const centerX =
      placement === "bottom" ? `calc(50% - ${ARROW_W / 2}px)` : undefined;

    return (
      <div
        style={{
          position: "absolute",
          top: -ARROW_OFFSET,
          left: centerX ?? (right !== undefined ? undefined : left),
          right,
          width: ARROW_W,
          height: ARROW_H,
        }}
      >
        <svg
          width={ARROW_W}
          height={ARROW_H}
          viewBox={`0 0 ${ARROW_W} ${ARROW_H}`}
          style={{ display: "block" }}
        >
          <path d={ARROW_PATHS.up} fill={fillColor} />
        </svg>
      </div>
    );
  }

  // ── top* : arrow at bottom of panel, tip points DOWN ──
  if (placement.startsWith("top")) {
    const left = placement === "topLeft" ? 8 : undefined;
    const right = placement === "topRight" ? 8 : undefined;
    const centerX =
      placement === "top" ? `calc(50% - ${ARROW_W / 2}px)` : undefined;

    return (
      <div
        style={{
          position: "absolute",
          bottom: -ARROW_OFFSET,
          left: centerX ?? (right !== undefined ? undefined : left),
          right,
          width: ARROW_W,
          height: ARROW_H,
        }}
      >
        <svg
          width={ARROW_W}
          height={ARROW_H}
          viewBox={`0 0 ${ARROW_W} ${ARROW_H}`}
          style={{ display: "block" }}
        >
          <path d={ARROW_PATHS.down} fill={fillColor} />
        </svg>
      </div>
    );
  }

  // ── right* : arrow at left of panel, tip points LEFT ──
  if (placement.startsWith("right")) {
    const top = placement === "rightTop" ? 4 : undefined;
    const bottom = placement === "rightBottom" ? 4 : undefined;
    const centerY =
      placement === "right" ? `calc(50% - ${ARROW_W / 2}px)` : undefined;

    return (
      <div
        style={{
          position: "absolute",
          left: -ARROW_OFFSET,
          top: centerY ?? (bottom !== undefined ? undefined : top),
          bottom,
          width: ARROW_H,
          height: ARROW_W,
        }}
      >
        <svg
          width={ARROW_H}
          height={ARROW_W}
          viewBox={`0 0 ${ARROW_H} ${ARROW_W}`}
          style={{ display: "block" }}
        >
          <path d={ARROW_PATHS.left} fill={fillColor} />
        </svg>
      </div>
    );
  }

  // ── left* : arrow at right of panel, tip points RIGHT ──
  const top = placement === "leftTop" ? 4 : undefined;
  const bottom = placement === "leftBottom" ? 4 : undefined;
  const centerY =
    placement === "left" ? `calc(50% - ${ARROW_W / 2}px)` : undefined;

  return (
    <div
      style={{
        position: "absolute",
        right: -ARROW_OFFSET,
        top: centerY ?? (bottom !== undefined ? undefined : top),
        bottom,
        width: ARROW_H,
        height: ARROW_W,
      }}
    >
      <svg
        width={ARROW_H}
        height={ARROW_W}
        viewBox={`0 0 ${ARROW_H} ${ARROW_W}`}
        style={{ display: "block" }}
      >
        <path d={ARROW_PATHS.right} fill={fillColor} />
      </svg>
    </div>
  );
}

/**
 * Popover 根组件，管理展开状态、触发方式和弹出方向。
 * 包裹 PopoverTrigger 和 PopoverContent。
 */
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      placement = "top",
      trigger = "click",
      theme = "dark",
      showArrow = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = openProp !== undefined;
    const [localOpen, setLocalOpen] = React.useState(defaultOpen);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

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
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
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
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    return (
      <PopoverContext.Provider
        value={{
          open,
          setOpen,
          triggerMode: trigger,
          placement,
          theme,
          showArrow,
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
      </PopoverContext.Provider>
    );
  }
);
Popover.displayName = "Popover";

/**
 * 触发器，包裹任意触发元素并绑定交互事件。
 * click 模式：点击切换展开/收起。
 * hover 模式：鼠标进入时展开，离开后延迟 150ms 收起。
 * focus 模式：聚焦时展开，失焦时收起。
 */
export const PopoverTrigger = React.forwardRef<
  HTMLDivElement,
  PopoverTriggerProps
>(({ children, disabled = false, className, ...props }, ref) => {
  const {
    open,
    setOpen,
    triggerMode,
    startCloseTimer,
    cancelCloseTimer,
  } = usePopoverContext();

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

  const handleFocus = () => {
    if (disabled) return;
    setOpen(true);
  };

  const handleBlur = () => {
    if (triggerMode === "focus") setOpen(false);
  };

  return (
    <div
      ref={ref}
      className={cn("inline-flex", className)}
      onClick={triggerMode === "click" ? handleClick : undefined}
      onMouseEnter={triggerMode === "hover" ? handleMouseEnter : undefined}
      onMouseLeave={triggerMode === "hover" ? handleMouseLeave : undefined}
      onFocus={triggerMode === "focus" ? handleFocus : undefined}
      onBlur={triggerMode === "focus" ? handleBlur : undefined}
      aria-expanded={open}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {children}
    </div>
  );
});
PopoverTrigger.displayName = "PopoverTrigger";

/**
 * Popover 面板容器。面板不展开时返回 null。
 * hover 模式下，鼠标移入面板时取消延迟关闭。
 * 内部不设默认内边距，由 PopoverBody / PopoverHeader / PopoverFooter 或自定义 children 管理。
 */
export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(({ children, className, ...props }, ref) => {
  const {
    open,
    placement,
    theme,
    showArrow,
    triggerMode,
    startCloseTimer,
    cancelCloseTimer,
  } = usePopoverContext();

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="tooltip"
      className={cn(
        popoverContentVariants({ theme }),
        getContentPlacementClasses(placement),
        className
      )}
      onMouseEnter={triggerMode === "hover" ? cancelCloseTimer : undefined}
      onMouseLeave={triggerMode === "hover" ? startCloseTimer : undefined}
      {...props}
    >
      {showArrow && <ArrowElement placement={placement} theme={theme} />}
      {children}
    </div>
  );
});
PopoverContent.displayName = "PopoverContent";

/**
 * Popover 头部区域，提供标准上内边距和水平内边距。
 * 适用于标题、副标题等内容。
 */
export const PopoverHeader = React.forwardRef<
  HTMLDivElement,
  PopoverHeaderProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "px-[var(--space-group)] pt-[var(--space-content)] pb-[var(--space-tight)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
PopoverHeader.displayName = "PopoverHeader";

/**
 * Popover 正文区域，提供标准内边距。
 * 适用于富文本、描述等内容。
 */
export const PopoverBody = React.forwardRef<HTMLDivElement, PopoverBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-[var(--space-group)] py-[var(--space-content)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PopoverBody.displayName = "PopoverBody";

/**
 * Popover 底部操作区，右对齐排列操作按钮。
 */
export const PopoverFooter = React.forwardRef<
  HTMLDivElement,
  PopoverFooterProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end gap-[var(--space-tight)]",
        "px-[var(--space-group)] pt-[var(--space-tight)] pb-[var(--space-group)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
PopoverFooter.displayName = "PopoverFooter";

/**
 * Popover 菜单条目。
 * 支持左侧图标、右侧内容（如 Switch）、选中态勾选图标。
 * 主题样式继承自 Popover 根组件。
 */
export const PopoverItem = React.forwardRef<HTMLDivElement, PopoverItemProps>(
  (
    {
      children,
      icon,
      rightContent,
      checked,
      disabled = false,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const { theme } = usePopoverContext();

    const handleClick = () => {
      if (disabled) return;
      onClick?.();
    };

    const hasCheckArea = checked !== undefined;

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        className={cn(
          popoverItemVariants({ theme, disabled: disabled ? "yes" : "no" }),
          "gap-[var(--space-tight)]",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {/* 选中区域（固定宽度占位，保证选中与未选中项对齐）*/}
        {hasCheckArea && (
          <span className="flex-shrink-0 w-[12px] flex items-center justify-center">
            {checked && (
              <Check
                size={12}
                className={
                  theme === "dark"
                    ? "text-[var(--color-gray-1)]"
                    : "text-[var(--text-heading)]"
                }
              />
            )}
          </span>
        )}

        {/* 左侧图标 */}
        {icon && (
          <span className="flex-shrink-0 flex items-center">{icon}</span>
        )}

        {/* 文字内容 */}
        <span className="flex-1 min-w-0 truncate">{children}</span>

        {/* 右侧内容（开关、快捷键等）*/}
        {rightContent && (
          <span className="flex-shrink-0 ml-auto">{rightContent}</span>
        )}
      </div>
    );
  }
);
PopoverItem.displayName = "PopoverItem";

/**
 * 分割线。深色主题使用半透明白色，浅色主题使用 --border-color。
 */
export const PopoverSeparator = React.forwardRef<
  HTMLDivElement,
  PopoverSeparatorProps
>(({ className, ...props }, ref) => {
  const { theme } = usePopoverContext();

  return (
    <div
      ref={ref}
      role="separator"
      className={cn(
        "mx-[var(--space-group)] my-[var(--space-intimate)] h-px",
        theme === "light" ? "bg-[var(--border-color)]" : "",
        className
      )}
      style={
        theme === "dark" ? { backgroundColor: "rgba(255,255,255,0.1)" } : undefined
      }
      {...props}
    />
  );
});
PopoverSeparator.displayName = "PopoverSeparator";

/**
 * 分组容器，可选显示分组标题。
 * 深色主题标题使用 --color-gray-4，浅色使用 --text-help（两者均为 #878D99）。
 */
export const PopoverGroup = React.forwardRef<HTMLDivElement, PopoverGroupProps>(
  ({ label, children, className, ...props }, ref) => {
    const { theme } = usePopoverContext();

    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {label && (
          <div
            className={cn(
              "flex items-center h-[30px] px-[var(--space-group)]",
              "text-[11px] leading-normal font-['PingFang_SC',sans-serif] font-medium",
              theme === "dark"
                ? "text-[var(--color-gray-4)]"
                : "text-[var(--text-help)]"
            )}
          >
            {label}
          </div>
        )}
        {children}
      </div>
    );
  }
);
PopoverGroup.displayName = "PopoverGroup";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { popoverContentVariants, popoverItemVariants };
