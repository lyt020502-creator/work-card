import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-扩写 ──────────────────────────────────────────────
// 来源：icon/大模型-扩写.svg
export const 大模型扩写 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型扩写({ size = 48, className, style, ...props }, ref) {
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
          <path d="M0 0H48V48H0V0Z" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            d="M36 32.5049C36 31.6525 36.9979 31.1912 37.6475 31.7432L41.7607 35.2373C42.2305 35.6366 42.2304 36.3624 41.7607 36.7617L37.6475 40.2568C36.9979 40.8083 36 40.3463 36 39.4941V37.5H25C24.1716 37.5 23.5 36.8284 23.5 36C23.5 35.1716 24.1716 34.5 25 34.5H36V32.5049ZM18 34.5C18.8284 34.5 19.5 35.1716 19.5 36C19.5 36.8284 18.8284 37.5 18 37.5H7C6.17157 37.5 5.5 36.8284 5.5 36C5.5 35.1716 6.17157 34.5 7 34.5H18ZM41 22.5C41.8284 22.5 42.5 23.1716 42.5 24C42.5 24.8284 41.8284 25.5 41 25.5H7C6.17157 25.5 5.5 24.8284 5.5 24C5.5 23.1716 6.17157 22.5 7 22.5H41ZM41 10.5C41.8284 10.5 42.5 11.1716 42.5 12C42.5 12.8284 41.8284 13.5 41 13.5H7C6.17157 13.5 5.5 12.8284 5.5 12C5.5 11.1716 6.17157 10.5 7 10.5H41Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型扩写.displayName = "大模型扩写";
