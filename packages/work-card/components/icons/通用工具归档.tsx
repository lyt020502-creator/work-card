import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具归档（归档/盒子图标）──────────────────────────────────
// 来源：icon/通用工具-归档.svg
export const 通用工具归档 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具归档({ size = 48, className, style, ...props }, ref) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        ref={ref}
        {...props}
      >
        <path
          d="M38 6.5C41.0376 6.5 43.5 8.96243 43.5 12C43.5 14.137 42.2804 15.9879 40.5 16.8984V36C40.5 39.0376 38.0376 41.5 35 41.5H13C9.96243 41.5 7.5 39.0376 7.5 36V16.8984C5.71957 15.9879 4.5 14.137 4.5 12C4.5 8.96243 6.96243 6.5 10 6.5H38ZM10.5 17.5V36C10.5 37.3807 11.6193 38.5 13 38.5H35C36.3807 38.5 37.5 37.3807 37.5 36V17.5H10.5ZM30 27.5C30.8284 27.5 31.5 28.1716 31.5 29C31.5 29.8284 30.8284 30.5 30 30.5H18C17.1716 30.5 16.5 29.8284 16.5 29C16.5 28.1716 17.1716 27.5 18 27.5H30ZM10 9.5C8.61929 9.5 7.5 10.6193 7.5 12C7.5 13.3807 8.61929 14.5 10 14.5H38C39.3807 14.5 40.5 13.3807 40.5 12C40.5 10.6193 39.3807 9.5 38 9.5H10Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
通用工具归档.displayName = "通用工具归档";
