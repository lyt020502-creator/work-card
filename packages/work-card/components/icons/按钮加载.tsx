import * as React from "react";
import type { IconProps } from "./types";

// ── 按钮加载（圆弧环形加载指示器，用作按钮 Spinner）────────────
// 来源：icon/按钮加载.svg
// 结构与原 SVG 完全一致：foreignObject + conic-gradient div，以圆环路径裁切；
// 将原 SVG 硬编码白色替换为 currentColor，使其在亮/暗背景按钮下均可自适应。
// conic-gradient 起点 90deg（3点钟方向），顺时针 270° 从 25%→100% 透明度渐变，
// 余下 90° 完全透明，与原 SVG 的渐变逻辑保持一致。
export const 按钮加载 = React.forwardRef<SVGSVGElement, IconProps>(
  function 按钮加载({ size = 16, className, style, ...props }, ref) {
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
          {/* foreignObject + conic-gradient，裁切为圆环形状（与原 SVG 结构一致） */}
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
          {/* 圆环裁切路径：与 icon/按钮加载.svg 中路径完全一致 */}
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
按钮加载.displayName = "按钮加载";
