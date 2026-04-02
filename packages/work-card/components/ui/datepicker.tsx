// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./button";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
// 颜色引用（theme.css 语义变量）：
//   默认边框  --border-color (#DCDFE5)
//   悬浮/焦点边框 --brand-base (#3377FF)
//   报错边框  --status-error (#FF5040)
//   占位文字  --text-disabled (#C7CDD9)
//   输入文字  --text-body (#11141A)
//   图标正常  --icon-main
//   图标禁用  --icon-disabled
//   下拉背景  --bg-primary (#FFFFFF)
//   日期悬停  --bg-secondary (#F2F4F7)
//   今日圆圈  --brand-base
//   选中日期  --brand-base（背景）+ --bg-primary（文字）
//   范围高亮  --brand-light-bg (color-brandblue-0, 最浅蓝)
//   非本月    --text-disabled
//   禁用背景  --bg-secondary (#F2F4F7)

const datePickerVariants = cva(
  [
    "relative inline-flex items-center",
    "h-[var(--height-button-regular)]",
    "rounded-[var(--corner-sm)] border border-solid bg-[var(--bg-primary)]",
    "select-none transition-colors duration-150 outline-none",
  ],
  {
    variants: {
      status: {
        default: [
          "border-[var(--border-color)]",
          "cursor-pointer",
          "hover:border-[var(--brand-base)]",
        ],
        error: [
          "border-[var(--status-error)]",
          "cursor-pointer",
        ],
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

// ── 内部工具函数 ──────────────────────────────────────────────

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatYearMonth(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function formatDateTime(date: Date): string {
  const base = formatDate(date);
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${base} ${h}:${min}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function normalizeDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isBetween(date: Date, a: Date, b: Date): boolean {
  const t = normalizeDay(date).getTime();
  const t1 = normalizeDay(a).getTime();
  const t2 = normalizeDay(b).getTime();
  const lo = Math.min(t1, t2);
  const hi = Math.max(t1, t2);
  return t > lo && t < hi;
}

function isOutOfRange(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate) {
    if (normalizeDay(date) < normalizeDay(minDate)) return true;
  }
  if (maxDate) {
    if (normalizeDay(date) > normalizeDay(maxDate)) return true;
  }
  return false;
}

function getMonthMeta(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  return { firstDay, daysInMonth, daysInPrevMonth };
}

// ── 内部子组件：年月选择面板（mode="month"）─────────────────
// 布局：顶部导航（左右箭头 + 年月标题），左列年份滚动 + 右侧 4×3 月份网格
// 选择月份后直接触发确认

const MONTH_GRID_LABELS = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

interface YearMonthPanelProps {
  yearOptions: number[];
  pendingYear: number;
  pendingMonth: number;   // 0–11
  today: Date;
  minDate?: Date;
  maxDate?: Date;
  onYearSelect: (year: number) => void;
  onMonthSelect: (month: number) => void;
  onConfirm: (year: number, month: number) => void;
}

function YearMonthPanel({
  yearOptions,
  pendingYear,
  pendingMonth,
  today,
  minDate,
  maxDate,
  onYearSelect,
  onMonthSelect,
  onConfirm,
}: YearMonthPanelProps) {
  const yearScrollRef = React.useRef<HTMLDivElement>(null);
  const [hoveredYear, setHoveredYear] = React.useState<number | null>(null);
  const [hoveredMonth, setHoveredMonth] = React.useState<number | null>(null);

  const scrollToCenter = (ref: React.RefObject<HTMLDivElement | null>, idx: number) => {
    if (!ref.current || idx === -1) return;
    const itemH = 36;
    const containerH = ref.current.clientHeight;
    ref.current.scrollTop = Math.max(0, idx * itemH - containerH / 2 + itemH / 2);
  };

  React.useEffect(() => {
    scrollToCenter(yearScrollRef, yearOptions.indexOf(pendingYear));
  }, [pendingYear, yearOptions]);

  function isYearDisabled(year: number): boolean {
    if (minDate && year < minDate.getFullYear()) return true;
    if (maxDate && year > maxDate.getFullYear()) return true;
    return false;
  }

  function isMonthDisabled(month: number): boolean {
    if (minDate) {
      if (pendingYear < minDate.getFullYear()) return true;
      if (pendingYear === minDate.getFullYear() && month < minDate.getMonth()) return true;
    }
    if (maxDate) {
      if (pendingYear > maxDate.getFullYear()) return true;
      if (pendingYear === maxDate.getFullYear() && month > maxDate.getMonth()) return true;
    }
    return false;
  }

  // 点击月份后直接选中并确认
  const handleMonthClick = (month: number) => {
    if (isMonthDisabled(month)) return;
    onMonthSelect(month);
    onConfirm(pendingYear, month);
  };

  // 导航：上一年月 / 下一年月
  const handlePrev = () => {
    if (pendingMonth === 0) {
      const prevYear = pendingYear - 1;
      if (!minDate || prevYear >= minDate.getFullYear()) {
        onYearSelect(prevYear);
        onMonthSelect(11);
      }
    } else {
      onMonthSelect(pendingMonth - 1);
    }
  };

  const handleNext = () => {
    if (pendingMonth === 11) {
      const nextYear = pendingYear + 1;
      if (!maxDate || nextYear <= maxDate.getFullYear()) {
        onYearSelect(nextYear);
        onMonthSelect(0);
      }
    } else {
      onMonthSelect(pendingMonth + 1);
    }
  };

  const colScrollStyle: React.CSSProperties = {
    scrollbarWidth: "thin",
    scrollbarColor: "var(--color-gray-2) transparent",
  };

  return (
    <div className="w-[304px] flex flex-col overflow-hidden">
      {/* 顶部导航：< 2022年5月 > */}
      <div className="flex items-center justify-between h-[52px] shrink-0 px-[var(--space-section)]">
        <button
          type="button"
          className={cn(
            "w-5 h-5 flex items-center justify-center",
            "text-[var(--icon-main)] hover:text-[var(--brand-base)]",
            "transition-colors duration-100 cursor-pointer border-0 outline-none bg-transparent"
          )}
          onClick={handlePrev}
          aria-label="上一月"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-[14px] font-medium text-[var(--text-heading)] leading-[20px] select-none">
          {pendingYear}年{pendingMonth + 1}月
        </span>
        <button
          type="button"
          className={cn(
            "w-5 h-5 flex items-center justify-center",
            "text-[var(--icon-main)] hover:text-[var(--brand-base)]",
            "transition-colors duration-100 cursor-pointer border-0 outline-none bg-transparent"
          )}
          onClick={handleNext}
          aria-label="下一月"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 分隔线 */}
      <div className="h-px bg-[var(--color-other-5)]" />

      {/* 主体：左侧年份列 + 竖线分隔 + 右侧月份网格 */}
      <div className="flex" style={{ height: 217 }}>
        {/* 年份列（左），宽 74px */}
        <div
          ref={yearScrollRef}
          className="w-[74px] flex-shrink-0 overflow-y-auto"
          style={colScrollStyle}
          role="listbox"
          aria-label="年份"
        >
          {yearOptions.map((year) => {
            const isSelected = year === pendingYear;
            const isHovered = hoveredYear === year;
            const isDisabled = isYearDisabled(year);
            const isTodayYear = year === today.getFullYear();
            return (
              <div
                key={year}
                role="option"
                aria-selected={isSelected}
                className={cn(
                  "h-9 flex items-center justify-center text-[14px] select-none transition-colors duration-100",
                  isDisabled
                    ? "text-[var(--text-disabled)] cursor-not-allowed"
                    : isSelected
                    ? "text-[var(--brand-base)] font-normal cursor-pointer"
                    : isHovered
                    ? "bg-[var(--bg-ghost-hover)] text-[var(--text-body)] cursor-pointer"
                    : isTodayYear
                    ? "text-[var(--brand-base)] cursor-pointer"
                    : "text-[var(--text-body)] cursor-pointer"
                )}
                onMouseEnter={() => !isDisabled && setHoveredYear(year)}
                onMouseLeave={() => setHoveredYear(null)}
                onClick={() => !isDisabled && onYearSelect(year)}
              >
                {year}
              </div>
            );
          })}
        </div>

        {/* 竖分隔线 */}
        <div className="w-px flex-shrink-0 bg-[var(--color-other-5)]" />

        {/* 月份网格（右），4行×3列 */}
        <div
          className="flex-1 grid grid-cols-3 place-items-center py-[9px] px-[20px] gap-y-[16px]"
          role="listbox"
          aria-label="月份"
        >
          {MONTH_GRID_LABELS.map((label, idx) => {
            const isSelected = idx === pendingMonth;
            const isHovered = hoveredMonth === idx;
            const isDisabled = isMonthDisabled(idx);
            const isTodayMonth = today.getFullYear() === pendingYear && today.getMonth() === idx;
            return (
              <div
                key={idx}
                role="option"
                aria-selected={isSelected}
                className={cn(
                  "w-[44px] h-8 flex items-center justify-center",
                  "rounded-[var(--corner-pill)] text-[14px] select-none",
                  "transition-colors duration-100",
                  isDisabled
                    ? "text-[var(--text-disabled)] cursor-not-allowed"
                    : isSelected
                    ? "bg-[var(--brand-base)] text-[var(--bg-primary)] cursor-pointer"
                    : isHovered
                    ? "bg-[var(--bg-ghost-hover)] text-[var(--text-body)] cursor-pointer"
                    : isTodayMonth
                    ? "text-[var(--brand-base)] cursor-pointer"
                    : "text-[var(--text-body)] cursor-pointer"
                )}
                onMouseEnter={() => !isDisabled && setHoveredMonth(idx)}
                onMouseLeave={() => setHoveredMonth(null)}
                onClick={() => handleMonthClick(idx)}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 内部子组件：底部操作栏 ────────────────────────────────────

interface BottomBarProps {
  showToday?: boolean;
  showTime?: boolean;
  pendingHour: number;
  pendingMinute: number;
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
  onTodayClick?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function BottomBar({
  showToday,
  showTime,
  pendingHour,
  pendingMinute,
  onHourChange,
  onMinuteChange,
  onTodayClick,
  onConfirm,
  onCancel,
}: BottomBarProps) {
  function clampHour(v: number) { return Math.max(0, Math.min(23, v)); }
  function clampMinute(v: number) { return Math.max(0, Math.min(59, v)); }

  // showToday only：居中的"今天"链接
  if (showToday && !showTime) {
    return (
      <>
        <div className="h-px bg-[var(--color-other-5)]" />
        <div className="h-[44px] flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onTodayClick}
          >
            今天
          </Button>
        </div>
      </>
    );
  }

  // showTime mode：设置时间行 + 分隔线 + 取消/确定按钮
  if (showTime) {
    const inputClassName = cn(
      "w-5 text-[14px] text-[var(--text-body)] leading-[20px]",
      "bg-transparent border-0 outline-none p-0",
      "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    );

    return (
      <>
        <div className="h-px bg-[var(--color-other-5)]" />

        {/* 设置时间行 */}
        <div className="flex items-center h-[48px] px-6">
          <span className="text-[14px] text-[var(--text-body)] leading-[20px] select-none">设置时间</span>
          <div className="flex items-center ml-[8px]">
            <input
              type="number"
              min={0}
              max={23}
              value={String(pendingHour).padStart(2, "0")}
              onChange={(e) => onHourChange(clampHour(parseInt(e.target.value) || 0))}
              className={cn(inputClassName, "text-right")}
            />
            <span className="text-[14px] text-[var(--text-body)]">:</span>
            <input
              type="number"
              min={0}
              max={59}
              value={String(pendingMinute).padStart(2, "0")}
              onChange={(e) => onMinuteChange(clampMinute(parseInt(e.target.value) || 0))}
              className={cn(inputClassName, "text-left")}
            />
          </div>
          <ChevronDown
            size={16}
            strokeWidth={2}
            className="ml-auto mt-[3px] flex-shrink-0 text-[var(--icon-main)]"
          />
        </div>

        <div className="h-px bg-[var(--color-other-5)]" />

        {/* 取消 / 确定 按钮行 */}
        <div className="h-[48px] flex items-center justify-end gap-2 px-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
          >
            取消
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onConfirm}
          >
            确定
          </Button>
        </div>
      </>
    );
  }

  return null;
}

// ── 内部子组件：日期网格面板 ──────────────────────────────────

const WEEK_LABELS = ["日", "一", "二", "三", "四", "五", "六"];

interface CalendarPanelProps {
  viewYear: number;
  viewMonth: number;
  today: Date;
  minDate?: Date;
  maxDate?: Date;
  // 单选模式
  selectedDate?: Date | null;
  // 范围模式
  isRange?: boolean;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  hoverDate?: Date | null;
  // 底部栏
  showToday?: boolean;
  showTime?: boolean;
  pendingHour?: number;
  pendingMinute?: number;
  // 事件
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear?: () => void;
  onNextYear?: () => void;
  onSelectDate: (date: Date) => void;
  onHoverDate?: (date: Date | null) => void;
  onHourChange?: (h: number) => void;
  onMinuteChange?: (m: number) => void;
  onTodayClick?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  hideNavigation?: boolean;
}

function CalendarPanel({
  viewYear,
  viewMonth,
  today,
  minDate,
  maxDate,
  selectedDate,
  isRange = false,
  rangeStart,
  rangeEnd,
  hoverDate,
  showToday,
  showTime,
  pendingHour = 0,
  pendingMinute = 0,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
  onSelectDate,
  onHoverDate,
  onHourChange,
  onMinuteChange,
  onTodayClick,
  onConfirm,
  onCancel,
  hideNavigation = false,
}: CalendarPanelProps) {
  const { firstDay, daysInMonth, daysInPrevMonth } = getMonthMeta(viewYear, viewMonth);

  type DayCell = { date: Date; day: number; isCurrentMonth: boolean };
  const cells: DayCell[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ date: new Date(viewYear, viewMonth - 1, daysInPrevMonth - i), day: daysInPrevMonth - i, isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(viewYear, viewMonth, d), day: d, isCurrentMonth: true });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ date: new Date(viewYear, viewMonth + 1, d), day: d, isCurrentMonth: false });
  }

  // 计算范围边界：end 可能是 hoverDate（当只选了 start 时）
  const effectiveEnd = rangeEnd ?? (rangeStart && hoverDate ? hoverDate : null);
  const effectiveStart = rangeStart ?? null;

  function getDayCellState(date: Date, isCurrentMonth: boolean) {
    const outOfRange = !isCurrentMonth || isOutOfRange(date, minDate, maxDate);
    if (outOfRange) return { outOfRange: true, isSelected: false, isStart: false, isEnd: false, isInRange: false, isToday: false };

    const isToday = isSameDay(date, today);

    if (!isRange) {
      const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
      return { outOfRange: false, isSelected, isStart: false, isEnd: false, isInRange: false, isToday };
    }

    // 范围模式
    const isStart = effectiveStart ? isSameDay(date, effectiveStart) : false;
    const isEnd = effectiveEnd ? isSameDay(date, effectiveEnd) : false;
    const isInRange =
      effectiveStart && effectiveEnd
        ? isBetween(date, effectiveStart, effectiveEnd)
        : false;
    return { outOfRange: false, isSelected: false, isStart, isEnd, isInRange, isToday };
  }

  // 用于范围模式：判断日期是否是"较小端"和"较大端"（用于半圆背景方向）
  function isRangeLo(date: Date): boolean {
    if (!effectiveStart || !effectiveEnd) return false;
    const s = normalizeDay(effectiveStart).getTime();
    const e = normalizeDay(effectiveEnd).getTime();
    return normalizeDay(date).getTime() === Math.min(s, e);
  }
  function isRangeHi(date: Date): boolean {
    if (!effectiveStart || !effectiveEnd) return false;
    const s = normalizeDay(effectiveStart).getTime();
    const e = normalizeDay(effectiveEnd).getTime();
    return normalizeDay(date).getTime() === Math.max(s, e);
  }

  const hasBottomBar = showToday || showTime;

  // showToday / showTime 模式下显示的日期：优先显示已选日期，否则显示今天
  const displayHeaderDate = selectedDate ?? today;

  return (
    <div className="w-[304px] flex flex-col">
      {/* showToday / showTime 模式：顶部选中日期标题 + 分割线 */}
      {(showToday || showTime) && (
        <>
          <div className="pt-[14px] pb-[14px] pl-[24px]">
            <span className="text-[14px] font-normal text-[var(--text-heading)] leading-[20px] select-none">
              {displayHeaderDate.getFullYear()}-{displayHeaderDate.getMonth() + 1}-{displayHeaderDate.getDate()}
            </span>
          </div>
          <div className="w-full h-[0.5px] bg-[rgba(225,230,240,1)]" />
        </>
      )}

      {/* 月份/年份导航：<< < YYYY年MM月 > >> */}
      {!hideNavigation && (
        <div className="flex items-center justify-between h-[52px] px-3">
          {/* 左侧：跳年 << + 跳月 < */}
          <div className="flex items-center gap-0.5">
            {onPrevYear && (
              <button
                type="button"
                className={cn(
                  "w-5 h-5 flex items-center justify-center rounded-[var(--corner-sm)]",
                  "text-[var(--icon-main)] hover:text-[var(--brand-base)]",
                  "transition-colors duration-100 cursor-pointer border-0 outline-none bg-transparent"
                )}
                onClick={onPrevYear}
                aria-label="上一年"
              >
                <ChevronsLeft className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              className={cn(
                "w-5 h-5 flex items-center justify-center rounded-[var(--corner-sm)]",
                "text-[var(--icon-main)] hover:text-[var(--brand-base)]",
                "transition-colors duration-100 cursor-pointer border-0 outline-none bg-transparent"
              )}
              onClick={onPrevMonth}
              aria-label="上一月"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* 中间：年月标题 */}
          <span className="text-[14px] font-medium text-[var(--text-heading)] leading-[20px] select-none">
            {viewYear}年{viewMonth + 1}月
          </span>

          {/* 右侧：跳月 > + 跳年 >> */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              className={cn(
                "w-5 h-5 flex items-center justify-center rounded-[var(--corner-sm)]",
                "text-[var(--icon-main)] hover:text-[var(--brand-base)]",
                "transition-colors duration-100 cursor-pointer border-0 outline-none bg-transparent"
              )}
              onClick={onNextMonth}
              aria-label="下一月"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {onNextYear && (
              <button
                type="button"
                className={cn(
                  "w-5 h-5 flex items-center justify-center rounded-[var(--corner-sm)]",
                  "text-[var(--icon-main)] hover:text-[var(--brand-base)]",
                  "transition-colors duration-100 cursor-pointer border-0 outline-none bg-transparent"
                )}
                onClick={onNextYear}
                aria-label="下一年"
              >
                <ChevronsRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 星期标题 */}
      <div className="grid grid-cols-7 px-3 pt-2 pb-1">
        {WEEK_LABELS.map((label) => (
          <div key={label} className="h-8 flex items-center justify-center text-[14px] text-[var(--text-secondary)] select-none">
            {label}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      <div className="grid grid-cols-7 px-3 pb-2 gap-y-0.5">
        {cells.map(({ date, day, isCurrentMonth }, idx) => {
          const { outOfRange, isSelected, isStart, isEnd, isInRange, isToday } = getDayCellState(date, isCurrentMonth);
          const isRangeLoBound = isRange && isStart && isRangeLo(date);
          const isRangeHiBound = isRange && isEnd && isRangeHi(date);
          const isSingleRangePoint = isRange && isStart && isEnd; // start === end

          // 判断是否是行边界：该行第一个或最后一个在范围内的日期
          const dayOfWeek = date.getDay(); // 0=Sunday, 6=Saturday
          const isRowStart = dayOfWeek === 0; // 星期日是行首
          const isRowEnd = dayOfWeek === 6;   // 星期六是行尾
          
          // 检查前一天和后一天是否在范围内
          const prevDay = new Date(date);
          prevDay.setDate(prevDay.getDate() - 1);
          const nextDay = new Date(date);
          nextDay.setDate(nextDay.getDate() + 1);
          
          const prevDayInRange = isRange && effectiveStart && effectiveEnd && 
            normalizeDay(prevDay) >= normalizeDay(effectiveStart) && 
            normalizeDay(prevDay) <= normalizeDay(effectiveEnd);
          const nextDayInRange = isRange && effectiveStart && effectiveEnd && 
            normalizeDay(nextDay) >= normalizeDay(effectiveStart) && 
            normalizeDay(nextDay) <= normalizeDay(effectiveEnd);
          
          // 行边界判断：
          // 1. 当前在范围内，但前一天不在范围内（或是星期日） → 行左边界
          // 2. 当前在范围内，但后一天不在范围内（或是星期六） → 行右边界
          const isRowLeftBoundary = isInRange && !isStart && !isEnd && (isRowStart || !prevDayInRange);
          const isRowRightBoundary = isInRange && !isStart && !isEnd && (isRowEnd || !nextDayInRange);
          const isRowBoundary = isRowLeftBoundary || isRowRightBoundary;

          return (
            <div
              key={idx}
              className="relative h-8 flex items-center justify-center"
              onMouseEnter={() => !outOfRange && onHoverDate?.(date)}
              onMouseLeave={() => onHoverDate?.(null)}
            >
              {/* 范围背景层（半圆/全条） */}
              {isRange && !outOfRange && !isSingleRangePoint && (
                <>
                  {isInRange && (
                    <span className="absolute inset-y-0 inset-x-0 bg-[rgba(51,119,255,0.16)]" />
                  )}
                  {isRangeLoBound && effectiveEnd && (
                    <span className="absolute inset-y-0 right-0 left-1/2 bg-[rgba(51,119,255,0.16)]" />
                  )}
                  {isRangeHiBound && effectiveStart && (
                    <span className="absolute inset-y-0 left-0 right-1/2 bg-[rgba(51,119,255,0.16)]" />
                  )}
                </>
              )}

              {/* 日期按钮 */}
              <button
                type="button"
                disabled={outOfRange}
                onClick={() => !outOfRange && onSelectDate(date)}
                className={cn(
                  "relative z-10 w-8 h-8 flex items-center justify-center",
                  "text-[14px] rounded-[16px]",
                  "transition-colors duration-100 border-0 outline-none",
                  outOfRange
                    ? "text-[var(--text-disabled)] cursor-not-allowed bg-transparent"
                    : isStart || isEnd
                    ? "bg-[var(--brand-base)] text-[var(--bg-primary)] cursor-pointer"
                    : isSelected
                    ? "bg-[var(--brand-base)] text-[var(--bg-primary)] cursor-pointer"
                    : isToday
                    ? [
                        "text-[var(--brand-base)] font-medium cursor-pointer",
                        "ring-1 ring-inset ring-[var(--brand-base)]",
                        "hover:bg-[var(--bg-secondary)]",
                        "bg-transparent",
                      ]
                    : isRowBoundary
                    ? "text-[var(--text-heading)] cursor-pointer bg-[rgba(222,233,255,1)] hover:bg-[rgba(222,233,255,1)]"
                    : isInRange
                    ? "text-[var(--text-heading)] cursor-pointer bg-transparent hover:bg-[var(--bg-secondary)]"
                    : "text-[var(--text-body)] hover:bg-[var(--bg-secondary)] cursor-pointer bg-transparent"
                )}
                aria-label={formatDate(date)}
                aria-pressed={isSelected || isStart || isEnd}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>

      {/* 底部操作栏 */}
      {hasBottomBar && (
        <BottomBar
          showToday={showToday}
          showTime={showTime}
          pendingHour={pendingHour}
          pendingMinute={pendingMinute}
          onHourChange={onHourChange ?? (() => {})}
          onMinuteChange={onMinuteChange ?? (() => {})}
          onTodayClick={onTodayClick}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof datePickerVariants> {
  /**
   * 选择模式
   *   date  — 年月日选择器（默认）
   *   month — 年月选择器
   */
  mode?: "date" | "month";
  /** 当前选中日期（受控） */
  value?: Date | null;
  /** 占位文字 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 报错提示文字（status="error" 时展示） */
  errorMessage?: string;
  /** 可选最小日期 */
  minDate?: Date;
  /** 可选最大日期 */
  maxDate?: Date;
  /** 是否显示"今天"快捷按钮 */
  showToday?: boolean;
  /** 是否显示时间设置（HH:MM），启用后需点击确定按钮才会触发 onChange */
  showTime?: boolean;
  /** 日期/时间变化回调 */
  onChange?: (date: Date) => void;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

// ── DatePicker ────────────────────────────────────────────────

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      mode = "date",
      status = "default",
      value,
      placeholder,
      disabled = false,
      errorMessage,
      minDate,
      maxDate,
      showToday = false,
      showTime = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const defaultPlaceholder = mode === "month" ? "请选择年月" : "请选择日期";
    const resolvedPlaceholder = placeholder ?? defaultPlaceholder;

    const [open, setOpen] = React.useState(false);

    const today = React.useMemo(() => {
      const d = new Date();
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }, []);

    const [viewYear, setViewYear] = React.useState<number>(() => value?.getFullYear() ?? today.getFullYear());
    const [viewMonth, setViewMonth] = React.useState<number>(() => value?.getMonth() ?? today.getMonth());

    // showTime 模式下的待确认时间
    const [pendingHour, setPendingHour] = React.useState<number>(0);
    const [pendingMinute, setPendingMinute] = React.useState<number>(0);

    // month 模式下的待确认年月
    const [pendingYear, setPendingYear] = React.useState<number>(() => value?.getFullYear() ?? today.getFullYear());
    const [pendingMonth, setPendingMonth] = React.useState<number>(() => value?.getMonth() ?? today.getMonth());

    // month 模式可选年份列表（minDate/maxDate 年份范围，否则前后各 20 年）
    const yearOptions = React.useMemo(() => {
      const start = minDate?.getFullYear() ?? (today.getFullYear() - 20);
      const end = maxDate?.getFullYear() ?? (today.getFullYear() + 20);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }, [today, minDate, maxDate]);

    // 合并 ref
    const internalRef = React.useRef<HTMLDivElement>(null);
    const setRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    // 同步外部 value 到视图
    React.useEffect(() => {
      if (value) {
        setViewYear(value.getFullYear());
        setViewMonth(value.getMonth());
        if (showTime) {
          setPendingHour(value.getHours());
          setPendingMinute(value.getMinutes());
        }
      }
    }, [value, showTime]);

    // 点击外部关闭
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (internalRef.current && !internalRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    const handleTriggerClick = () => {
      if (disabled) return;
      if (!open && mode === "month") {
        // 打开时将 pending 状态同步到当前 value 或 today
        setPendingYear(value?.getFullYear() ?? today.getFullYear());
        setPendingMonth(value?.getMonth() ?? today.getMonth());
      }
      setOpen((p) => !p);
    };

    const handlePrevMonth = () => {
      if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
      else setViewMonth((m) => m - 1);
    };
    const handleNextMonth = () => {
      if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
      else setViewMonth((m) => m + 1);
    };

    // date 模式选择日期
    const handleSelectDate = (date: Date) => {
      if (showTime) {
        // showTime: 只记录，不关闭，等待"确定"
        const d = new Date(date);
        d.setHours(pendingHour, pendingMinute, 0, 0);
        onChange?.(d);
        // 不关闭面板，让用户继续调时间后点确定
      } else {
        onChange?.(date);
        setOpen(false);
      }
    };

    // showTime 模式"确定"
    const handleConfirm = () => {
      if (value) {
        const d = new Date(value);
        d.setHours(pendingHour, pendingMinute, 0, 0);
        onChange?.(d);
      }
      setOpen(false);
    };

    // "今天"快捷
    const handleTodayClick = () => {
      const d = new Date();
      if (showTime) {
        setPendingHour(d.getHours());
        setPendingMinute(d.getMinutes());
        onChange?.(d);
        // 不关闭
      } else {
        onChange?.(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
        setOpen(false);
      }
    };

    // showTime 模式"取消"
    const handleCancel = () => {
      setOpen(false);
    };

    // month 模式 — 年份列点击（只更新 pending，不关闭）
    const handleYearSelect = (year: number) => {
      setPendingYear(year);
    };

    // month 模式 — 月份列点击（只更新 pending，不关闭）
    const handleMonthSelect = (month: number) => {
      setPendingMonth(month);
    };

    // month 模式 — 确定（直接传入年月）
    const handleConfirmMonth = (year: number, month: number) => {
      onChange?.(new Date(year, month, 1));
      setOpen(false);
    };

    // 显示文本
    const displayText = React.useMemo(() => {
      if (!value) return null;
      if (mode === "month") return formatYearMonth(value);
      if (showTime) return formatDateTime(value);
      return formatDate(value);
    }, [value, mode, showTime]);

    const derivedStatus = errorMessage ? "error" : status ?? "default";

    const triggerClassName = cn(
      datePickerVariants({ status: disabled ? "default" : derivedStatus }),
      "w-44",
      showTime && "w-[168px]",
      !disabled && open && "border-[var(--brand-base)]",
      disabled && "cursor-not-allowed bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-[var(--border-color)]"
    );

    return (
      <div ref={setRef} className={cn("relative inline-block", className)} {...props}>
        {/* 触发器 */}
        <div
          className={triggerClassName}
          onClick={handleTriggerClick}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleTriggerClick(); }
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <span
            className={cn(
              "flex-1 ml-2 text-[13px] truncate leading-none",
              displayText
                ? disabled ? "text-[var(--text-disabled)]" : "text-[var(--text-body)]"
                : "text-[var(--text-help)]"
            )}
          >
            {displayText ?? resolvedPlaceholder}
          </span>
          <span className="flex-shrink-0 w-4 h-4 mr-2 flex items-center justify-center">
            <Calendar
              size={14}
              strokeWidth={1.5}
              color={disabled ? "var(--icon-disabled)" : "var(--icon-main)"}
            />
          </span>
        </div>

        {/* 报错提示 */}
        {derivedStatus === "error" && errorMessage && !disabled && (
          <div className="mt-0.5 text-[12px] leading-[18px] text-[var(--status-error)]">
            {errorMessage}
          </div>
        )}

        {/* 下拉面板 */}
        {open && !disabled && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={mode === "month" ? "选择年月" : "选择日期"}
            className={cn(
              "absolute top-[calc(100%+4px)] left-0 z-50",
              "bg-[var(--bg-primary)] rounded-[var(--corner-sm)]",
              "border border-[var(--border-color)] overflow-hidden"
            )}
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            {mode === "month" ? (
              <YearMonthPanel
                yearOptions={yearOptions}
                pendingYear={pendingYear}
                pendingMonth={pendingMonth}
                today={today}
                minDate={minDate}
                maxDate={maxDate}
                onYearSelect={handleYearSelect}
                onMonthSelect={handleMonthSelect}
                onConfirm={handleConfirmMonth}
              />
            ) : (
              <CalendarPanel
                viewYear={viewYear}
                viewMonth={viewMonth}
                selectedDate={value ?? null}
                today={today}
                minDate={minDate}
                maxDate={maxDate}
                showToday={showToday}
                showTime={showTime}
                pendingHour={pendingHour}
                pendingMinute={pendingMinute}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onPrevYear={() => setViewYear((y) => y - 1)}
                onNextYear={() => setViewYear((y) => y + 1)}
                onSelectDate={handleSelectDate}
                onHourChange={setPendingHour}
                onMinuteChange={setPendingMinute}
                onTodayClick={handleTodayClick}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { datePickerVariants };
