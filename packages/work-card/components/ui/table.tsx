// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronUp, ChevronDown, ArrowUpDown } from "lucide-react";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// Table 表格组件（复合组件）
//
// 语义化表格：Table → (TableHeader + TableBody + TableFooter)
// 内部使用原生 <table> 系列元素，保证可访问性。
//
// 关键语义变量速查（theme.css :root）：
//   背景色          --bg-primary (#FFFFFF)
//   表头背景        --bg-quaternary (#F7F8FA)
//   选中行          --brand-light-bg (#F2F8FF)
//   文本色          --text-heading (#11141A) / --text-body (#11141A)
//   辅助文本        --text-secondary (#5C6473)
//   禁用文本        --text-disabled (#C7CDD9)
//   边框色          --border-color (#DCDFE5) / --divider-color (#F4F5F7)
//   品牌色          --brand-base (#3377FF)
//   表头行高        42px（md 默认）
//   单行高度        --height-table-double (50px, --comp-height-2xl)
//   双行高度        --height-table-double (50px, --comp-height-2xl)
//   字号            --font-body-md-size (14px) / --font-body-md-height
//   表头字号        --font-body-md-size (14px) / --font-body-md-height
//   间距            --space-tight (8px) / --space-content (12px) / --space-group (16px)
//   圆角            --corner-sm (4px) / --corner-md (8px)
// ────────────────────────────────────────────────────────────

const tableVariants = cva(
  [
    "w-full",
    "border-collapse border-spacing-0",
    "font-['PingFang_SC',sans-serif]",
    "text-[length:var(--font-body-md-size)] leading-[var(--font-body-md-height)]",
    "text-[var(--text-body)]",
  ],
  {
    variants: {
      /**
       * variant — 表格外观
       * default: 无外边框，行间分割线（默认）
       * bordered: 全边框（外边框 + 单元格边框）
       * striped: 奇偶行交替背景色
       */
      variant: {
        default: "",
        bordered: [
          "border border-[var(--border-color)]",
          "rounded-[var(--corner-md)] overflow-hidden",
        ],
        striped: "",
      },
      /**
       * size — 行高/密度
       * sm: 紧凑（32px 行高）
       * md: 标准（表头 42px / 数据行 50px，默认）
       * lg: 宽松（50px 行高）
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

/** Table Context 值 */
interface TableContextValue {
  variant: "default" | "bordered" | "striped";
  size: "sm" | "md" | "lg";
}

/** 排序方向 */
export type SortDirection = "asc" | "desc" | null;

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /** 是否选中态（高亮行） */
  selected?: boolean;
}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** 排序方向，传入后显示排序图标 */
  sortDirection?: SortDirection;
  /** 点击排序回调 */
  onSort?: () => void;
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

// ── Part 5: 组件实现 ─────────────────────────────────────────

const TableContext = React.createContext<TableContextValue>({
  variant: "default",
  size: "md",
});

function useTableContext(): TableContextValue {
  return React.useContext(TableContext);
}

/** 表格区域上下文：区分 head / body / foot */
type TableSection = "head" | "body" | "foot";
const TableSectionContext = React.createContext<TableSection>("body");

/** 表头行高映射 */
const headerHeightMap = {
  sm: "h-[var(--comp-height-lg)]",      // 32px
  md: "h-[42px]",                        // 42px
  lg: "h-[var(--height-table-double)]",  // 50px
};

/** 数据行高映射 */
const rowHeightMap = {
  sm: "h-[var(--comp-height-lg)]",      // 32px
  md: "h-[var(--height-table-double)]", // 50px
  lg: "h-[var(--height-table-double)]", // 50px
};

/**
 * Table — 表格根容器
 * 使用原生 <table> 元素，支持边框/条纹/尺寸变体。
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <TableContext.Provider value={{ variant: variant ?? "default", size: size ?? "md" }}>
        <div className="w-full overflow-auto">
          <table
            ref={ref}
            className={cn(tableVariants({ variant, size, className }))}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);

Table.displayName = "Table";

/**
 * TableHeader — 表头区域 <thead>
 * 灰色背景，font-medium。
 */
export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <TableSectionContext.Provider value="head">
      <thead
        ref={ref}
        className={cn(
          "bg-[var(--bg-quaternary)]",
          className
        )}
        {...props}
      >
        {children}
      </thead>
    </TableSectionContext.Provider>
  );
});

