import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-放大 ──────────────────────────────────────────────
// 来源：icon/图影音-放大.svg
export const 图影音放大 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音放大({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6506-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect width="48" height="48" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6506-${uid})`}>
          <path
            d="M7.5 30C8.32843 30 9 30.6716 9 31.5V35.5C9 36.8807 10.1193 38 11.5 38H15.5C16.3284 38 17 38.6716 17 39.5C17 40.3284 16.3284 41 15.5 41H11.5C8.46243 41 6 38.5376 6 35.5V31.5C6 30.6716 6.67157 30 7.5 30ZM40.5 30C41.3284 30 42 30.6716 42 31.5V35.5C42 38.5376 39.5376 41 36.5 41H32.5C31.6716 41 31 40.3284 31 39.5C31 38.6716 31.6716 38 32.5 38H36.5C37.8807 38 39 36.8807 39 35.5V31.5C39 30.6716 39.6716 30 40.5 30ZM15.5 6.5C16.3284 6.5 17 7.17157 17 8C17 8.82843 16.3284 9.5 15.5 9.5H11.5C10.1193 9.5 9 10.6193 9 12V16C9 16.8284 8.32843 17.5 7.5 17.5C6.67157 17.5 6 16.8284 6 16V12C6 8.96243 8.46243 6.5 11.5 6.5H15.5ZM36.5 6.5C39.5376 6.5 42 8.96243 42 12V16C42 16.8284 41.3284 17.5 40.5 17.5C39.6716 17.5 39 16.8284 39 16V12C39 10.6193 37.8807 9.5 36.5 9.5H32.5C31.6716 9.5 31 8.82843 31 8C31 7.17157 31.6716 6.5 32.5 6.5H36.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音放大.displayName = "图影音放大";
