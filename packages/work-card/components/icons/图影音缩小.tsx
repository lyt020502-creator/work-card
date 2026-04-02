import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-缩小 ──────────────────────────────────────────────
// 来源：icon/图影音-缩小.svg
export const 图影音缩小 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音缩小({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6536-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6536-${uid})`}>
          <path
            d="M11 31.5C14.0376 31.5 16.5 33.9624 16.5 37V41C16.5 41.8284 15.8284 42.5 15 42.5C14.1716 42.5 13.5 41.8284 13.5 41V37C13.5 35.6193 12.3807 34.5 11 34.5H7C6.17157 34.5 5.5 33.8284 5.5 33C5.5 32.1716 6.17157 31.5 7 31.5H11ZM41 31.5C41.8284 31.5 42.5 32.1716 42.5 33C42.5 33.8284 41.8284 34.5 41 34.5H37C35.6193 34.5 34.5 35.6193 34.5 37V41C34.5 41.8284 33.8284 42.5 33 42.5C32.1716 42.5 31.5 41.8284 31.5 41V37C31.5 33.9624 33.9624 31.5 37 31.5H41ZM15 5.5C15.8284 5.5 16.5 6.17157 16.5 7V11C16.5 14.0376 14.0376 16.5 11 16.5H7C6.17157 16.5 5.5 15.8284 5.5 15C5.5 14.1716 6.17157 13.5 7 13.5H11C12.3807 13.5 13.5 12.3807 13.5 11V7C13.5 6.17157 14.1716 5.5 15 5.5ZM33 5.5C33.8284 5.5 34.5 6.17157 34.5 7V11C34.5 12.3807 35.6193 13.5 37 13.5H41C41.8284 13.5 42.5 14.1716 42.5 15C42.5 15.8284 41.8284 16.5 41 16.5H37C33.9624 16.5 31.5 14.0376 31.5 11V7C31.5 6.17157 32.1716 5.5 33 5.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音缩小.displayName = "图影音缩小";
