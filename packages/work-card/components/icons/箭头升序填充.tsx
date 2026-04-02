import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-升序-填充（实心上箭头，用于排序升序指示）──────────────────
// 来源：icon/箭头-升序-填充.svg
export const 箭头升序填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头升序填充({ size = 48, className, style, ...props }, ref) {
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
          d="M33.7627 20C35.4526 19.9997 36.38 18.0331 35.3056 16.7285L25.5439 4.875C24.7439 3.90355 23.256 3.90355 22.456 4.875L12.6943 16.7285C11.6198 18.0333 12.548 20 14.2382 20H20V42C20 43.1045 20.8955 43.9999 22 44H26C27.1045 44 28 43.1046 28 42V20H33.7627Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
箭头升序填充.displayName = "箭头升序填充";
