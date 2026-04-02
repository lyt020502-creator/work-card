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
// Figma 实测值 → Token 映射（node-id=51-1202）：
//   默认文字头像背景  #B0B8CF ── 无对应语义 token（IM 头像专用灰蓝色），
//                              通过 CSS 自定义属性 --avatar-bg 注入，fallback 直接写 #B0B8CF
//   品牌蓝背景       rgba(51,119,255,1) → --brand-base
//   橙色背景         rgba(255,170,51,1) = #FFAA33（预设色，无 token，调用方传入 color prop）
//   白色文字/图标    → --bg-primary
//   头像组溢出背景   rgba(242,244,247,1) → --bg-secondary
//   头像组溢出文字   rgba(135,141,153,1) → --text-help
//   头像组白色边框   rgba(255,255,255,1) → --bg-primary
//
// 尺寸系统（Figma "大小和形状" 实测）：
//   xs  16px │ sm  24px │ md  32px（默认）│ lg  44px │ xl  86px
//
// 形状系统：
//   circle（默认）: rounded-full
//   square        : rounded-[var(--corner-md)] = 8px
//
// 交互态（"交互按钮" 章节）：
//   hover  : brightness-90（10% 变暗）
//   active : brightness-75（25% 变暗）
// ────────────────────────────────────────────────────────────

