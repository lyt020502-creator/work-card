// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDown, ChevronUp, X, Check } from "lucide-react";
import { 按钮加载 } from "../icons/index";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// Select Token 速查（基于 Figma 实测）：
//   默认边框：     --color-other-0  (#E8E9EB) ← Figma rgba(232,233,235,1)
//   hover/激活边框：--brand-base    (#3377FF) ← Figma rgba(51,119,255,1)
//   禁用背景：     --bg-secondary   (#F2F4F7) ← Figma rgba(242,244,247,1)
//   placeholder：  --text-disabled  (#C7CDD9) ← Figma rgba(200,201,204,1)
//   选中值文字：   --text-heading   (#11141A)
//   无边框默认文字/箭头：--text-help (#878D99) ← Figma rgba(135,141,153,1)
//   无边框 hover/激活文字/箭头：--brand-base (#3377FF)
//   Tag 背景：     --color-other-5  (#EDF0F5) ≈ Figma rgba(238,240,245,1)
//   Tag 文字：     --text-heading   (#11141A)
//   Tag 圆角：     2px
//   下拉选项高亮：  --brand-base
//   高度：         --comp-height-lg (32px)
//   横向内边距：   --space-tight    (8px)
//   默认圆角：     --corner-sm      (4px)
//   字号：         --font-label-size (13px)
//   Tag 字号：     --font-caption-size (12px)
// ────────────────────────────────────────────────────────────

/** Select 触发器变体 */
const selectTriggerVariants = cva(
  [
    "flex flex-row items-center gap-[var(--space-tight)]",
    "rounded-[var(--corner-sm)]",
    "transition-colors duration-150",
    "outline-none",
    "font-['PingFang_SC',sans-serif] font-normal",
    "w-full",
  ],
  {
    variants: {
      /**
       * variant — 边框样式
       *   bordered:   有边框（默认），带背景和固定高度
       *   borderless: 无边框，内联宽度，hover 时文字/图标变蓝
       */
      variant: {
        bordered: [
          "border bg-[var(--bg-primary)]",
          "px-[var(--space-tight)]",
          "h-[var(--comp-height-lg)]",
          "border-[var(--color-other-0)]",
          "hover:border-[var(--brand-base)]",
        ],
        borderless: [
          "border-0 bg-transparent",
          "px-0 h-auto",
          "gap-[2px]", // 无边框模式：图标与文案间距 2px
          "w-auto",    // 无边框模式：宽度跟随内容自适应，覆盖基础 w-full
          // group 不在此处添加，由组件逻辑在非禁用时动态追加，以防禁用态触发 group-hover
        ],
      },
      /**
       * status — 触发器当前状态（内部计算，不直接作为外部 prop）
       *   default:  正常态，可交互
       *   open:     下拉展开态，边框高亮
       *   disabled: 禁用态
       *   loading:  加载中
       */
      status: {
        default: "cursor-pointer",
        open: "cursor-pointer",
        disabled: "cursor-not-allowed",
        loading: "cursor-default",
      },
    },
    compoundVariants: [
      // bordered × open → 蓝色边框，hover 保持蓝色
      {
        variant: "bordered",
        status: "open",
        className: "border-[var(--brand-base)] hover:border-[var(--brand-base)]",
      },
      // bordered × loading → 蓝色边框
      {
        variant: "bordered",
        status: "loading",
        className: "border-[var(--brand-base)] hover:border-[var(--brand-base)]",
      },
      // bordered × disabled → 灰色边框 + 灰背景，hover 保持灰色
      {
        variant: "bordered",
        status: "disabled",
        className: [
          "bg-[var(--bg-secondary)]",
          "border-[var(--color-other-0)]",
          "hover:border-[var(--color-other-0)]",
        ],
      },
      // borderless × disabled → 整体降低透明度
      {
        variant: "borderless",
        status: "disabled",
        className: "opacity-40",
      },
    ],
    defaultVariants: {
      variant: "bordered",
      status: "default",
    },
  }
);

