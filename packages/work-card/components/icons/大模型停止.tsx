import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-停止 ──────────────────────────────────────────────
// 来源：icon/大模型-停止.svg
export const 大模型停止 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型停止({ size = 48, className, style, ...props }, ref) {
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
          <path d="M48 0L48 48L1.70663e-06 48L3.8147e-06 -2.10806e-06L48 0Z" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            d="M24 4.5C34.7696 4.5 43.5 13.2304 43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5ZM24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 33.1127 14.8873 40.5 24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 14.8873 33.1127 7.5 24 7.5ZM32 22.5C32.8284 22.5 33.5 23.1716 33.5 24C33.5 24.8284 32.8284 25.5 32 25.5H16C15.1716 25.5 14.5 24.8284 14.5 24C14.5 23.1716 15.1716 22.5 16 22.5H32Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型停止.displayName = "大模型停止";