const avatarVariants = cva(
  [
    // 布局：始终居中（文字/图标）
    "relative inline-flex items-center justify-center",
    // 裁剪超出圆角的内容（图片 object-fit 需配合）
    "overflow-hidden select-none shrink-0",
    // 排版基础（文字头像用）
    "font-['PingFang_SC',sans-serif] font-bold",
    "text-[var(--bg-primary)]",
    // 背景默认值：通过 --avatar-bg CSS 自定义属性注入（调用方设置），
    // fallback #B0B8CF 是 Figma IM 头像默认背景，无对应语义 token
    "bg-[var(--avatar-bg,#B0B8CF)]",
  ],
  {
    variants: {
      size: {
        /** xs — 16px，图标/图片使用场景 */
        xs: "w-[16px] h-[16px]",
        /** sm — 24px */
        sm: "w-[24px] h-[24px]",
        /** md（默认）— 32px，Figma "默认大小32px" */
        md: "w-[32px] h-[32px]",
        /** lg — 44px */
        lg: "w-[44px] h-[44px]",
        /** xl — 86px */
        xl: "w-[86px] h-[86px]",
      },
      shape: {
        /** circle（默认）— 完整圆形 */
        circle: "rounded-full",
        /** square — 圆角矩形，圆角 8px（--corner-md）*/
        square: "rounded-[var(--corner-md)]",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

/**
 * avatarGroupVariants — AvatarGroup 容器的 cva
 * 负责子项的错位叠放：sm(-4px overlap) / md(-6px overlap)
 */
const avatarGroupVariants = cva("flex flex-row items-center", {
  variants: {
    size: {
      /**
       * sm — 20px 头像，4px 叠放间距，2px 白色边框
       * Figma 头像组"小尺寸"实测：left 每项 +16px → 20-16=4px overlap
       */
      sm: "[&>*+*]:-ml-1",
      /**
       * md（默认）— 30px 头像，6px 叠放间距，3px 白色边框
       * Figma 头像组"正常尺寸"实测：left 每项 +24px → 30-24=6px overlap
       */
      md: "[&>*+*]:-ml-1.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// ── 字体自动缩放辅助函数 ──────────────────────────────────────
// Figma "自动调整字体大小" 章节实测（32px 容器）：
//   ≤3 字符: 13px (--font-label-size)
//    4 字符: 10px（无对应 token）
//   ≥5 字符:  7px（无对应 token）
// 其他尺寸按 sizePx/32 等比缩放，最小 7px
function getTextFontSize(sizePx: number, textLength: number): number {
  const scale = sizePx / 32;
  let base: number;
  if (textLength <= 3) base = 13;
  else if (textLength === 4) base = 10;
  else base = 7;
  return Math.max(7, Math.round(base * scale));
}

// 头像尺寸 → px 映射
const SIZE_PX_MAP: Record<string, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 44,
  xl: 86,
};

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** 头像图片 URL；存在时渲染 <img> 并覆盖文字/图标内容 */
  src?: string;
  /** 图片的 alt 属性（仅 src 存在时生效） */
  alt?: string;
  /** 图标节点（优先级低于 src，高于文字 children） */
  icon?: React.ReactNode;
  /**
   * 背景色（CSS 颜色值，如 `"#3377FF"` 或 `"var(--brand-base)"`）
   * 仅对文字/图标头像生效；默认 #B0B8CF（Figma IM 头像默认背景）
   */
  color?: string;
  /**
   * 是否可交互（显示手型光标，添加 hover/active 亮度效果）
   * 对应 Figma "交互按钮" 章节
   */
  interactive?: boolean;
}

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroupVariants> {
  /**
   * 最多显示的头像数量，超出部分显示 "+N" 徽标
   * 默认 7
   */
  maxCount?: number;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size = "md",
      shape,
      src,
      alt,
      icon,
      color,
      interactive = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const sizePx = SIZE_PX_MAP[size ?? "md"] ?? 32;

    // 计算文字自适应字号（仅 children 为字符串时生效）
    const textContent = typeof children === "string" ? children : null;
    const fontSize = textContent
      ? getTextFontSize(sizePx, textContent.length)
      : undefined;

    // 图标/图片内嵌尺寸 ≈ 容器的 50%（对齐 Figma icon avatar：32px 容器 → 16px 图标）
    const innerSize = Math.max(8, Math.round(sizePx * 0.5));

    return (
      <div
        ref={ref}
        className={cn(
          avatarVariants({ size, shape, className }),
          interactive &&
            "cursor-pointer hover:brightness-90 active:brightness-75 transition-[filter] duration-150"
        )}
        style={{
          // 通过 CSS 自定义属性覆盖 bg-[var(--avatar-bg,#B0B8CF)]
          // 仅在无图片时设置背景（图片会自然覆盖）
          ...(color && !src
            ? ({ "--avatar-bg": color } as React.CSSProperties)
            : {}),
          ...style,
        }}
        {...props}
      >
        {src ? (
          /* 图片头像：铺满容器 */
          <img
            src={src}
            alt={alt ?? ""}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : icon ? (
          /* 图标头像：图标居中，尺寸为容器的 50% */
          <span
            className="inline-flex items-center justify-center"
            style={{ width: innerSize, height: innerSize }}
            aria-hidden="true"
          >
            {icon}
          </span>
        ) : textContent ? (
          /* 文字头像：字号自动缩放 */
          <span
            className="leading-none whitespace-nowrap"
            style={{ fontSize }}
            aria-label={textContent}
          >
            {textContent}
          </span>
        ) : (
          /* 自定义内容透传 */
          children
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

// ── AvatarGroup ──────────────────────────────────────────────

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, size = "md", maxCount = 7, children, ...props }, ref) => {
    const items = React.Children.toArray(children);
    const visibleItems = items.slice(0, maxCount);
    const overflowCount = Math.max(0, items.length - maxCount);

    // 尺寸参数
    const itemPx = size === "sm" ? 20 : 30;
    const borderPx = size === "sm" ? 2 : 3;
    // "+N" 徽标字号
    const badgeFontSize = size === "sm" ? 10 : 12;

    return (
      <div
        ref={ref}
        className={cn(avatarGroupVariants({ size, className }))}
        {...props}
      >
        {visibleItems.map((child, index) => (
          <div
            key={index}
            className="rounded-full overflow-hidden shrink-0 box-border"
            style={{
              width: itemPx,
              height: itemPx,
              // 白色边框将头像分隔（--bg-primary = #FFFFFF）
              border: `${borderPx}px solid var(--bg-primary)`,
              // Figma 叠放顺序：越靠右的头像层级越高（后渲染元素在上）
              zIndex: index + 1,
            }}
          >
            {React.isValidElement(child)
              ? React.cloneElement(
                  child as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
                  {
                    // child 自带的 w-[32px] h-[32px] 必须被覆盖，w-full h-full 放在最后
                    // twMerge 遇到冲突时以最后出现的类为准
                    className: cn(
                      (child as React.ReactElement<{ className?: string }>).props
                        ?.className,
                      "w-full h-full"
                    ),
                  }
                )
              : child}
          </div>
        ))}

        {/* 溢出计数徽标 "+N" */}
        {overflowCount > 0 && (
          <div
            className={cn(
              "rounded-full shrink-0 box-border",
              "flex items-center justify-center",
              // bg-secondary (#F2F4F7) + text-help (#878D99) + font-medium
              "bg-[var(--bg-secondary)]",
              "text-[var(--text-help)]",
              "font-['PingFang_SC',sans-serif] font-medium"
            )}
            style={{
              width: itemPx,
              height: itemPx,
              border: `${borderPx}px solid var(--bg-primary)`,
              fontSize: badgeFontSize,
              // "+N" 徽标位于最上层，确保描边与背景整体可见
              zIndex: visibleItems.length + 1,
            }}
            aria-label={`另外 ${overflowCount} 人`}
          >
            +{overflowCount}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { avatarVariants, avatarGroupVariants };
