import * as React from "react";
import type { IconProps } from "./types";

// ── 悬浮菜单图标-危险（红色三角形 error 图标，用于 Alert error 变体）─
// 来源：icon/悬浮菜单图标-危险.svg → component-docs/src/components/icons/status.jsx
export const 悬浮菜单图标危险 = React.forwardRef<SVGSVGElement, IconProps>(
  function 悬浮菜单图标危险({ size = 22, className, style, ...props }, ref) {
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
        <path d="M8.61801 4.58334C9.67648 2.75 12.3227 2.75 13.3811 4.58334L18.9381 14.2083C19.9966 16.0417 18.6735 18.3333 16.5566 18.3333H5.44258C3.32563 18.3333 2.00253 16.0417 3.06101 14.2083L8.61801 4.58334Z" fill="#FF7E73"/>
        <path d="M11 12.4896V7.33334" stroke="white" strokeWidth="1.375" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 15.5833C11.3797 15.5833 11.6875 15.2755 11.6875 14.8958C11.6875 14.5161 11.3797 14.2083 11 14.2083C10.6203 14.2083 10.3125 14.5161 10.3125 14.8958C10.3125 15.2755 10.6203 15.5833 11 15.5833Z" fill="white"/>
      </svg>
    );
  }
);
悬浮菜单图标危险.displayName = "悬浮菜单图标危险";
