import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-提示 ──────────────────────────────────────────────
// 来源：icon/大模型-提示.svg
export const 大模型提示 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型提示({ size = 48, className, style, ...props }, ref) {
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
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            d="M24 4.5C34.7696 4.5 43.5 13.2304 43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5ZM24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 33.1127 14.8873 40.5 24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 14.8873 33.1127 7.5 24 7.5ZM24 31C24.8284 31 25.5 31.6716 25.5 32.5V33.5C25.5 34.3284 24.8284 35 24 35C23.1716 35 22.5 34.3284 22.5 33.5V32.5C22.5 31.6716 23.1716 31 24 31ZM24 13C24.8284 13 25.5 13.6716 25.5 14.5V26.5C25.5 27.3284 24.8284 28 24 28C23.1716 28 22.5 27.3284 22.5 26.5V14.5C22.5 13.6716 23.1716 13 24 13Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型提示.displayName = "大模型提示";
