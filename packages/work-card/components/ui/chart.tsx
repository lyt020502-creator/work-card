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
// Chart 图表容器组件（复合组件）
//
// 提供标准化的图表布局外壳：ChartContainer → (ChartHeader + ChartBody + ChartFooter)
// 内部承载第三方图表库（recharts / echarts）的渲染内容，
// 本组件不包含图表渲染逻辑，仅提供布局、标题、图例、加载态等通用功能。
//
// 关键语义变量速查（theme.css :root）：
//   背景色        --bg-primary (#FFFFFF)
//   辅助背景      --bg-quaternary (#F7F8FA)
//   文本色        --text-heading (#11141A) / --text-secondary (#5C6473)
//   帮助文本      --text-help (#878D99)
//   品牌色板（用于图表默认色系）：
//     --color-brandblue-5 (#3377FF)、--color-skyblue-5 (#26B7FF)
//     --color-green-5 (#1BB23E)、--color-orange-5 (#FF7733)
//     --color-violet-5 (#4050FF)、--color-magenta-5 (#FF4070)
//     --color-cyan-5 (#0AB6D9)、--color-apricot-5 (#FFBF00)
//   边框色        --border-color (#DCDFE5)
//   圆角          --corner-md (8px)
//   阴影          --shadow-sm
//   间距          --space-tight (8px) / --space-content (12px) / --space-group (16px) / --space-section (20px)
//   标题字号      --font-body-md-size (14px) / --font-body-md-height (21px)
//   描述字号      --font-caption-size (12px) / --font-caption-height (18px)
// ────────────────────────────────────────────────────────────

/** 图表容器外壳样式 */
const chartContainerVariants = cva(
  [
    "flex flex-col",
    "font-['PingFang_SC',sans-serif]",
    "overflow-hidden",
  ],
  {
    variants: {
      /**
       * variant — 容器外观
       * default: 无边框，嵌入页面流（默认）
       * outlined: 带边框和圆角的独立卡片
       * elevated: 浮起卡片，带阴影
       */
      variant: {
        default: [
          "bg-[var(--bg-primary)]",
          "hover:bg-[var(--bg-primary)]",
          "active:bg-[var(--bg-primary)]",
        ],
        outlined: [
          "bg-[var(--bg-primary)]",
          "border border-[var(--border-color)]",
          "rounded-[var(--corner-md)]",
          "hover:border-[var(--border-color)]",
          "active:border-[var(--border-color)]",
        ],
        elevated: [
          "bg-[var(--bg-primary)]",
          "rounded-[var(--corner-md)]",
          "shadow-[var(--shadow-sm)]",
          "hover:shadow-[var(--shadow-sm)]",
          "active:shadow-[var(--shadow-sm)]",
        ],
      },
      /**
       * size — 内边距档位
       * sm: 紧凑 12px
       * md: 标准 16px（默认）
       * lg: 宽松 20px
       */
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

/** ChartContainer Context */
interface ChartContextValue {
  size: "sm" | "md" | "lg";
}

export interface ChartContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chartContainerVariants> {
  /** 图表渲染区最小高度，默认 '200px' */
  minHeight?: string;
}

export interface ChartHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ChartTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface ChartDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface ChartBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 内容区域最小高度，覆盖 ChartContainer 的 minHeight */
  minHeight?: string;
}

export interface ChartFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ChartLegendItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 图例色块颜色（CSS 颜色值或 CSS 变量） */
  color: string;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/** 内边距映射 */
const paddingMap = {
  sm: "var(--space-content)",  // 12px
  md: "var(--space-group)",    // 16px
  lg: "var(--space-section)",  // 20px
};

const ChartContext = React.createContext<ChartContextValue>({ size: "md" });

function useChartContext(): ChartContextValue {
  return React.useContext(ChartContext);
}

/**
 * ChartContainer — 图表根容器
 * 提供统一的卡片布局，承载 ChartHeader / ChartBody / ChartFooter。
 */
export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, variant, size = "md", minHeight = "200px", children, style, ...props }, ref) => {
    return (
      <ChartContext.Provider value={{ size: size ?? "md" }}>
        <div
          ref={ref}
          className={cn(chartContainerVariants({ variant, size, className }))}
          style={{ minHeight, ...style }}
          {...props}
        >
          {children}
        </div>
      </ChartContext.Provider>
    );
  }
);

ChartContainer.displayName = "ChartContainer";

/**
 * ChartHeader — 图表头部区域
 * 包含标题、描述和可选的操作区域。
 */
export const ChartHeader = React.forwardRef<HTMLDivElement, ChartHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useChartContext();
    const p = paddingMap[size];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-[var(--space-intimate)]",
          className
        )}
        style={{ padding: p, paddingBottom: 0 }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ChartHeader.displayName = "ChartHeader";

/**
 * ChartTitle — 图表标题
 */
export const ChartTitle = React.forwardRef<HTMLHeadingElement, ChartTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          "my-0",
          "text-[length:var(--font-body-md-size)] leading-[var(--font-body-md-height)]",
          "font-medium text-[var(--text-heading)]",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

ChartTitle.displayName = "ChartTitle";

/**
 * ChartDescription — 图表描述/副标题
 */
export const ChartDescription = React.forwardRef<
  HTMLParagraphElement,
  ChartDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "my-0",
        "text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)]",
        "text-[var(--text-help)]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

ChartDescription.displayName = "ChartDescription";

/**
 * ChartBody — 图表渲染区域
 * flex-1 自适应高度，内部放置 recharts / echarts 等图表库的渲染组件。
 */
export const ChartBody = React.forwardRef<HTMLDivElement, ChartBodyProps>(
  ({ className, minHeight, children, style, ...props }, ref) => {
    const { size } = useChartContext();
    const p = paddingMap[size];

    return (
      <div
        ref={ref}
        className={cn("flex-1 w-full", className)}
        style={{ padding: p, minHeight, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ChartBody.displayName = "ChartBody";

/**
 * ChartFooter — 图表底栏
 * 适合放置图例、数据来源说明等。
 */
export const ChartFooter = React.forwardRef<HTMLDivElement, ChartFooterProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useChartContext();
    const p = paddingMap[size];

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-[var(--space-content)]",
          className
        )}
        style={{ padding: p, paddingTop: 0 }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ChartFooter.displayName = "ChartFooter";

/**
 * ChartLegend — 图例容器
 * 水平排列多个 ChartLegendItem。
 */
export const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-[var(--space-group)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ChartLegend.displayName = "ChartLegend";

/**
 * ChartLegendItem — 单个图例项
 * 色块 + 文字标签。
 */
export const ChartLegendItem = React.forwardRef<HTMLDivElement, ChartLegendItemProps>(
  ({ className, color, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-[var(--space-intimate)]",
          "text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)]",
          "text-[var(--text-secondary)]",
          className
        )}
        {...props}
      >
        <span
          className="inline-block w-2 h-2 rounded-[2px] shrink-0"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        {children}
      </div>
    );
  }
);

ChartLegendItem.displayName = "ChartLegendItem";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { chartContainerVariants };
