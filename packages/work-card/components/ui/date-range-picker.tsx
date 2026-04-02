import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./button";

/* =========================================================
   Part 2: cn() utility
   ========================================================= */

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* =========================================================
   Part 3: Style variants (cva)
   ========================================================= */

const dateRangePickerVariants = cva(
  "relative inline-flex flex-col",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const triggerVariants = cva(
  [
    "inline-flex items-center cursor-pointer",
    "rounded-[var(--corner-sm)] border border-solid",
    "bg-[var(--bg-primary)]",
    "text-[length:var(--font-body-md-size)] leading-[length:var(--font-body-md-height)]",
    "transition-colors",
  ],
  {
    variants: {
      size: {
        sm: "h-[var(--comp-height-md)] px-[var(--space-tight)] gap-[var(--space-intimate)]",
        md: "h-[var(--comp-height-lg)] px-[var(--space-tight)] gap-[var(--space-intimate)]",
        lg: "h-[var(--comp-height-xl)] px-[var(--space-content)] gap-[var(--space-tight)]",
      },
      active: {
        true: "border-[var(--brand-base)]",
        false: "border-[var(--border-color)] hover:border-[var(--brand-hover)] active:border-[var(--brand-active)]",
      },
    },
    defaultVariants: {
      size: "md",
      active: false,
    },
  }
);

const dayCellVariants = cva(
  [
    "w-8 h-8 flex items-center justify-center rounded-full",
    "text-[length:var(--font-body-md-size)] leading-[length:var(--font-body-md-height)]",
    "cursor-pointer select-none transition-colors",
  ],
  {
    variants: {
      state: {
        default:
          "text-[var(--text-body)] hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-secondary-active)]",
        disabled: "text-[var(--text-disabled)] cursor-default",
        selected:
          "bg-[var(--brand-base)] text-white hover:bg-[var(--brand-hover)] active:bg-[var(--brand-active)]",
        inRange:
          "text-[var(--text-body)]",
        today:
          "border border-solid border-[var(--brand-base)] bg-[var(--bg-primary)] text-[var(--text-body)] hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-secondary-active)]",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

/* =========================================================
   Part 4: Props type definition
   ========================================================= */

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof dateRangePickerVariants> {
  /** 开始日期 */
  startDate?: Date | null;
  /** 结束日期 */
  endDate?: Date | null;
  /** 日期范围变更回调 */
  onChange?: (start: Date | null, end: Date | null) => void;
  /** 开始日期占位文字 */
  startPlaceholder?: string;
  /** 结束日期占位文字 */
  endPlaceholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 日期格式化函数 */
  formatDate?: (date: Date) => string;
}

/* =========================================================
   Part 5: Helpers
   ========================================================= */

const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"];

function defaultFormatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDateBetween(date: Date, start: Date, end: Date): boolean {
  const t = date.getTime();
  return t > start.getTime() && t < end.getTime();
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

function getCalendarDays(year: number, month: number): CalendarDay[] {
  const days: CalendarDay[] = [];
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);

  // Previous month overflow
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthDays - i),
      isCurrentMonth: false,
    });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Next month overflow (fill to 6 rows)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  return days;
}

/* =========================================================
   Part 5: Component implementation
   ========================================================= */

export const DateRangePicker = React.forwardRef<
  HTMLDivElement,
  DateRangePickerProps
>(
  (
    {
      className,
      size,
      startDate: controlledStart,
      endDate: controlledEnd,
      onChange,
      startPlaceholder = "开始日期",
      endPlaceholder = "结束日期",
      disabled = false,
      formatDate = defaultFormatDate,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [internalStart, setInternalStart] = React.useState<Date | null>(
      controlledStart ?? null
    );
    const [internalEnd, setInternalEnd] = React.useState<Date | null>(
      controlledEnd ?? null
    );

    // Temporary selection state within the panel
    const [tempStart, setTempStart] = React.useState<Date | null>(null);
    const [tempEnd, setTempEnd] = React.useState<Date | null>(null);

    // Left panel month/year
    const [leftYear, setLeftYear] = React.useState(
      () => (controlledStart ?? new Date()).getFullYear()
    );
    const [leftMonth, setLeftMonth] = React.useState(
      () => (controlledStart ?? new Date()).getMonth()
    );

    const containerRef = React.useRef<HTMLDivElement>(null);

    // Compute right panel month (always left + 1)
    const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;
    const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;

    // Sync controlled props
    React.useEffect(() => {
      if (controlledStart !== undefined) setInternalStart(controlledStart);
    }, [controlledStart]);

    React.useEffect(() => {
      if (controlledEnd !== undefined) setInternalEnd(controlledEnd);
    }, [controlledEnd]);

    // Close on click outside
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          handleCancel();
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    // When opening the panel, initialize temp selections and calendar view
    const handleOpen = () => {
      if (disabled) return;
      setTempStart(internalStart);
      setTempEnd(internalEnd);
      const ref = internalStart ?? new Date();
      setLeftYear(ref.getFullYear());
      setLeftMonth(ref.getMonth());
      setOpen(true);
    };

    const handleCancel = () => {
      setOpen(false);
      setTempStart(null);
      setTempEnd(null);
    };

    const handleConfirm = () => {
      if (tempStart && tempEnd) {
        setInternalStart(tempStart);
        setInternalEnd(tempEnd);
        onChange?.(tempStart, tempEnd);
      }
      setOpen(false);
    };

    const handleDayClick = (date: Date) => {
      if (!tempStart || (tempStart && tempEnd)) {
        // Start new selection
        setTempStart(date);
        setTempEnd(null);
      } else {
        // Complete selection
        if (date.getTime() < tempStart.getTime()) {
          setTempEnd(tempStart);
          setTempStart(date);
        } else {
          setTempEnd(date);
        }
      }
    };

    const handleToday = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      setLeftYear(today.getFullYear());
      setLeftMonth(today.getMonth());
    };

    // Navigation
    const prevYear = () => setLeftYear((y) => y - 1);
    const handleNextYear = () => setLeftYear((y) => y + 1);
    const prevMonth = () => {
      if (leftMonth === 0) {
        setLeftYear((y) => y - 1);
        setLeftMonth(11);
      } else {
        setLeftMonth((m) => m - 1);
      }
    };
    const nextMonth = () => {
      if (leftMonth === 11) {
        setLeftYear((y) => y + 1);
        setLeftMonth(0);
      } else {
        setLeftMonth((m) => m + 1);
      }
    };

    // Compute the effective range for visual display (only when both selected)
    const rangeStart =
      tempStart && tempEnd
        ? tempStart.getTime() <= tempEnd.getTime()
          ? tempStart
          : tempEnd
        : null;
    const rangeEnd =
      tempStart && tempEnd
        ? tempStart.getTime() <= tempEnd.getTime()
          ? tempEnd
          : tempStart
        : null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function getDayState(
      day: CalendarDay
    ): "default" | "disabled" | "selected" | "inRange" | "today" {
      if (!day.isCurrentMonth) return "disabled";
      // Show selected state for single-pick tempStart (even before tempEnd is chosen)
      if (tempStart && !tempEnd && isSameDay(day.date, tempStart))
        return "selected";
      if (rangeStart && isSameDay(day.date, rangeStart)) return "selected";
      if (rangeEnd && isSameDay(day.date, rangeEnd)) return "selected";
      if (
        rangeStart &&
        rangeEnd &&
        isDateBetween(day.date, rangeStart, rangeEnd)
      ) {
        return "inRange";
      }
      if (isSameDay(day.date, today)) return "today";
      return "default";
    }

    // Check if a day is within range (for background row highlight)
    function isInRangeRow(day: CalendarDay): boolean {
      if (!day.isCurrentMonth || !rangeStart || !rangeEnd) return false;
      const t = day.date.getTime();
      return t >= rangeStart.getTime() && t <= rangeEnd.getTime();
    }

    const renderMonth = (year: number, month: number) => {
      const days = getCalendarDays(year, month);
      const rows: CalendarDay[][] = [];
      for (let i = 0; i < days.length; i += 7) {
        rows.push(days.slice(i, i + 7));
      }

      return (
        <div className="w-[272px]">
          {/* Weekday header */}
          <div className="grid grid-cols-7 gap-y-2 mb-1">
            {WEEK_DAYS.map((d) => (
              <div
                key={d}
                className="w-8 h-8 flex items-center justify-center text-[length:var(--font-body-md-size)] text-[var(--text-help)]"
              >
                {d}
              </div>
            ))}
          </div>
          {/* Day grid */}
          <div className="grid grid-cols-7 gap-y-2">
            {rows.map((row, ri) =>
              row.map((day, ci) => {
                const state = getDayState(day);
                const inRange = isInRangeRow(day);
                const isStart =
                  day.isCurrentMonth && rangeStart && isSameDay(day.date, rangeStart);
                const isEnd =
                  day.isCurrentMonth && rangeEnd && isSameDay(day.date, rangeEnd);

                return (
                  <div
                    key={`${ri}-${ci}`}
                    className={cn(
                      "relative flex items-center justify-center",
                      inRange && !isStart && !isEnd && "bg-primary/[0.16]",
                      isStart && "bg-gradient-to-r from-transparent from-50% to-primary/[0.16] to-50%",
                      isEnd && "bg-gradient-to-l from-transparent from-50% to-primary/[0.16] to-50%",
                      isStart && isEnd && "bg-none",
                      // Row-boundary rounding: pill corners where range wraps
                      ci === 0 && inRange && !isStart && "rounded-l-full",
                      ci === 6 && inRange && !isEnd && "rounded-r-full",
                      ci === 0 && isEnd && "rounded-l-full",
                      ci === 6 && isStart && "rounded-r-full"
                    )}
                  >
                    <button
                      type="button"
                      className={cn(dayCellVariants({ state }))}
                      onClick={() =>
                        day.isCurrentMonth && handleDayClick(day.date)
                      }
                      disabled={!day.isCurrentMonth}
                    >
                      {day.date.getDate()}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      );
    };

    return (
      <div
        ref={(node) => {
          // Merge refs
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(dateRangePickerVariants({ size, className }))}
        {...props}
      >
        {/* Trigger */}
        <button
          type="button"
          className={cn(
            triggerVariants({ size, active: open }),
            "w-[250px]",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => (open ? handleCancel() : handleOpen())}
          disabled={disabled}
        >
          <span
            className={cn(
              "flex-1 text-left truncate text-[13px]",
              internalStart
                ? "text-[var(--text-body)]"
                : "text-[var(--text-help)]"
            )}
          >
            {internalStart ? formatDate(internalStart) : startPlaceholder}
          </span>
          <span className="text-[var(--text-disabled)] text-[13px] mr-1">-</span>
          <span
            className={cn(
              "flex-1 text-left truncate text-[13px]",
              internalEnd
                ? "text-[var(--text-body)]"
                : "text-[var(--text-help)]"
            )}
          >
            {internalEnd ? formatDate(internalEnd) : endPlaceholder}
          </span>
          <Calendar className="shrink-0 text-[var(--icon-main)]" size={14} strokeWidth={1.5} />
        </button>

        {/* Dropdown panel */}
        {open && (
          <div className="absolute top-[calc(var(--comp-height-lg)+4px)] left-0 z-50 rounded-[var(--corner-sm)] bg-[var(--bg-primary)] shadow-sm border border-[var(--border-color)]">
            {/* Header navigation */}
            <div className="flex items-center px-4 pt-4 pb-4">
              {/* Left panel header */}
              <div className="flex items-center w-[272px]">
                <button
                  type="button"
                  className="w-5 h-5 flex items-center justify-center text-[var(--icon-main)] hover:text-[var(--brand-base)] active:text-[var(--text-heading)]"
                  onClick={prevYear}
                >
                  <ChevronsLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="w-5 h-5 flex items-center justify-center text-[var(--icon-main)] hover:text-[var(--brand-base)] active:text-[var(--text-heading)] ml-1"
                  onClick={prevMonth}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="flex-1 text-center text-[length:var(--font-body-md-size)] font-medium text-[var(--text-heading)]">
                  {leftYear}年{leftMonth + 1}月
                </span>
              </div>

              {/* Spacer */}
              <div className="w-4" />

              {/* Right panel header */}
              <div className="flex items-center w-[272px]">
                <span className="flex-1 text-center text-[length:var(--font-body-md-size)] font-medium text-[var(--text-heading)]">
                  {rightYear}年{rightMonth + 1}月
                </span>
                <button
                  type="button"
                  className="w-5 h-5 flex items-center justify-center text-[var(--icon-main)] hover:text-[var(--brand-base)] active:text-[var(--text-heading)] mr-1"
                  onClick={nextMonth}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="w-5 h-5 flex items-center justify-center text-[var(--icon-main)] hover:text-[var(--brand-base)] active:text-[var(--text-heading)]"
                  onClick={handleNextYear}
                >
                  <ChevronsRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar body */}
            <div className="flex px-4 gap-8">
              {renderMonth(leftYear, leftMonth)}
              {renderMonth(rightYear, rightMonth)}
            </div>

            {/* Footer */}
            <div className="border-t border-[var(--border-color)] mt-4 px-4 py-2 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToday}
              >
                今天
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  取消
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleConfirm}
                  disabled={!tempStart || !tempEnd}
                >
                  确定
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";

export { dateRangePickerVariants, triggerVariants, dayCellVariants };
