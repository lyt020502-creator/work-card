import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-缩写 ──────────────────────────────────────────────────
// 来源：icon/大模型-缩写.svg
export const 大模型缩写 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型缩写({ size = 48, className, style, ...props }, ref) {
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
            d="M27.3525 27.7432C28.0021 27.1912 29 27.6525 29 28.5049V30.5H41C41.8284 30.5 42.5 31.1716 42.5 32C42.5 32.8284 41.8284 33.5 41 33.5H29V35.4941C29 36.3463 28.0021 36.8083 27.3525 36.2568L23.2393 32.7617C22.7696 32.3624 22.7695 31.6366 23.2393 31.2373L27.3525 27.7432ZM18 30.5C18.8284 30.5 19.5 31.1716 19.5 32C19.5 32.8284 18.8284 33.5 18 33.5H7C6.17157 33.5 5.5 32.8284 5.5 32C5.5 31.1716 6.17157 30.5 7 30.5H18ZM41 14.5C41.8284 14.5 42.5 15.1716 42.5 16C42.5 16.8284 41.8284 17.5 41 17.5H7C6.17157 17.5 5.5 16.8284 5.5 16C5.5 15.1716 6.17157 14.5 7 14.5H41Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型缩写.displayName = "大模型缩写";
