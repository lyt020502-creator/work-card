import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-减号 ──────────────────────────────────────────────
// 来源：icon/大模型-减号.svg
export const 大模型减号 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型减号({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect width="48" height="48" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.5 24C5.5 23.1716 6.17157 22.5 7 22.5H41C41.8284 22.5 42.5 23.1716 42.5 24C42.5 24.8284 41.8284 25.5 41 25.5H7C6.17157 25.5 5.5 24.8284 5.5 24Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型减号.displayName = "大模型减号";
