import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-自定义 ──────────────────────────────────────────────────
// 来源：icon/大模型-自定义.svg
export const 大模型自定义 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型自定义({ size = 48, className, style, ...props }, ref) {
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
            d="M40 38.5001C40.8284 38.5001 41.5 39.1716 41.5 40.0001C41.4999 40.8284 40.8284 41.5001 40 41.5001H8C7.17162 41.5001 6.50007 40.8284 6.5 40.0001C6.5 39.1716 7.17157 38.5001 8 38.5001H40ZM28.0723 6.23638C29.0486 5.26007 30.6311 5.26007 31.6074 6.23638L37.2646 11.8926C38.241 12.8689 38.241 14.4525 37.2646 15.4288L17.0508 35.6417C16.582 36.1104 15.9462 36.3741 15.2832 36.3741H9.62695C8.24626 36.3741 7.12699 35.2548 7.12695 33.8741V28.2169C7.12704 27.554 7.38974 26.918 7.8584 26.4493L28.0723 6.23638ZM10.127 28.4239V33.3741H15.0762L34.79 13.6612L29.8398 8.71099L10.127 28.4239Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型自定义.displayName = "大模型自定义";