/** Select 下拉面板 */
const selectDropdownVariants = cva([
  "absolute z-50 left-0 mt-[2px]",
  "bg-[var(--bg-primary)]",
  "border border-[var(--color-other-0)]",
  "rounded-[var(--corner-sm)]",
  "shadow-[var(--shadow-md)]",
  "overflow-y-auto max-h-[200px]",
  "w-full", // 宽度与选择器一致，不超出选择器宽度
  "py-[4px]",
]);

/** Select 下拉选项 */
const selectOptionVariants = cva(
  [
    "flex flex-row items-center justify-between",
    "px-[var(--space-group)]", // 16px，与 Figma 设计稿一致
    "h-[var(--comp-height-lg)]",
    "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
    "font-['PingFang_SC',sans-serif] font-normal",
    "transition-colors duration-100",
    "whitespace-nowrap cursor-pointer",
    "hover:bg-[var(--bg-ghost-hover)]",
  ],
  {
    variants: {
      selected: {
        yes: "text-[var(--brand-base)]",
        no: "text-[var(--text-heading)]",
      },
      disabled: {
        yes: "text-[var(--text-disabled)] cursor-not-allowed hover:bg-transparent",
        no: "",
      },
    },
    defaultVariants: {
      selected: "no",
      disabled: "no",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface SelectOptionItem {
  /** 展示文案 */
  label: string;
  /** 选项值 */
  value: string | number;
  /** 是否禁用该选项 */
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 选项列表 */
  options?: SelectOptionItem[];
  /** 受控值（单选为单值，多选为数组） */
  value?: string | number | (string | number)[];
  /** 非受控默认值 */
  defaultValue?: string | number | (string | number)[];
  /** 值变更回调（单选返回单值，多选返回数组） */
  onChange?: (value: string | number | (string | number)[]) => void;
  /** 占位提示文案 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中（展示 spinner，箭头朝上，边框高亮） */
  loading?: boolean;
  /** 是否多选 */
  multiple?: boolean;
  /** 无边框模式（inline 宽度，hover 变蓝） */
  borderless?: boolean;
  /**
   * 多选时最多展示的 Tag 数量，超出部分显示 "+N..." 角标。
   * 传 "responsive" 时根据容器宽度自适应渲染数量（需 ResizeObserver 支持）。
   */
  maxTagCount?: number | "responsive";
  /** 最小宽度（number 单位 px，或 CSS 字符串） */
  minWidth?: number | string;
  /** 最大宽度（number 单位 px，或 CSS 字符串） */
  maxWidth?: number | string;
  /** 触发器附加 className */
  triggerClassName?: string;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      triggerClassName,
      style,
      options = [],
      value: valueProp,
      defaultValue,
      onChange,
      placeholder = "请选择",
      disabled = false,
      loading = false,
      multiple = false,
      borderless = false,
      maxTagCount,
      minWidth,
      maxWidth,
      ...props
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;

    // 内部选中值（统一维护为数组）
    const [localValue, setLocalValue] = React.useState<(string | number)[]>(() => {
      if (defaultValue !== undefined) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    });

    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // 统一的已选值数组（受控 / 非受控兼容）
    const selectedValues = React.useMemo<(string | number)[]>(() => {
      const v = isControlled ? valueProp : localValue;
      if (v === undefined || v === null) return [];
      return Array.isArray(v) ? v : [v];
    }, [isControlled, valueProp, localValue]);

    // 合并外部 ref 与内部 ref
    const setRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    // 点击外部关闭下拉
    React.useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    const handleTriggerClick = () => {
      if (disabled || loading) return;
      setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (optionValue: string | number, optionDisabled?: boolean) => {
      if (optionDisabled) return;
      let newValues: (string | number)[];
      if (multiple) {
        newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter((v) => v !== optionValue)
          : [...selectedValues, optionValue];
      } else {
        newValues = [optionValue];
        setIsOpen(false);
      }
      if (!isControlled) setLocalValue(newValues);
      onChange?.(multiple ? newValues : newValues[0]);
    };

    const handleTagRemove = (tagValue: string | number, e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      const newValues = selectedValues.filter((v) => v !== tagValue);
      if (!isControlled) setLocalValue(newValues);
      onChange?.(newValues);
    };

    // 计算 CVA 触发器状态
    const triggerVariant = borderless ? "borderless" : "bordered";
    const triggerStatus: "default" | "open" | "disabled" | "loading" =
      disabled ? "disabled" : loading ? "loading" : isOpen ? "open" : "default";

    // 多选 Tag 显示（maxTagCount 截断逻辑）
    const { visibleTags, overflowCount } = React.useMemo(() => {
      if (!multiple) return { visibleTags: [], overflowCount: 0 };
      const selectedOptions = selectedValues
        .map((v) => options.find((o) => o.value === v))
        .filter(Boolean) as SelectOptionItem[];
      if (
        maxTagCount &&
        typeof maxTagCount === "number" &&
        selectedOptions.length > maxTagCount
      ) {
        return {
          visibleTags: selectedOptions.slice(0, maxTagCount),
          overflowCount: selectedOptions.length - maxTagCount,
        };
      }
      return { visibleTags: selectedOptions, overflowCount: 0 };
    }, [multiple, selectedValues, options, maxTagCount]);

    // 单选回显 label
    const singleSelectedLabel = React.useMemo(() => {
      if (multiple || selectedValues.length === 0) return null;
      return options.find((o) => o.value === selectedValues[0])?.label ?? null;
    }, [multiple, selectedValues, options]);

    // 箭头图标颜色
    // borderless: 默认灰色，hover 蓝色（group-hover），open 态强制蓝色
    const arrowClass = cn(
      "flex-shrink-0 transition-colors",
      borderless
        ? isOpen
          ? "text-[var(--brand-base)]"
          : "text-[var(--text-help)] group-hover:text-[var(--brand-base)]"
        : "text-[var(--text-help)]"
    );

    // 容器内联样式（支持 minWidth / maxWidth 宽度自适应）
    const containerStyle: React.CSSProperties = {
      ...style,
      ...(minWidth !== undefined && {
        minWidth: typeof minWidth === "number" ? `${minWidth}px` : minWidth,
      }),
      ...(maxWidth !== undefined && {
        maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
      }),
    };

    const hasMultipleTags = multiple && selectedValues.length > 0;

    return (
      <div
        ref={setRef}
        className={cn("relative", className)}
        style={containerStyle}
        {...props}
      >
        {/* ── 触发器 ───────────────────────────────────────── */}
        <div
          className={cn(
            selectTriggerVariants({ variant: triggerVariant, status: triggerStatus }),
            // 多选有标签时允许高度自适应（标签换行时撑开高度）
            hasMultipleTags && "h-auto min-h-[var(--comp-height-lg)] py-[6px]",
            // 无边框且非禁用时才启用 group，避免禁用态触发子元素 group-hover 颜色变化
            borderless && !disabled && "group",
            triggerClassName
          )}
          onClick={handleTriggerClick}
          role="combobox"
          aria-expanded={isOpen}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleTriggerClick();
            }
            if (e.key === "Escape") setIsOpen(false);
          }}
        >
          {/* 内容区：Tags / 单选值 / placeholder */}
          <div
            className={cn(
              // bordered 模式下 flex-1 min-w-0 撑满触发器；borderless 模式下宽度跟随内容
              !borderless && "flex-1 min-w-0",
              multiple
                ? "flex flex-row flex-wrap items-center gap-[4px]"
                : "flex items-center overflow-hidden"
            )}
          >
            {/* 多选 Tags */}
            {multiple && visibleTags.length > 0 && (
              <>
                {visibleTags.map((tag) => (
                  <span
                    key={tag.value}
                    className="inline-flex items-center gap-[2px] pl-[6px] pr-[4px] h-[20px] rounded-[2px] bg-[var(--color-other-5)] flex-shrink-0"
                  >
                    <span className="text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)] text-[var(--text-heading)] font-['PingFang_SC',sans-serif] whitespace-nowrap">
                      {tag.label}
                    </span>
                    {!disabled && (
                      <button
                        type="button"
                        onClick={(e) => handleTagRemove(tag.value, e)}
                        className="inline-flex items-center text-[var(--text-help)] hover:text-[var(--text-heading)] transition-colors"
                        tabIndex={-1}
                        aria-label={`移除 ${tag.label}`}
                      >
                        <X size={10} />
                      </button>
                    )}
                  </span>
                ))}
                {/* 溢出 +N... 角标 */}
                {overflowCount > 0 && (
                  <span className="inline-flex items-center px-[6px] h-[20px] rounded-[2px] bg-[var(--color-other-5)] flex-shrink-0">
                    <span className="text-[length:var(--font-caption-size)] text-[var(--text-heading)] font-['PingFang_SC',sans-serif]">
                      +{overflowCount}...
                    </span>
                  </span>
                )}
              </>
            )}

            {/* 多选空状态 placeholder */}
            {multiple && selectedValues.length === 0 && (
              <span className="text-[length:var(--font-label-size)] leading-[var(--font-label-height)] font-['PingFang_SC',sans-serif] text-[var(--text-disabled)] truncate">
                {placeholder}
              </span>
            )}

            {/* 单选未选中：placeholder */}
            {!multiple && !singleSelectedLabel && (
              <span
                className={cn(
                  "text-[length:var(--font-label-size)] leading-[var(--font-label-height)] font-['PingFang_SC',sans-serif] truncate",
                  borderless
                    ? isOpen
                      ? "text-[var(--brand-base)]"
                      : "text-[var(--text-help)] group-hover:text-[var(--brand-base)]"
                    : "text-[var(--text-disabled)]"
                )}
              >
                {placeholder}
              </span>
            )}

            {/* 单选已选中：回显文字（文本超长自动截断） */}
            {!multiple && singleSelectedLabel && (
              <span
                className={cn(
                  "text-[length:var(--font-label-size)] leading-[var(--font-label-height)] font-['PingFang_SC',sans-serif] text-[var(--text-heading)] truncate",
                  borderless && "group-hover:text-[var(--brand-base)]"
                )}
              >
                {singleSelectedLabel}
              </span>
            )}

            {/* 加载 spinner（显示在文字后方） */}
            {loading && (
              <按钮加载
                size={16}
                className="animate-spin text-[var(--text-disabled)] flex-shrink-0 ml-[var(--space-intimate)]"
              />
            )}
          </div>

          {/* 箭头图标（open/loading 时朝上） */}
          <div className="flex items-center flex-shrink-0">
            {isOpen || loading ? (
              <ChevronUp size={12} className={arrowClass} />
            ) : (
              <ChevronDown size={12} className={arrowClass} />
            )}
          </div>
        </div>

        {/* ── 下拉面板 ─────────────────────────────────────── */}
        {isOpen && (
          <div className={cn(selectDropdownVariants())}>
            {options.length === 0 ? (
              <div className="px-[var(--space-group)] h-[var(--comp-height-lg)] flex items-center text-[length:var(--font-label-size)] text-[var(--text-disabled)] font-['PingFang_SC',sans-serif]">
                暂无数据
              </div>
            ) : (
              options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <div
                    key={option.value}
                    className={cn(
                      selectOptionVariants({
                        selected: isSelected ? "yes" : "no",
                        disabled: option.disabled ? "yes" : "no",
                      })
                    )}
                    onClick={() => handleOptionClick(option.value, option.disabled)}
                  >
                    <span className="truncate flex-1">{option.label}</span>
                    {/* 多选模式：已选项显示勾选标记 */}
                    {multiple && isSelected && (
                      <Check
                        size={14}
                        className="flex-shrink-0 ml-[var(--space-tight)] text-[var(--brand-base)]"
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { selectTriggerVariants, selectOptionVariants };
