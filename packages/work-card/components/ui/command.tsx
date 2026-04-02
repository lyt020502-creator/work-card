// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Search } from "lucide-react";

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// Command 命令面板组件
//
// 关键语义变量速查（theme.css :root）：
//   背景色        --bg-primary (#FFFFFF) — 面板背景
//   遮罩层        --overlay-bg (rgba(17,20,26,0.5))
//   阴影          --shadow-md (0 2px 20px 0 rgba(17, 20, 26, 0.16))
//   圆角          --corner-md (8px)
//   边框色        --border-color (#DCDFE5)
//   分割线色      --divider-color (#F4F5F7)
//   文本色        --text-heading (#11141A) / --text-secondary (#5C6473)
//   禁用色        --text-disabled (#C7CDD9)
//   帮助文本      --text-help (#878D99)
//   品牌色        --brand-base (#3377FF) — 搜索图标
//   hover 背景    --bg-ghost-hover (#F7F8FA)
//   active 背景   --bg-ghost-active (#EDF0F5)
//   间距          --space-tight (8px) / --space-content (12px) / --space-group (16px)
//   字号          --font-label-size (13px) / --font-body-md-size (14px)
// ────────────────────────────────────────────────────────────
const commandVariants = cva(
  [
    "flex flex-col",
    "bg-[var(--bg-primary)]",
    "rounded-[var(--corner-md)]",
    "shadow-[var(--shadow-md)]",
    "font-['PingFang_SC',sans-serif]",
    "overflow-hidden",
  ],
  {
    variants: {
      size: {
        sm: "w-[400px] max-h-[320px]",
        md: "w-[480px] max-h-[400px]",
        lg: "w-[560px] max-h-[480px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const commandItemVariants = cva(
  [
    "relative flex items-center gap-[var(--space-tight)]",
    "w-full px-[var(--space-content)] h-[36px]",
    "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
    "font-normal whitespace-nowrap",
    "cursor-pointer select-none",
    "transition-colors duration-100",
  ],
  {
    variants: {
      disabled: {
        yes: "text-[var(--text-disabled)] cursor-not-allowed",
        no: [
          "text-[var(--text-heading)]",
          "hover:bg-[var(--bg-ghost-hover)]",
          "active:bg-[var(--bg-ghost-active)]",
        ],
      },
    },
    defaultVariants: {
      disabled: "no",
    },
  }
);

// ── Part 4: Props 类型定义 ────────────────────────────────────

interface CommandContextValue {
  search: string;
  setSearch: (value: string) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  items: { id: string; keywords?: string; disabled?: boolean }[];
  registerItem: (item: { id: string; keywords?: string; disabled?: boolean }) => void;
  unregisterItem: (id: string) => void;
}

export interface CommandProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof commandVariants> {
  /** 搜索过滤函数（自定义搜索逻辑） */
  filter?: (value: string, search: string) => boolean;
}

export interface CommandDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 控制命令面板显示/隐藏 */
  open?: boolean;
  /** 显示状态变更回调 */
  onOpenChange?: (open: boolean) => void;
}

export interface CommandInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** 值变化回调 */
  onValueChange?: (value: string) => void;
}

export interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 分组标题 */
  heading?: string;
}

export interface CommandItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  /** 唯一标识 */
  value?: string;
  /** 搜索关键词（用于过滤匹配） */
  keywords?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 选中回调 */
  onSelect?: () => void;
}

export interface CommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

// ── Part 5: 组件实现 ─────────────────────────────────────────

const CommandContext = React.createContext<CommandContextValue | null>(null);

function useCommandContext(): CommandContextValue {
  const ctx = React.useContext(CommandContext);
  if (!ctx) throw new Error("useCommandContext must be used within <Command>");
  return ctx;
}

/**
 * Command — 命令面板根容器
 * 提供搜索状态和列表项注册管理。
 */
export const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, size, children, ...props }, ref) => {
    const [search, setSearch] = React.useState("");
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [items, setItems] = React.useState<{ id: string; keywords?: string; disabled?: boolean }[]>([]);

    const registerItem = React.useCallback(
      (item: { id: string; keywords?: string; disabled?: boolean }) => {
        setItems((prev) => {
          if (prev.find((i) => i.id === item.id)) return prev;
          return [...prev, item];
        });
      },
      []
    );

    const unregisterItem = React.useCallback((id: string) => {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }, []);

    // 键盘导航
    const handleKeyDown = (e: React.KeyboardEvent) => {
      const enabledItems = items.filter((i) => !i.disabled);
      if (enabledItems.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % enabledItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + enabledItems.length) % enabledItems.length);
      }
    };

    return (
      <CommandContext.Provider
        value={{ search, setSearch, selectedIndex, setSelectedIndex, items, registerItem, unregisterItem }}
      >
        <div
          ref={ref}
          className={cn(commandVariants({ size, className }))}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </CommandContext.Provider>
    );
  }
);

