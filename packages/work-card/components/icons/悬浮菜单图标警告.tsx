import * as React from "react";
import type { IconProps } from "./types";

// ── 悬浮菜单图标-警告（橙色圆形 warning 图标，用于 Alert warning 变体）
// 来源：icon/悬浮菜单图标-警告.svg → component-docs/src/components/icons/status.jsx
export const 悬浮菜单图标警告 = React.forwardRef<SVGSVGElement, IconProps>(
  function 悬浮菜单图标警告({ size = 22, className, style, ...props }, ref) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        ref={ref}
        {...props}
      >
        <path d="M11 2.75C15.5563 2.75 19.25 6.44365 19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C6.44365 19.25 2.75 15.5563 2.75 11C2.75 6.44365 6.44365 2.75 11 2.75Z" fill="#FFAA33"/>
        <path d="M11 12.4896V7.33334" stroke="white" strokeWidth="1.375" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 15.5833C11.3797 15.5833 11.6875 15.2755 11.6875 14.8958C11.6875 14.5161 11.3797 14.2083 11 14.2083C10.6203 14.2083 10.3125 14.5161 10.3125 14.8958C10.3125 15.2755 10.6203 15.5833 11 15.5833Z" fill="white"/>
      </svg>
    );
  }
);
悬浮菜单图标警告.displayName = "悬浮菜单图标警告";
