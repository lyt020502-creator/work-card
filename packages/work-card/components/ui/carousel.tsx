// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { 箭头单箭头左, 箭头单箭头右 } from "../icons";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// Carousel 轮播图组件
//
// 水平滑动的内容轮播容器，支持前进/后退按钮和指示器。
// 结构：Carousel → CarouselContent → CarouselItem*
//       + CarouselPrevious / CarouselNext（可选）
//       + CarouselIndicator（可选）
//
// 关键语义变量速查（theme.css :root）：
//   背景色        --bg-primary (#FFFFFF)
//   按钮背景      --bg-primary (#FFFFFF) + 阴影
//   按钮悬停      --bg-secondary (#F2F4F7)
//   按钮按下      --bg-secondary-active (#E8E9EB)
//   文本色        --text-heading (#11141A) / --text-secondary (#5C6473)
//   品牌色        --brand-base (#3377FF)
//   边框色        --border-color (#DCDFE5)
//   禁用色        --text-disabled (#C7CDD9)
//   圆角          --corner-md (8px) / --corner-pill (9999px)
//   阴影          --shadow-sm
//   间距          --space-tight (8px) / --space-content (12px)
// ────────────────────────────────────────────────────────────

const carouselVariants = cva(
  [
    "relative w-full",
    "font-['PingFang_SC',sans-serif]",
  ],
  {
    variants: {
      /**
       * variant — 轮播外观
       * default: 标准样式（默认）
       * bordered: 带边框和圆角
       */
      variant: {
        default: [
          "hover:opacity-100",
          "active:opacity-100",
        ],
        bordered: [
          "border border-[var(--border-color)]",
          "rounded-[var(--corner-md)]",
          "overflow-hidden",
          "hover:border-[var(--border-color)]",
          "active:border-[var(--border-color)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/** 前后导航按钮样式 */
const carouselButtonVariants = cva(
  [
    "absolute z-10",
    "flex items-center justify-center",
    "bg-[var(--bg-primary)]",
    "border border-[var(--border-color)]",
    "rounded-[var(--corner-pill)]",
    "shadow-[var(--shadow-sm)]",
    "text-[var(--text-heading)]",
    "cursor-pointer select-none",
    "transition-colors duration-150",
    "hover:bg-[var(--bg-secondary)]",
    "active:bg-[var(--bg-secondary-active)]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--bg-primary)]",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-[var(--brand-base)] focus-visible:ring-offset-1",
  ],
  {
    variants: {
      /**
       * size — 按钮尺寸
       * sm: 24×24
       * md: 32×32（默认）
       * lg: 40×40
       */
      size: {
        sm: "w-[var(--comp-height-md)] h-[var(--comp-height-md)]",
        md: "w-[var(--comp-height-lg)] h-[var(--comp-height-lg)]",
        lg: "w-[40px] h-[40px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

/** Carousel Context */
interface CarouselContextValue {
  currentIndex: number;
  totalSlides: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  goTo: (index: number) => void;
  goPrev: () => void;
  goNext: () => void;
  loop: boolean;
}

export interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselVariants> {
  /** 受控当前幻灯片索引 */
  index?: number;
  /** 非受控默认幻灯片索引 */
  defaultIndex?: number;
  /** 索引变更回调 */
  onIndexChange?: (index: number) => void;
  /** 是否循环播放，默认 false */
  loop?: boolean;
  /** 是否自动播放，默认 false */
  autoPlay?: boolean;
  /** 自动播放间隔（ms），默认 5000 */
  autoPlayInterval?: number;
}

export interface CarouselContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface CarouselItemProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface CarouselPreviousProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof carouselButtonVariants> {}

export interface CarouselNextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof carouselButtonVariants> {}

export interface CarouselIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

// ── Part 5: 组件实现 ─────────────────────────────────────────

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarouselContext(): CarouselContextValue {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("useCarouselContext must be used within <Carousel>");
  return ctx;
}

/**
 * Carousel — 轮播图根容器
 * 管理当前幻灯片索引，支持循环播放和自动播放。
 */
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      variant,
      index: indexProp,
      defaultIndex = 0,
      onIndexChange,
      loop = false,
      autoPlay = false,
      autoPlayInterval = 5000,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = indexProp !== undefined;
    const [localIndex, setLocalIndex] = React.useState(defaultIndex);
    const currentIndex = isControlled ? indexProp : localIndex;

    // 统计子幻灯片数量
    const [totalSlides, setTotalSlides] = React.useState(0);
    const contentRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (contentRef.current) {
        setTotalSlides(contentRef.current.children.length);
      }
    });

    const goTo = React.useCallback(
      (idx: number) => {
        let next = idx;
        if (loop && totalSlides > 0) {
          next = ((idx % totalSlides) + totalSlides) % totalSlides;
        } else {
          next = Math.max(0, Math.min(idx, totalSlides - 1));
        }
        if (!isControlled) setLocalIndex(next);
        onIndexChange?.(next);
      },
      [isControlled, loop, totalSlides, onIndexChange]
    );

    const goPrev = React.useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);
    const goNext = React.useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);

    const canGoPrev = loop || currentIndex > 0;
    const canGoNext = loop || currentIndex < totalSlides - 1;

    // 自动播放
    React.useEffect(() => {
      if (!autoPlay || totalSlides <= 1) return;
      const timer = setInterval(() => {
        goTo(currentIndex + 1);
      }, autoPlayInterval);
      return () => clearInterval(timer);
    }, [autoPlay, autoPlayInterval, currentIndex, totalSlides, goTo]);

    // 键盘导航
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    // 暴露 contentRef 以便 CarouselContent 注册
    const ctxValue: CarouselContextValue = {
      currentIndex,
      totalSlides,
      canGoPrev,
      canGoNext,
      goTo,
      goPrev,
      goNext,
      loop,
    };

    // 将 children 分为"内容区"（Content + 前后按钮）和"外部"（Indicator 等）
    const contentAreaChildren: React.ReactNode[] = [];
    const outerChildren: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) {
        outerChildren.push(child);
        return;
      }
      const displayName = (child.type as { displayName?: string })?.displayName;
      if (
        displayName === "CarouselContent" ||
        displayName === "CarouselPrevious" ||
        displayName === "CarouselNext"
      ) {
        if (displayName === "CarouselContent") {
          contentAreaChildren.push(
            React.cloneElement(
              child as React.ReactElement<{ _contentRef?: React.Ref<HTMLDivElement> }>,
              { _contentRef: contentRef }
            )
          );
        } else {
          contentAreaChildren.push(child);
        }
      } else {
        outerChildren.push(child);
      }
    });

    return (
      <CarouselContext.Provider value={ctxValue}>
        <div
          ref={(node) => {
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          role="region"
          aria-roledescription="carousel"
          tabIndex={0}
          className={cn(carouselVariants({ variant, className }))}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {/* 内容区：Content + 前后按钮，按钮相对此区域垂直居中 */}
          <div className="relative">
            {contentAreaChildren}
          </div>
          {outerChildren}
        </div>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = "Carousel";

/**
 * CarouselContent — 幻灯片滑动容器
 * 使用 CSS transform 实现水平滑动。
 */
export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  CarouselContentProps & { _contentRef?: React.RefObject<HTMLDivElement | null> }
>(({ className, _contentRef, children, ...props }, ref) => {
  const { currentIndex } = useCarouselContext();

  const mergeRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (_contentRef) (_contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref, _contentRef]
  );

  return (
    <div className="overflow-hidden">
      <div
        ref={mergeRef}
        className={cn(
          "flex transition-transform duration-300 ease-in-out",
          className
        )}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});

CarouselContent.displayName = "CarouselContent";

/**
 * CarouselItem — 单个幻灯片
 * 默认宽度 100%，不可缩小。
 */
export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CarouselItem.displayName = "CarouselItem";

/**
 * CarouselPrevious — 前一张按钮
 * 默认定位在左侧垂直居中。
 */
export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselPreviousProps
>(({ className, size, ...props }, ref) => {
  const { goPrev, canGoPrev } = useCarouselContext();

  return (
    <button
      ref={ref}
      type="button"
      aria-label="上一张"
      disabled={!canGoPrev}
      className={cn(
        carouselButtonVariants({ size }),
        "left-[var(--space-content)] top-1/2 -translate-y-1/2",
        className
      )}
      onClick={goPrev}
      {...props}
    >
      <箭头单箭头左 size={16} />
    </button>
  );
});

CarouselPrevious.displayName = "CarouselPrevious";

/**
 * CarouselNext — 下一张按钮
 * 默认定位在右侧垂直居中。
 */
export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  CarouselNextProps
>(({ className, size, ...props }, ref) => {
  const { goNext, canGoNext } = useCarouselContext();

  return (
    <button
      ref={ref}
      type="button"
      aria-label="下一张"
      disabled={!canGoNext}
      className={cn(
        carouselButtonVariants({ size }),
        "right-[var(--space-content)] top-1/2 -translate-y-1/2",
        className
      )}
      onClick={goNext}
      {...props}
    >
      <箭头单箭头右 size={16} />
    </button>
  );
});

CarouselNext.displayName = "CarouselNext";

/**
 * CarouselIndicator — 底部圆点指示器
 * 当前幻灯片对应圆点高亮为品牌色。
 */
export const CarouselIndicator = React.forwardRef<
  HTMLDivElement,
  CarouselIndicatorProps
>(({ className, ...props }, ref) => {
  const { currentIndex, totalSlides, goTo } = useCarouselContext();

  if (totalSlides <= 1) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-[var(--space-tight)]",
        "py-[var(--space-content)]",
        className
      )}
      {...props}
    >
      {Array.from({ length: totalSlides }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`跳转到第 ${i + 1} 张`}
          className={cn(
            "w-2 h-2 rounded-full",
            "transition-colors duration-150",
            "cursor-pointer",
            i === currentIndex
              ? "bg-[var(--brand-base)]"
              : "bg-[var(--color-gray-2)] hover:bg-[var(--color-gray-3)] active:bg-[var(--color-gray-4)]"
          )}
          onClick={() => goTo(i)}
        />
      ))}
    </div>
  );
});

CarouselIndicator.displayName = "CarouselIndicator";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { carouselVariants, carouselButtonVariants };
