import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-裁切 ──────────────────────────────────────────────
// 来源：icon/图影音-裁切.svg
export const 图影音裁切 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音裁切({ size = 48, className, style, ...props }, ref) {
    const uid = React.useId();
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
        <mask
          id={`mask0_31_6649-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6649-${uid})`}>
          <path
            d="M11 4C11.8284 4 12.5 4.67157 12.5 5.5V9H33C36.0376 9 38.5 11.4624 38.5 14.5V36H42C42.8284 36 43.5 36.6716 43.5 37.5C43.5 38.3284 42.8284 39 42 39H38.5V42.5C38.5 43.3284 37.8284 44 37 44C36.1716 44 35.5 43.3284 35.5 42.5V39H15C11.9624 39 9.5 36.5376 9.5 33.5V12H6C5.17157 12 4.5 11.3284 4.5 10.5C4.5 9.67157 5.17157 9 6 9H9.5V5.5C9.5 4.67157 10.1716 4 11 4ZM12.5 33.5C12.5 34.8807 13.6193 36 15 36H35.5V14.5C35.5 13.1193 34.3807 12 33 12H12.5V33.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音裁切.displayName = "图影音裁切";
