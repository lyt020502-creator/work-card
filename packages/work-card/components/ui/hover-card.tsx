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
// HoverCard 悬浮卡片组件
//
// 鼠标悬停在触发元素上时，弹出一个信息卡片浮层。
// 与 Popover 的区别：HoverCard 仅由 hover 触发，语义上用于预览/补充信息。
//
// 关键语义变量速查（theme.css :root）：
//   背景色      --bg-primary (#FFFFFF)
//   文本色      --text-heading (#11141A)
//   边框色      --border-color (#DCDFE5)
//   圆角        --corner-md (8px)
//   阴影        --shadow-md
//   间距        --space-content (12px) / --space-group (16px)
// ────────────────────────────────────────────────────────────

const hoverCardContentVariants = cva(
  [
    "absolute z-50",
    "rounded-[var(--corner-md)]",
    "bg-[var(--bg-primary)]",
    "text-[var(--text-heading)]",
    "border border-[var(--border-color)]",
    "shadow-[var(--shadow-md)]",
    "font-['PingFang_SC',sans-serif]",
    "outline-none",
  ],
  {
    variants: {
      /**
       * size — 卡片宽度
       * sm: 240px | md: 320px（默认）| lg: 400px
       */
      size: {
        sm: "w-[240px]",
        md: "w-[320px]",
        lg: "w-[400px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

/** 弹出方向 */
export type HoverCardPlacement = "top" | "bottom" | "left" | "right";

/** 内部 Context 值 */
interface HoverCardContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  placement: HoverCardPlacement;
  startCloseTimer: () => void;
  cancelCloseTimer: () => void;
}

export interface HoverCardProps {
  /** 受控展开状态 */
  open?: boolean;
  /** 非受控默认展开状态 */
  defaultOpen?: boolean;
  /** 展开状态变更回调 */
  onOpenChange?: (open: boolean) => void;
  /** 弹出方向，默认 bottom */
  placement?: HoverCardPlacement;
  /** 打开延迟（ms），默认 200 */
  openDelay?: number;
  /** 关闭延迟（ms），默认 300 */
  closeDelay?: number;
  children: React.ReactNode;
  className?: string;
}

export interface HoverCardTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface HoverCardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hoverCardContentVariants> {
  children: React.ReactNode;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null);

function useHoverCardContext(): HoverCardContextValue {
  const ctx = React.useContext(HoverCardContext);
  if (!ctx) throw new Error("useHoverCardContext must be used within <HoverCard>");
  return ctx;
}

/** 根据 placement 返回面板定位类名 */
function getPlacementClasses(placement: HoverCardPlacement): string {
  switch (placement) {
    case "top":
      return "bottom-full mb-2 left-1/2 -translate-x-1/2";
    case "bottom":
      return "top-full mt-2 left-1/2 -translate-x-1/2";
    case "left":
      return "right-full mr-2 top-1/2 -translate-y-1/2";
    case "right":
      return "left-full ml-2 top-1/2 -translate-y-1/2";
  }
}

/**
 * HoverCard — 悬浮卡片根容器
 * 管理 hover 触发的展开/收起状态，支持可配置的打开/关闭延迟。
 */
export const HoverCard = React.forwardRef<HTMLDivElement, HoverCardProps>(
  (
    {
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      placement = "bottom",
      openDelay = 200,
      closeDelay = 300,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = openProp !== undefined;
    const [localOpen, setLocalOpen] = React.useState(defaultOpen);
    const openTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const open = isControlled ? openProp! : localOpen;

    const setOpen = React.useCallback(
      (next: boolean) => {
        if (!isControlled) setLocalOpen(next);
        onOpenChange?.(next);
      },
      [isControlled, onOpenChange]
    );

    const startCloseTimer = React.useCallback(() => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => setOpen(false), closeDelay);
    }, [closeDelay, setOpen]);

    const cancelCloseTimer = React.useCallback(() => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }, []);

    const startOpenTimer = React.useCallback(() => {
      cancelCloseTimer();
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      openTimerRef.current = setTimeout(() => setOpen(true), openDelay);
    }, [openDelay, setOpen, cancelCloseTimer]);

    const cancelOpenTimer = React.useCallback(() => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }
    }, []);

    // 清理定时器
    React.useEffect(() => {
      return () => {
        if (openTimerRef.current) clearTimeout(openTimerRef.current);
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      };
    }, []);

    const handleMouseEnter = () => {
      startOpenTimer();
    };

    const handleMouseLeave = () => {
      cancelOpenTimer();
      startCloseTimer();
    };

    return (
      <HoverCardContext.Provider
        value={{ open, setOpen, placement, startCloseTimer, cancelCloseTimer }}
      >
        <div
          ref={ref}
          className={cn("relative inline-flex", className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      </HoverCardContext.Provider>
    );
  }
);

HoverCard.displayName = "HoverCard";

/**
 * HoverCardTrigger — 悬浮卡片触发区域
 * 包裹任意子元素作为 hover 的锚点。
 */
export const HoverCardTrigger = React.forwardRef<
  HTMLDivElement,
  HoverCardTriggerProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("inline-flex", className)}
      {...props}
    >
      {children}
    </div>
  );
});

HoverCardTrigger.displayName = "HoverCardTrigger";

/**
 * HoverCardContent — 悬浮卡片内容面板
 * 展开时显示，根据 placement 自动定位。
 * 鼠标移入面板时保持打开，移出后延迟关闭。
 */
export const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(({ children, className, size, ...props }, ref) => {
  const { open, placement, startCloseTimer, cancelCloseTimer } =
    useHoverCardContext();

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        hoverCardContentVariants({ size }),
        getPlacementClasses(placement),
        className
      )}
      onMouseEnter={cancelCloseTimer}
      onMouseLeave={startCloseTimer}
      {...props}
    >
      {children}
    </div>
  );
});

HoverCardContent.displayName = "HoverCardContent";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { hoverCardContentVariants };
