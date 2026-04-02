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
// Card 卡片组件（复合组件）
//
// 通用内容容器：Card → (CardHeader + CardBody + CardFooter)
// 适用于信息展示、操作面板、仪表盘模块等场景。
//
// 关键语义变量速查（theme.css :root）：
//   背景色        --bg-primary (#FFFFFF) / --bg-secondary (#F2F4F7)
//   文本色        --text-heading (#11141A) / --text-body (#11141A) / --text-secondary (#5C6473)
//   边框色        --border-color (#DCDFE5)
//   分割线        --divider-color (#F4F5F7)
//   圆角          --corner-sm (4px) / --corner-md (8px) / --corner-lg (12px)
//   阴影          --shadow-sm / --shadow-md
//   间距          --space-content (12px) / --space-group (16px) / --space-section (20px)
//   标题字号      --font-body-md-size (14px) / --font-body-md-height (21px)
//   正文字号      --font-label-size (13px) / --font-label-height (20px)
//   描述字号      --font-caption-size (12px) / --font-caption-height (18px)
// ────────────────────────────────────────────────────────────

const cardVariants = cva(
  [
    "flex flex-col",
    "font-['PingFang_SC',sans-serif]",
    "overflow-hidden",
  ],
  {
    variants: {
      /**
       * variant — 卡片外观
       * outlined: 线框卡片，1px 边框（默认）
       * elevated: 浮起卡片，无边框 + 阴影
       * filled: 填充卡片，灰色背景无边框
       */
      variant: {
        outlined: [
          "bg-[var(--bg-primary)]",
          "border border-[var(--border-color)]",
          "hover:border-[var(--border-color)]",
          "active:border-[var(--border-color)]",
        ],
        elevated: [
          "bg-[var(--bg-primary)]",
          "shadow-[var(--shadow-sm)]",
          "hover:shadow-[var(--shadow-md)]",
          "active:shadow-[var(--shadow-sm)]",
        ],
        filled: [
          "bg-[var(--bg-secondary)]",
          "hover:bg-[var(--bg-secondary-hover)]",
          "active:bg-[var(--bg-secondary-active)]",
        ],
      },
      /**
       * size — 卡片内边距档位
       * sm: 紧凑内边距 12px
       * md: 标准内边距 16px（默认）
       * lg: 宽松内边距 20px
       */
      size: {
        sm: "rounded-[var(--corner-sm)]",
        md: "rounded-[var(--corner-md)]",
        lg: "rounded-[var(--corner-lg)]",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "md",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

/** Card Context 值 */
interface CardContextValue {
  size: "sm" | "md" | "lg";
}

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否显示底部分割线，默认 false */
  divider?: boolean;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否显示顶部分割线，默认 false */
  divider?: boolean;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/** 内边距映射表 */
const paddingMap = {
  sm: "var(--space-content)",  // 12px
  md: "var(--space-group)",    // 16px
  lg: "var(--space-section)",  // 20px
};

const CardContext = React.createContext<CardContextValue>({ size: "md" });

function useCardContext(): CardContextValue {
  return React.useContext(CardContext);
}

/**
 * Card — 卡片根容器
 * 通用信息展示容器，支持线框/浮起/填充三种外观。
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size = "md", children, ...props }, ref) => {
    return (
      <CardContext.Provider value={{ size: size ?? "md" }}>
        <div
          ref={ref}
          className={cn(cardVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  }
);

Card.displayName = "Card";

/**
 * CardHeader — 卡片头部区域
 * 包含标题和可选描述文字，可选底部分割线。
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, divider = false, children, ...props }, ref) => {
    const { size } = useCardContext();
    const p = paddingMap[size];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-[var(--space-intimate)]",
          divider && "border-b border-[var(--divider-color)]",
          className
        )}
        style={{ padding: p }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

/**
 * CardTitle — 卡片标题
 * 14px / font-medium / --text-heading
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
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

CardTitle.displayName = "CardTitle";

/**
 * CardDescription — 卡片描述文字
 * 12px / --text-secondary
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "my-0",
        "text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)]",
        "text-[var(--text-secondary)]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

/**
 * CardBody — 卡片主内容区域
 */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useCardContext();
    const p = paddingMap[size];

    return (
      <div
        ref={ref}
        className={cn(
          "flex-1",
          "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
          "text-[var(--text-body)]",
          className
        )}
        style={{ padding: p }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = "CardBody";

/**
 * CardFooter — 卡片底栏
 * 水平排列 / 右对齐，可选顶部分割线。
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, divider = false, children, ...props }, ref) => {
    const { size } = useCardContext();
    const p = paddingMap[size];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row items-center justify-end gap-[var(--space-tight)]",
          divider && "border-t border-[var(--divider-color)]",
          className
        )}
        style={{ padding: p }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { cardVariants };
