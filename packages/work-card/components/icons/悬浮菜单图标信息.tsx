import * as React from "react";
import type { IconProps } from "./types";

// ── 悬浮菜单图标-信息（蓝色圆形 info 图标，用于 Alert info 变体）────
// 来源：icon/悬浮菜单图标-信息.svg → component-docs/src/components/icons/status.jsx
export const 悬浮菜单图标信息 = React.forwardRef<SVGSVGElement, IconProps>(
  function 悬浮菜单图标信息({ size = 22, className, style, ...props }, ref) {
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
        <path d="M11 19.25C15.5564 19.25 19.25 15.5564 19.25 11C19.25 6.44365 15.5564 2.75 11 2.75C6.44365 2.75 2.75 6.44365 2.75 11C2.75 15.5564 6.44365 19.25 11 19.25Z" fill="#5990FF"/>
        <path d="M11 9.51042V14.6667" stroke="white" strokeWidth="1.375" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 6.41667C11.3797 6.41667 11.6875 6.72448 11.6875 7.10417C11.6875 7.48387 11.3797 7.79167 11 7.79167C10.6203 7.79167 10.3125 7.48387 10.3125 7.10417C10.3125 6.72448 10.6203 6.41667 11 6.41667Z" fill="white"/>
      </svg>
    );
  }
);
悬浮菜单图标信息.displayName = "悬浮菜单图标信息";