TableHeader.displayName = "TableHeader";

/**
 * TableBody — 表格主体 <tbody>
 */
export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, children, ...props }, ref) => {
  const { variant } = useTableContext();

  return (
    <TableSectionContext.Provider value="body">
      <tbody
        ref={ref}
        className={cn(
          // 条纹模式：奇偶行交替背景
          variant === "striped" && "[&>tr:nth-child(even)]:bg-[var(--bg-quaternary)]",
          className
        )}
        {...props}
      >
        {children}
      </tbody>
    </TableSectionContext.Provider>
  );
});

TableBody.displayName = "TableBody";

/**
 * TableFooter — 表格底部 <tfoot>
 * 灰色背景，font-medium。
 */
export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, children, ...props }, ref) => {
  return (
    <TableSectionContext.Provider value="foot">
      <tfoot
        ref={ref}
        className={cn(
          "bg-[var(--bg-quaternary)]",
          "font-medium",
          className
        )}
        {...props}
      >
        {children}
      </tfoot>
    </TableSectionContext.Provider>
  );
});

TableFooter.displayName = "TableFooter";

/**
 * TableRow — 表格行 <tr>
 * 支持选中态高亮。
 */
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected = false, children, ...props }, ref) => {
    const { variant, size } = useTableContext();
    const section = React.useContext(TableSectionContext);
    const heightMap = section === "head" ? headerHeightMap : rowHeightMap;

    return (
      <tr
        ref={ref}
        data-selected={selected || undefined}
        className={cn(
          heightMap[size],
          "border-b border-[var(--divider-color)]",
          selected && "bg-[var(--brand-light-bg)]",
          variant === "bordered" && "border-b border-[var(--border-color)]",
          // 移除最后一行的底部边框
          "last:border-b-0",
          className
        )}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";

/**
 * TableHead — 表头单元格 <th>
 * 支持可选排序图标和排序交互。
 */
export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  TableHeadProps
>(({ className, sortDirection, onSort, children, ...props }, ref) => {
  const { variant } = useTableContext();
  const sortable = sortDirection !== undefined || !!onSort;

  return (
    <th
      ref={ref}
      className={cn(
        "px-[var(--space-group)] py-[var(--space-tight)]",
        "text-left",
        "text-[length:var(--font-body-md-size)] leading-[var(--font-body-md-height)]",
        "font-medium text-[var(--text-secondary)]",
        "whitespace-nowrap",
        variant === "bordered" && "border-r border-[var(--border-color)] last:border-r-0",
        sortable && "cursor-pointer select-none hover:text-[var(--text-heading)]",
        className
      )}
      onClick={sortable ? onSort : undefined}
      aria-sort={
        sortDirection === "asc"
          ? "ascending"
          : sortDirection === "desc"
          ? "descending"
          : undefined
      }
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortable && (
          <span className="inline-flex flex-col items-center" aria-hidden="true">
            {sortDirection === "asc" ? (
              <ChevronUp size={14} className="text-[var(--brand-base)]" />
            ) : sortDirection === "desc" ? (
              <ChevronDown size={14} className="text-[var(--brand-base)]" />
            ) : (
              <ArrowUpDown size={14} className="text-[var(--text-disabled)]" />
            )}
          </span>
        )}
      </span>
    </th>
  );
});

TableHead.displayName = "TableHead";

/**
 * TableCell — 表格数据单元格 <td>
 */
export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  TableCellProps
>(({ className, children, ...props }, ref) => {
  const { variant } = useTableContext();

  return (
    <td
      ref={ref}
      className={cn(
        "px-[var(--space-group)] py-[var(--space-tight)]",
        "text-[length:var(--font-body-md-size)] leading-[var(--font-body-md-height)]",
        "text-[var(--text-body)]",
        variant === "bordered" && "border-r border-[var(--border-color)] last:border-r-0",
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
});

TableCell.displayName = "TableCell";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { tableVariants };
