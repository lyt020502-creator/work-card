import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-暂停 ──────────────────────────────────────────────
// 来源：icon/图影音-暂停.svg
export const 图影音暂停 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音暂停({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6546-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6546-${uid})`}>
          <path
            d="M16 8.5C16.8284 8.5 17.5 9.17157 17.5 10V38C17.5 38.8284 16.8284 39.5 16 39.5C15.1716 39.5 14.5 38.8284 14.5 38V10C14.5 9.17157 15.1716 8.5 16 8.5ZM32 8.5C32.8284 8.5 33.5 9.17157 33.5 10V38C33.5 38.8284 32.8284 39.5 32 39.5C31.1716 39.5 30.5 38.8284 30.5 38V10C30.5 9.17157 31.1716 8.5 32 8.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音暂停.displayName = "图影音暂停";
