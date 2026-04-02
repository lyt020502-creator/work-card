// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GripVertical } from "lucide-react";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// Resizable 可拖拽调整面板大小组件
//
// 组件结构：ResizablePanelGroup > [ResizablePanel, ResizableHandle, ResizablePanel]
//
// 关键语义变量速查（theme.css :root）：
//   边框色        --border-color (#DCDFE5) — 手柄默认色
//   背景色        --bg-primary (#FFFFFF) — 面板背景
//   手柄 hover    --brand-base (#3377FF)
//   手柄 active   --brand-active (#215BD9)
//   分割线色      --divider-color (#F4F5F7)
// ────────────────────────────────────────────────────────────
const resizablePanelGroupVariants = cva(
  [
    "flex w-full h-full overflow-hidden",
  ],
  {
    variants: {
      /**
       * direction — 面板排列方向
       * horizontal: 水平排列，左右拖拽调整宽度（默认）
       * vertical: 垂直排列，上下拖拽调整高度
       */
      direction: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      direction: "horizontal",
    },
  }
);

const resizableHandleVariants = cva(
  [
    "relative flex items-center justify-center",
    "shrink-0",
    "bg-[var(--divider-color)]",
    "transition-colors duration-150",
    "hover:bg-[var(--brand-base)]",
    "active:bg-[var(--brand-active)]",
    "group",
  ],
  {
    variants: {
      direction: {
        horizontal: "w-[1px] cursor-col-resize hover:w-[3px] active:w-[3px]",
        vertical: "h-[1px] cursor-row-resize hover:h-[3px] active:h-[3px]",
      },
    },
    defaultVariants: {
      direction: "horizontal",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

interface ResizableContextValue {
  direction: "horizontal" | "vertical";
}

export interface ResizablePanelGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof resizablePanelGroupVariants> {}

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 默认尺寸百分比（如 50 代表 50%） */
  defaultSize?: number;
  /** 最小尺寸百分比，默认 10 */
  minSize?: number;
  /** 最大尺寸百分比，默认 90 */
  maxSize?: number;
}

export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否显示拖拽图标手柄，默认 false */
  withHandle?: boolean;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

const ResizableContext = React.createContext<ResizableContextValue>({
  direction: "horizontal",
});

/**
 * ResizablePanelGroup — 可调整大小面板组根容器
 * 包裹 ResizablePanel 和 ResizableHandle。
 */
export const ResizablePanelGroup = React.forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  ({ className, direction = "horizontal", children, ...props }, ref) => {
    return (
      <ResizableContext.Provider value={{ direction: direction ?? "horizontal" }}>
        <div
          ref={ref}
          className={cn(resizablePanelGroupVariants({ direction, className }))}
          {...props}
        >
          {children}
        </div>
      </ResizableContext.Provider>
    );
  }
);

ResizablePanelGroup.displayName = "ResizablePanelGroup";

/**
 * ResizablePanel — 单个可调整大小面板
 * 通过 flex-basis 设置默认大小，minSize/maxSize 约束范围。
 */
export const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  (
    {
      className,
      defaultSize = 50,
      minSize = 10,
      maxSize = 90,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const { direction } = React.useContext(ResizableContext);

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-auto",
          className
        )}
        style={{
          flexBasis: `${defaultSize}%`,
          flexGrow: 1,
          flexShrink: 1,
          [direction === "horizontal" ? "minWidth" : "minHeight"]: `${minSize}%`,
          [direction === "horizontal" ? "maxWidth" : "maxHeight"]: `${maxSize}%`,
          ...style,
        }}
        data-panel=""
        data-min-size={minSize}
        data-max-size={maxSize}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ResizablePanel.displayName = "ResizablePanel";

/**
 * ResizableHandle — 拖拽手柄
 * 位于两个 ResizablePanel 之间，拖拽可调整相邻面板的大小。
 * 支持 withHandle 属性显示可视化拖拽图标。
 */
export const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ className, withHandle = false, ...props }, ref) => {
    const { direction } = React.useContext(ResizableContext);
    const handleRef = React.useRef<HTMLDivElement | null>(null);
    const dragging = React.useRef(false);

    const mergeRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        handleRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    React.useEffect(() => {
      const handleEl = handleRef.current;
      if (!handleEl) return;

      const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        dragging.current = true;

        const prevPanel = handleEl.previousElementSibling as HTMLElement | null;
        const nextPanel = handleEl.nextElementSibling as HTMLElement | null;
        if (!prevPanel || !nextPanel) return;

        const parent = handleEl.parentElement!;
        const parentRect = parent.getBoundingClientRect();

        const onMouseMove = (moveEvent: MouseEvent) => {
          if (!dragging.current) return;

          const isHorizontal = direction === "horizontal";
          const totalSize = isHorizontal ? parentRect.width : parentRect.height;
          const mousePos = isHorizontal
            ? moveEvent.clientX - parentRect.left
            : moveEvent.clientY - parentRect.top;

          // 计算手柄之前所有面板（不含当前 prevPanel）占的总空间
          let prevOffset = 0;
          let sibling = prevPanel.previousElementSibling;
          while (sibling) {
            if (sibling instanceof HTMLElement) {
              prevOffset += isHorizontal ? sibling.offsetWidth : sibling.offsetHeight;
              // 加上 handle 宽度
              if (sibling.previousElementSibling instanceof HTMLElement) {
                // 已包含在 offsetWidth 中
              }
            }
            sibling = sibling.previousElementSibling;
          }

          const prevMinSize = parseFloat(prevPanel.dataset.minSize || "10");
          const prevMaxSize = parseFloat(prevPanel.dataset.maxSize || "90");
          const nextMinSize = parseFloat(nextPanel.dataset.minSize || "10");
          const nextMaxSize = parseFloat(nextPanel.dataset.maxSize || "90");

          const handleSize = isHorizontal ? handleEl.offsetWidth : handleEl.offsetHeight;

          const prevSizePx = mousePos - prevOffset;
          const nextSizePx = totalSize - mousePos - handleSize;

          const prevPercent = (prevSizePx / totalSize) * 100;
          const nextPercent = (nextSizePx / totalSize) * 100;

          // 约束范围
          if (
            prevPercent >= prevMinSize &&
            prevPercent <= prevMaxSize &&
            nextPercent >= nextMinSize &&
            nextPercent <= nextMaxSize
          ) {
            prevPanel.style.flexBasis = `${prevPercent}%`;
            nextPanel.style.flexBasis = `${nextPercent}%`;
          }
        };

        const onMouseUp = () => {
          dragging.current = false;
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };

      handleEl.addEventListener("mousedown", onMouseDown);
      return () => handleEl.removeEventListener("mousedown", onMouseDown);
    }, [direction]);

    return (
      <div
        ref={mergeRef}
        className={cn(resizableHandleVariants({ direction }), className)}
        {...props}
      >
        {withHandle && (
          <GripVertical
            size={12}
            className={cn(
              "absolute text-[var(--icon-main)]",
              "group-hover:text-[var(--bg-primary)]",
              direction === "vertical" && "rotate-90"
            )}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

ResizableHandle.displayName = "ResizableHandle";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { resizablePanelGroupVariants, resizableHandleVariants };