Command.displayName = "Command";

/**
 * CommandDialog — 命令面板弹窗模式
 * 居中显示在遮罩层上，支持 Escape 关闭。
 */
export const CommandDialog = React.forwardRef<HTMLDivElement, CommandDialogProps>(
  ({ open = false, onOpenChange, children, className, onClick, ...props }, ref) => {
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onOpenChange?.(false);
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 flex items-start justify-center pt-[20vh]",
          "bg-[var(--overlay-bg)]",
          className
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) onOpenChange?.(false);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommandDialog.displayName = "CommandDialog";

/**
 * CommandInput — 命令搜索输入框
 * 左侧搜索图标，输入过滤列表项。
 */
export const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, placeholder = "输入命令或搜索...", onValueChange, ...props }, ref) => {
    const { search, setSearch } = useCommandContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      onValueChange?.(e.target.value);
    };

    return (
      <div className="flex items-center gap-[var(--space-tight)] px-[var(--space-content)] border-b border-[var(--border-color)]">
        <Search size={16} className="shrink-0 text-[var(--text-help)]" aria-hidden="true" />
        <input
          ref={ref}
          type="text"
          value={search}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "flex-1 h-[var(--comp-height-xl)]",
            "bg-transparent border-none outline-none",
            "text-[length:var(--font-body-md-size)] leading-[var(--font-body-md-height)]",
            "text-[var(--text-heading)]",
            "placeholder:text-[var(--text-help)]",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

CommandInput.displayName = "CommandInput";

/**
 * CommandList — 命令列表滚动容器
 */
export const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 overflow-y-auto",
          "py-[var(--space-tight)]",
          // 自定义滚动条
          "[&::-webkit-scrollbar]:w-[4px]",
          "[&::-webkit-scrollbar-thumb]:rounded-[var(--corner-pill)]",
          "[&::-webkit-scrollbar-thumb]:bg-[var(--color-gray-2)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommandList.displayName = "CommandList";

/**
 * CommandGroup — 命令分组
 */
export const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => {
    return (
      <div ref={ref} role="group" className={cn("", className)} {...props}>
        {heading && (
          <div className="px-[var(--space-content)] py-[var(--space-intimate)] text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)] text-[var(--text-help)] font-normal">
            {heading}
          </div>
        )}
        {children}
      </div>
    );
  }
);

CommandGroup.displayName = "CommandGroup";

/**
 * CommandItem — 单个命令项
 * 支持搜索过滤、键盘高亮、选中回调。
 */
export const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  (
    {
      className,
      value,
      keywords,
      disabled = false,
      onSelect,
      children,
      ...props
    },
    ref
  ) => {
    const { search, registerItem, unregisterItem } = useCommandContext();
    const id = React.useId();
    const itemId = value ?? id;

    React.useEffect(() => {
      registerItem({ id: itemId, keywords, disabled });
      return () => unregisterItem(itemId);
    }, [itemId, keywords, disabled, registerItem, unregisterItem]);

    // 搜索过滤：如果 search 非空，检查 value/keywords/children 是否包含搜索文本
    if (search) {
      const searchLower = search.toLowerCase();
      const matchTarget = [value, keywords, typeof children === "string" ? children : ""]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!matchTarget.includes(searchLower)) return null;
    }

    const handleClick = () => {
      if (disabled) return;
      onSelect?.();
    };

    return (
      <div
        ref={ref}
        role="option"
        aria-disabled={disabled}
        data-value={value}
        className={cn(
          commandItemVariants({ disabled: disabled ? "yes" : "no" }),
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommandItem.displayName = "CommandItem";

/**
 * CommandSeparator — 命令列表分割线
 */
export const CommandSeparator = React.forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("h-px mx-[var(--space-content)] my-[var(--space-intimate)] bg-[var(--divider-color)]", className)}
        {...props}
      />
    );
  }
);

CommandSeparator.displayName = "CommandSeparator";

/**
 * CommandEmpty — 搜索无结果时的空状态提示
 */
export const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center",
          "py-[var(--space-section)]",
          "text-[length:var(--font-label-size)] leading-[var(--font-label-height)]",
          "text-[var(--text-help)]",
          className
        )}
        {...props}
      >
        {children ?? "没有找到结果"}
      </div>
    );
  }
);

CommandEmpty.displayName = "CommandEmpty";

/**
 * CommandShortcut — 命令项右侧快捷键提示
 */
export const CommandShortcut = React.forwardRef<HTMLSpanElement, CommandShortcutProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "ml-auto",
          "text-[length:var(--font-caption-size)] leading-[var(--font-caption-height)]",
          "text-[var(--text-help)]",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

CommandShortcut.displayName = "CommandShortcut";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { commandVariants, commandItemVariants };
