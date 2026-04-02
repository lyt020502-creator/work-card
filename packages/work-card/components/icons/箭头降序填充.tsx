import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-降序-填充（实心下箭头，用于排序降序指示）──────────────────
// 来源：icon/箭头-降序-填充.svg
export const 箭头降序填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头降序填充({ size = 48, className, style, ...props }, ref) {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.7627 28C35.4526 28.0003 36.38 29.9669 35.3056 31.2715L25.5439 43.125C24.7439 44.0964 23.256 44.0964 22.456 43.125L12.6943 31.2715C11.6198 29.9667 12.548 28 14.2382 28H20V6C20 4.8955 20.8955 4.00012 22 4H26C27.1045 4 28 4.89543 28 6V28H33.7627Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
箭头降序填充.displayName = "箭头降序填充";
