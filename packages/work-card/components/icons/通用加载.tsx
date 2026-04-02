import * as React from "react";
import type { IconProps } from "./types";

// ── 通用加载（圆弧环形加载指示器，通用灰色版，用于浅色背景下的加载状态）──
// 来源：icon/加载.svg
// 与按钮加载结构完全一致，原始色为 rgba(91,99,114,1)≈#5B6372（--text-secondary）；
// TSX 版统一替换为 currentColor，使用时搭配 text-[var(--text-secondary)] 可复现设计稿。
export const 通用加载 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用加载({ size = 16, className, style, ...props }, ref) {
    const uid = React.useId();
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        ref={ref}
        {...props}
      >
        <g clipPath={`url(#clip0-${uid})`}>
          {/* foreignObject + conic-gradient，裁切为圆环形状 */}
          <g clipPath={`url(#ring-clip-${uid})`}>
            <g transform="matrix(0.008 0 0 0.008 8 8)">
              <foreignObject x="-1000" y="-1000" width="2000" height="2000">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    background: "conic-gradient(from 90deg, color-mix(in srgb, currentColor 25%, transparent) 0deg, currentColor 270deg, transparent 270deg, color-mix(in srgb, currentColor 25%, transparent) 360deg)",
                    height: "100%",
                    width: "100%",
                  } as React.CSSProperties}
                />
              </foreignObject>
            </g>
          </g>
        </g>
        <defs>
          {/* 圆环裁切路径：外圆 r=8，内圆 r=5，圆心 (8,8) */}
          <clipPath id={`ring-clip-${uid}`}>
            <path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3Z" />
          </clipPath>
          <clipPath id={`clip0-${uid}`}>
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
);
通用加载.displayName = "通用加载";
