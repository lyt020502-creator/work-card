import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-续写 ──────────────────────────────────────────────────
// 来源：icon/大模型-续写.svg
export const 大模型续写 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型续写({ size = 48, className, style, ...props }, ref) {
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
            d="M15 34.5C15.8284 34.5 16.5 35.1716 16.5 36C16.5 36.8284 15.8284 37.5 15 37.5H7C6.17157 37.5 5.5 36.8284 5.5 36C5.5 35.1716 6.17157 34.5 7 34.5H15ZM34 20.5C34.8284 20.5 35.5 21.1716 35.5 22V27.5H41C41.8284 27.5 42.5 28.1716 42.5 29C42.5 29.8284 41.8284 30.5 41 30.5H35.5V36C35.5 36.8284 34.8284 37.5 34 37.5C33.1716 37.5 32.5 36.8284 32.5 36V30.5H27C26.1716 30.5 25.5 29.8284 25.5 29C25.5 28.1716 26.1716 27.5 27 27.5H32.5V22C32.5 21.1716 33.1716 20.5 34 20.5ZM20 22.5C20.8284 22.5 21.5 23.1716 21.5 24C21.5 24.8284 20.8284 25.5 20 25.5H7C6.17157 25.5 5.5 24.8284 5.5 24C5.5 23.1716 6.17157 22.5 7 22.5H20ZM41 10.5C41.8284 10.5 42.5 11.1716 42.5 12C42.5 12.8284 41.8284 13.5 41 13.5H7C6.17157 13.5 5.5 12.8284 5.5 12C5.5 11.1716 6.17157 10.5 7 10.5H41Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型续写.displayName = "大模型续写";
