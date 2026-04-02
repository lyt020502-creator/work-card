import * as React from "react";
import type { IconProps } from "./types";

// ── 悬浮菜单图标-成功（绿色圆形 success 图标，用于 Alert success 变体）
// 来源：icon/悬浮菜单图标-成功.svg → component-docs/src/components/icons/status.jsx
export const 悬浮菜单图标成功 = React.forwardRef<SVGSVGElement, IconProps>(
  function 悬浮菜单图标成功({ size = 22, className, style, ...props }, ref) {
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
        <path d="M11 2.75C15.5563 2.75 19.25 6.44365 19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C6.44365 19.25 2.75 15.5563 2.75 11C2.75 6.44365 6.44365 2.75 11 2.75Z" fill="#4AD46C"/>
        <path d="M7.85156 10.7547L10.466 13.4884" stroke="white" strokeWidth="1.375" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.7598 9.16666L10.4656 13.4883" stroke="white" strokeWidth="1.375" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
);
悬浮菜单图标成功.displayName = "悬浮菜单图标成功";
