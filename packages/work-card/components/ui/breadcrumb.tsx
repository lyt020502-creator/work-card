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
// 颜色引用规则（theme.css :root 语义变量速查）：
//   文字色  --text-secondary (#5C6473) 非当前项默认色
//           --text-heading (#11141A)  当前项（最后一级）色
//           --text-disabled (#C7CDD9) 分隔符色
//   品牌色  --brand-base (#3377FF)    悬浮态
//           --brand-active (#215BD9)  按下态
// ────────────────────────────────────────────────────────────

const breadcrumbVariants = cva(
  [
    "inline-flex items-center flex-wrap",
    "font-['PingFang_SC',sans-serif]",
  ],
  {
    variants: {
      size: {
        /**
         * sm — 字号 12px（--font-size-xs）
         * 对应设计稿小尺寸面包屑
         */
        sm: "text-[length:var(--font-size-xs)]",
        /**
         * md（默认）— 字号 16px（--font-size-xl）
         * 对应设计稿默认尺寸面包屑
         */
        md: "text-[length:var(--font-size-xl)]",
        /**
         * lg — 字号 18px（--font-size-2xl）
         */
        lg: "text-[length:var(--font-size-2xl)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// 非末尾可点击项的样式变体
const breadcrumbItemVariants = cva(
  [
    // 布局（inline-block 是 text-overflow: ellipsis 生效的前提）
    "inline-block align-middle",
    // 过渡
    "transition-colors duration-150",
  ],
  {
    variants: {
      variant: {
        /**
         * default — 可点击的非当前路径项
         * --text-secondary → hover:--brand-base → active:--brand-active
         */
        default: [
          "text-[var(--text-secondary)]",
          "cursor-pointer",
          "hover:text-[var(--brand-base)]",
          "active:text-[var(--brand-active)]",
        ],
        /**
         * current — 当前页面（最后一级，不可点击）
         * --text-heading，字重 medium，无交互
         */
        current: [
          "text-[var(--text-heading)]",
          "font-medium",
          "cursor-default",
          "select-none",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface BreadcrumbItemDef {
  /** 路径显示文字 */
  label: React.ReactNode;
  /** 点击跳转链接；不传则渲染为 span */
  href?: string;
  /** 自定义点击回调（href 存在时可与之共存） */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 最大显示宽度（px），超出时文字省略 */
  maxWidth?: number;
}

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  /** 面包屑路径项数组，最后一项自动视为当前页 */
  items: BreadcrumbItemDef[];
  /** 自定义分隔符，默认为 "/" */
  separator?: React.ReactNode;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      className,
      size = "md",
      items,
      separator = "/",
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn(breadcrumbVariants({ size, className }))}
        {...props}
      >
        <ol className="inline-flex items-center flex-wrap m-0 p-0 list-none">
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={index} className="inline-flex items-center">
                {/* 分隔符（第一项前不显示） */}
                {!isFirst && (
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "mx-2 select-none text-[var(--text-disabled)]",
                      // 分隔符字号比内容略小
                      size === "lg" && "text-[length:var(--font-size-xl)]",
                      size === "md" && "text-[length:var(--font-size-md)]",
                      size === "sm" && "text-[length:var(--font-size-xs)]"
                    )}
                  >
                    {separator}
                  </span>
                )}

                {/* 路径项 */}
                {isCurrent ? (
                  // 当前项：span，不可交互
                  <span
                    aria-current="page"
                    className={cn(breadcrumbItemVariants({ variant: "current" }))}
                    style={
                      item.maxWidth
                        ? {
                            maxWidth: item.maxWidth,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }
                        : undefined
                    }
                  >
                    {item.label}
                  </span>
                ) : (
                  // 非当前项：span，保留交互状态但不跳转
                  <span
                    role={item.href || item.onClick ? "button" : undefined}
                    tabIndex={item.href || item.onClick ? 0 : undefined}
                    onClick={item.onClick}
                    onKeyDown={
                      item.href || item.onClick
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              item.onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
                            }
                          }
                        : undefined
                    }
                    className={cn(
                      breadcrumbItemVariants({
                        variant: item.href || item.onClick ? "default" : "current",
                      })
                    )}
                    style={
                      item.maxWidth
                        ? {
                            maxWidth: item.maxWidth,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }
                        : undefined
                    }
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { breadcrumbVariants, breadcrumbItemVariants };
