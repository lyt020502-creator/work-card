// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// Figma 设计稿对齐（node-id: 51-4529）：
//   页码项尺寸：32×32px（--comp-height-lg），内边距 4px（--space-intimate）
//   导航箭头：28×28px（h-7/w-7），水平内边距 10px
//   圆角：2px（设计稿实测，无对应 token，直接使用 rounded-[2px]）
//   字号：14px（--font-body-md-size），行高 22px
//   间距：各项间距 8px（--space-tight）
//   激活页背景：rgba(51,119,255,0.12) → 最近语义 token --brand-light-bg (#F2F8FF)
//   激活页文字：rgba(51,119,255,1) → --brand-base
//   普通页文字：rgba(17,20,26,1) → --text-heading
//   省略号图标：12px，颜色 --text-secondary
//
// ────────────────────────────────────────────────────────────
const paginationItemVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-[2px]",
    "font-['PingFang_SC',sans-serif] font-normal",
    "transition-colors duration-150",
    "select-none",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-[var(--brand-base)] focus-visible:ring-offset-1",
  ],
  {
    variants: {
      variant: {
        /**
         * page — 普通页码项
         * 32×32px，透明背景，标题文字色
         * hover: --bg-secondary / active: --bg-secondary-active
         */
        page: [
          "w-8 h-8 p-[var(--space-intimate)]",
          "text-[length:var(--font-body-md-size)] leading-[22px]",
          "text-[var(--text-heading)]",
          "cursor-pointer",
          "hover:bg-[var(--bg-secondary)]",
          "active:bg-[var(--bg-secondary-active)]",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-[var(--text-disabled)]",
        ],
        /**
         * page-active — 当前选中页码
         * 32×32px，浅蓝背景（--brand-light-bg），品牌文字色，字重 semibold
         * Figma: bg rgba(51,119,255,0.12) → --brand-light-bg (#F2F8FF)
         */
        "page-active": [
          "w-8 h-8 p-[var(--space-intimate)]",
          "text-[length:var(--font-body-md-size)] leading-[22px]",
          "bg-[var(--brand-light-bg)]",
          "text-[var(--brand-base)]",
          "font-semibold",
          "cursor-default",
        ],
        /**
         * nav — 上一页 / 下一页箭头按钮
         * 28×28px，水平内边距 10px，透明背景
         */
        nav: [
          "w-7 h-7 px-[10px]",
          "text-[var(--text-heading)]",
          "cursor-pointer",
          "hover:bg-[var(--bg-secondary)]",
          "active:bg-[var(--bg-secondary-active)]",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-[var(--text-disabled)]",
        ],
        /**
         * ellipsis — 省略号占位符（非交互）
         * 32×32px，次要文字色
         */
        ellipsis: [
          "w-8 h-8",
          "text-[var(--text-secondary)]",
          "cursor-default",
        ],
      },
    },
    defaultVariants: {
      variant: "page",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────
export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** 数据总条目数 */
  total: number;
  /** 当前页码（1-based，受控模式） */
  current?: number;
  /** 默认页码（1-based，非受控初始值），默认 1 */
  defaultCurrent?: number;
  /** 每页条目数，默认 10 */
  pageSize?: number;
  /** 页码改变回调，返回新页码 */
  onChange?: (page: number) => void;
  /** 是否禁用分页器所有交互 */
  disabled?: boolean;
}

// ── 内部工具：计算需要渲染的页码序列 ──────────────────────────
type PageItem = number | "ellipsis-start" | "ellipsis-end";

function getPageRange(current: number, totalPages: number): PageItem[] {
  if (totalPages <= 1) return [1];
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // 以 current 为中心，取前后各 2 页的窗口（最少展示 5 个连续页）
  const windowStart = Math.max(1, Math.min(current - 2, totalPages - 4));
  const windowEnd = Math.min(totalPages, Math.max(current + 2, 5));

  const pages: PageItem[] = [];

  // 首页（窗口起点 > 1 时显示）
  if (windowStart > 1) {
    pages.push(1);
  }
  // 首部省略号（窗口起点 > 2 时，说明 1 与窗口间有缺口）
  if (windowStart > 2) {
    pages.push("ellipsis-start");
  }

  // 连续页码窗口
  for (let p = windowStart; p <= windowEnd; p++) {
    pages.push(p);
  }

  // 尾部省略号（窗口终点 < totalPages - 1 时有缺口）
  if (windowEnd < totalPages - 1) {
    pages.push("ellipsis-end");
  }
  // 末页
  if (windowEnd < totalPages) {
    pages.push(totalPages);
  }

  return pages;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      total,
      current: controlledCurrent,
      defaultCurrent = 1,
      pageSize = 10,
      onChange,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    // 非受控内部状态（当 current prop 未传时使用）
    const [internalPage, setInternalPage] = React.useState(defaultCurrent);
    const isControlled = controlledCurrent !== undefined;
    const current = isControlled ? controlledCurrent : internalPage;

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const handlePageChange = React.useCallback(
      (page: number) => {
        if (disabled || page < 1 || page > totalPages || page === current) return;
        if (!isControlled) {
          setInternalPage(page);
        }
        onChange?.(page);
      },
      [disabled, totalPages, current, isControlled, onChange]
    );

    const pageRange = getPageRange(current, totalPages);
    const isPrevDisabled = disabled || current <= 1;
    const isNextDisabled = disabled || current >= totalPages;

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="分页导航"
        className={cn(
          "flex flex-row items-center gap-[var(--space-tight)]",
          disabled && "opacity-50",
          className
        )}
        {...props}
      >
        {/* 上一页箭头 */}
        <button
          type="button"
          aria-label="上一页"
          disabled={isPrevDisabled}
          onClick={() => handlePageChange(current - 1)}
          className={cn(paginationItemVariants({ variant: "nav" }))}
        >
          <ChevronLeft size={12} aria-hidden="true" />
        </button>

        {/* 页码列表 */}
        {pageRange.map((item) => {
          if (item === "ellipsis-start" || item === "ellipsis-end") {
            return (
              <span
                key={item}
                aria-hidden="true"
                className={cn(paginationItemVariants({ variant: "ellipsis" }))}
              >
                <MoreHorizontal size={14} />
              </span>
            );
          }

          const isActive = item === current;
          return (
            <button
              key={item}
              type="button"
              aria-label={`第 ${item} 页`}
              aria-current={isActive ? "page" : undefined}
              disabled={disabled}
              onClick={() => handlePageChange(item)}
              className={cn(
                paginationItemVariants({
                  variant: isActive ? "page-active" : "page",
                })
              )}
            >
              {item}
            </button>
          );
        })}

        {/* 下一页箭头 */}
        <button
          type="button"
          aria-label="下一页"
          disabled={isNextDisabled}
          onClick={() => handlePageChange(current + 1)}
          className={cn(paginationItemVariants({ variant: "nav" }))}
        >
          <ChevronRight size={12} aria-hidden="true" />
        </button>
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { paginationItemVariants };
