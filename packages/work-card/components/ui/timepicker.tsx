// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Clock } from "lucide-react";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
// 颜色引用（theme.css 语义变量）：
//   默认边框  --border-color (#DCDFE5)
//   焦点/悬浮边框 --brand-base (#3377FF)  悬浮 --brand-hover  按下 --brand-active
//   报错边框  --status-error (#FF5040)
//   占位文字  --text-disabled (#C7CDD9)
//   输入文字  --text-body (#11141A)
//   图标正常  --icon-main
//   图标禁用  --icon-disabled
//   下拉背景  --bg-primary (#FFFFFF)
//   下拉悬停  --bg-secondary (#F2F4F7)
//   分隔线    --divider-color (#F4F5F7)
//   禁用背景  --bg-secondary (#F2F4F7)

const timePickerVariants = cva(
  [
    "relative inline-flex items-center",
    "h-[var(--height-button-regular)] w-40",
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

// 下拉列表项样式变体（通用）
const dropdownItemVariants = cva(
  [
    "w-full h-8 flex items-center justify-center",
    "text-[13px] cursor-pointer transition-colors duration-100 select-none",
  ],
  {
    variants: {
      selected: {
        true: "text-[var(--brand-base)]",
        false: "text-[var(--text-body)]",
      },
      hovered: {
        true: "bg-[var(--bg-secondary)]",
        false: "bg-transparent",
      },
    },
    defaultVariants: {
      selected: false,
      hovered: false,
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────
export interface TimePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof timePickerVariants> {
  /** 选择模式：hour = 仅小时（HH:00），hour-minute = 时分（HH:MM） */
  mode?: "hour" | "hour-minute";
  /** 当前选中值，如 "14:00" 或 "14:30" */
  value?: string | null;
  /** 输入框占位提示 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 报错提示文字（status="error" 时展示） */
  errorMessage?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 小时选项范围 [start, end]，默认 [0, 23] */
  hourRange?: [number, number];
  /** 分钟步长（hour-minute 模式），默认 1 */
  minuteStep?: number;
}

// ── 内部子组件：小时单列下拉 ─────────────────────────────────
interface HourListProps {
  hourOptions: number[];
  selectedHour: number | null;
  onSelect: (hour: number) => void;
}

function HourList({ hourOptions, selectedHour, onSelect }: HourListProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  // 打开时将已选项滚动到可视中心
  React.useEffect(() => {
    if (!scrollRef.current || selectedHour === null) return;
    const idx = hourOptions.indexOf(selectedHour);
    if (idx === -1) return;
    const itemH = 32;
    const containerH = scrollRef.current.clientHeight;
    scrollRef.current.scrollTop = Math.max(0, idx * itemH - containerH / 2 + itemH / 2);
  }, [hourOptions, selectedHour]);

  return (
    <div
      ref={scrollRef}
      className="w-40 overflow-y-auto py-1"
      style={{ height: 328, scrollbarWidth: "thin", scrollbarColor: "var(--color-gray-2) transparent" }}
      role="listbox"
    >
      {hourOptions.map((hour, idx) => {
        const isSelected = hour === selectedHour;
        const isHovered = hoveredIndex === idx;
        return (
          <div
            key={hour}
            role="option"
            aria-selected={isSelected}
            className={cn(dropdownItemVariants({ selected: isSelected, hovered: isHovered }))}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onSelect(hour)}
          >
            {`${String(hour).padStart(2, "0")}:00`}
          </div>
        );
      })}
    </div>
  );
}

// ── 内部子组件：时分双列面板 ─────────────────────────────────
interface HourMinutePanelProps {
  hourOptions: number[];
  minuteOptions: number[];
  pendingHour: number | null;
  pendingMinute: number | null;
  onHourSelect: (hour: number) => void;
  onMinuteSelect: (minute: number) => void;
  onConfirm: () => void;
}

function HourMinutePanel({
  hourOptions,
  minuteOptions,
  pendingHour,
  pendingMinute,
  onHourSelect,
  onMinuteSelect,
  onConfirm,
}: HourMinutePanelProps) {
  const hourScrollRef = React.useRef<HTMLDivElement>(null);
  const minuteScrollRef = React.useRef<HTMLDivElement>(null);
  const [hoveredHour, setHoveredHour] = React.useState<number | null>(null);
  const [hoveredMinute, setHoveredMinute] = React.useState<number | null>(null);

  const scrollToCenter = (
    ref: React.RefObject<HTMLDivElement | null>,
    idx: number
  ) => {
    if (!ref.current || idx === -1) return;
    const itemH = 32;
    const containerH = ref.current.clientHeight;
    ref.current.scrollTop = Math.max(0, idx * itemH - containerH / 2 + itemH / 2);
  };

  React.useEffect(() => {
    if (pendingHour !== null) {
      scrollToCenter(hourScrollRef, hourOptions.indexOf(pendingHour));
    }
  }, [pendingHour, hourOptions]);

  React.useEffect(() => {
    if (pendingMinute !== null) {
      scrollToCenter(minuteScrollRef, minuteOptions.indexOf(pendingMinute));
    }
  }, [pendingMinute, minuteOptions]);

  const colScrollStyle: React.CSSProperties = {
    scrollbarWidth: "thin",
    scrollbarColor: "var(--color-gray-2) transparent",
  };

  return (
    <div className="w-[158px] flex flex-col overflow-hidden">
      {/* 双列滚动列表 */}
      <div className="flex" style={{ height: 324, overflow: "hidden" }}>
        {/* 小时列 */}
        <div
          ref={hourScrollRef}
          className="flex-1 overflow-y-auto py-1"
          style={colScrollStyle}
          role="listbox"
          aria-label="小时"
        >
          {hourOptions.map((hour) => {
            const isSelected = hour === pendingHour;
            const isHovered = hoveredHour === hour;
            return (
              <div
                key={hour}
                role="option"
                aria-selected={isSelected}
                className={cn(
                  "h-8 flex items-center justify-center text-[13px] cursor-pointer transition-colors duration-100 select-none",
                  isSelected ? "text-[var(--brand-base)]" : "text-[var(--text-body)]",
                  isHovered ? "bg-[var(--bg-secondary)]" : "bg-transparent"
                )}
                onMouseEnter={() => setHoveredHour(hour)}
                onMouseLeave={() => setHoveredHour(null)}
                onClick={() => onHourSelect(hour)}
              >
                {String(hour).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* 列分隔线 */}
        <div className="w-px flex-shrink-0 bg-[var(--divider-color)]" />

        {/* 分钟列 */}
        <div
          ref={minuteScrollRef}
          className="flex-1 overflow-y-auto py-1"
          style={colScrollStyle}
          role="listbox"
          aria-label="分钟"
        >
          {minuteOptions.map((minute) => {
            const isSelected = minute === pendingMinute;
            const isHovered = hoveredMinute === minute;
            return (
              <div
                key={minute}
                role="option"
                aria-selected={isSelected}
                className={cn(
                  "h-8 flex items-center justify-center text-[13px] cursor-pointer transition-colors duration-100 select-none",
                  isSelected ? "text-[var(--brand-base)]" : "text-[var(--text-body)]",
                  isHovered ? "bg-[var(--bg-secondary)]" : "bg-transparent"
                )}
                onMouseEnter={() => setHoveredMinute(minute)}
                onMouseLeave={() => setHoveredMinute(null)}
                onClick={() => onMinuteSelect(minute)}
              >
                {String(minute).padStart(2, "0")}
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部分隔线 */}
      <div className="h-px bg-[var(--divider-color)]" />

      {/* 确定按钮 */}
      <div className="h-[49px] flex items-center justify-end pr-4">
        <button
          type="button"
          className={cn(
            "w-[60px] h-7 rounded-[16px]",
            "bg-[var(--brand-base)] text-white text-[12px] leading-none",
            "hover:bg-[var(--brand-hover)] active:bg-[var(--brand-active)]",
            "transition-colors duration-150 cursor-pointer border-0 outline-none"
          )}
          onClick={onConfirm}
        >
          确定
        </button>
      </div>
    </div>
  );
}

// ── Part 5: 组件实现 ─────────────────────────────────────────
export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      className,
      mode = "hour",
      value,
      placeholder = "请选择时间",
      disabled = false,
      status = "default",
      errorMessage,
      onChange,
      hourRange = [0, 23],
      minuteStep = 1,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [pendingHour, setPendingHour] = React.useState<number | null>(null);
    const [pendingMinute, setPendingMinute] = React.useState<number | null>(null);

    // 合并外部 ref 与内部 ref（用于 outside-click 检测）
    const internalRef = React.useRef<HTMLDivElement>(null);
    const setRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    // 解析当前值
    const parsedHour = React.useMemo(() => {
      if (!value) return null;
      const h = parseInt(value.split(":")[0] ?? "");
      return isNaN(h) ? null : h;
    }, [value]);

    const parsedMinute = React.useMemo(() => {
      if (!value) return null;
      const m = parseInt(value.split(":")[1] ?? "");
      return isNaN(m) ? null : m;
    }, [value]);

    // 生成选项列表
    const hourOptions = React.useMemo(() => {
      const [start, end] = hourRange;
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }, [hourRange]);

    const minuteOptions = React.useMemo(() => {
      return Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep);
    }, [minuteStep]);

    // 打开/关闭下拉
    const handleTriggerClick = () => {
      if (disabled) return;
      if (!open) {
        setPendingHour(parsedHour);
        setPendingMinute(parsedMinute ?? 0);
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

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

    // 小时选中（hour 模式立即确认；hour-minute 模式仅暂存）
    const handleHourSelect = (hour: number) => {
      if (mode === "hour") {
        onChange?.(`${String(hour).padStart(2, "0")}:00`);
        setOpen(false);
      } else {
        setPendingHour(hour);
      }
    };

    // 分钟选中（暂存）
    const handleMinuteSelect = (minute: number) => {
      setPendingMinute(minute);
    };

    // 确定按钮（hour-minute 模式）
    const handleConfirm = () => {
      if (pendingHour !== null) {
        const h = String(pendingHour).padStart(2, "0");
        const m = String(pendingMinute ?? 0).padStart(2, "0");
        onChange?.(`${h}:${m}`);
      }
      setOpen(false);
    };

    // 计算触发器实际样式
    const triggerClassName = cn(
      timePickerVariants({ status: disabled ? "default" : status }),
      // open 状态强制蓝色边框
      !disabled && open && "border-[var(--brand-base)]",
      // disabled 覆盖
      disabled && "cursor-not-allowed bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-[var(--border-color)]"
    );

    return (
      <div
        ref={setRef}
        className={cn("relative inline-block", className)}
        {...props}
      >
        {/* 触发器 */}
        <div
          className={triggerClassName}
          onClick={handleTriggerClick}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleTriggerClick();
            }
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {/* 占位 / 已选值 */}
          <span
            className={cn(
              "flex-1 ml-2 text-[13px] truncate leading-none",
              value
                ? disabled
                  ? "text-[var(--text-disabled)]"
                  : "text-[var(--text-body)]"
                : "text-[var(--text-disabled)]"
            )}
          >
            {value ?? placeholder}
          </span>

          {/* 时钟图标 */}
          <span className="flex-shrink-0 w-4 h-4 mr-2 flex items-center justify-center">
            <Clock
              size={14}
              strokeWidth={1.5}
              color={disabled ? "var(--icon-disabled)" : "var(--icon-main)"}
            />
          </span>
        </div>

        {/* 报错提示 */}
        {status === "error" && errorMessage && !disabled && (
          <div className="mt-0.5 text-[12px] leading-[18px] text-[var(--status-error)]">
            {errorMessage}
          </div>
        )}

        {/* 下拉面板 */}
        {open && !disabled && (
          <div
            className={cn(
              "absolute top-[calc(100%+4px)] left-0 z-50",
              "bg-[var(--bg-primary)] rounded-[var(--corner-sm)]",
              "border border-[var(--border-color)] overflow-hidden"
            )}
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            {mode === "hour" ? (
              <HourList
                hourOptions={hourOptions}
                selectedHour={parsedHour}
                onSelect={handleHourSelect}
              />
            ) : (
              <HourMinutePanel
                hourOptions={hourOptions}
                minuteOptions={minuteOptions}
                pendingHour={pendingHour}
                pendingMinute={pendingMinute}
                onHourSelect={handleHourSelect}
                onMinuteSelect={handleMinuteSelect}
                onConfirm={handleConfirm}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { timePickerVariants, dropdownItemVariants };
