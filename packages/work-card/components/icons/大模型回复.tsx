import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-回复 ──────────────────────────────────────────────
// 来源：icon/大模型-回复.svg
export const 大模型回复 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型回复({ size = 48, className, style, ...props }, ref) {
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
            d="M36.5 7.5C39.5376 7.5 42 9.96243 42 13V33C42 36.0376 39.5376 38.5 36.5 38.5H16.3711L10.1299 41.7842C7.79928 43.0108 5.00016 41.3211 5 38.6875V13C5 9.96243 7.46243 7.5 10.5 7.5H36.5ZM10.5 10.5C9.11929 10.5 8 11.6193 8 13V38.6875C8.00016 39.0635 8.39961 39.3047 8.73242 39.1299L15.083 35.7881C15.442 35.5991 15.8414 35.5 16.2471 35.5H36.5C37.8807 35.5 39 34.3807 39 33V13C39 11.6193 37.8807 10.5 36.5 10.5H10.5ZM32 26.5C32.8284 26.5 33.5 27.1716 33.5 28C33.5 28.8284 32.8284 29.5 32 29.5H23C22.1716 29.5 21.5 28.8284 21.5 28C21.5 27.1716 22.1716 26.5 23 26.5H32Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型回复.displayName = "大模型回复";
