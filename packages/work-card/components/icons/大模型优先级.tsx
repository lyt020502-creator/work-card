import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-优先级 ────────────────────────────────────────────
// 来源：icon/大模型-优先级.svg
export const 大模型优先级 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型优先级({ size = 48, className, style, ...props }, ref) {
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
          <path d="M0 0H48V48H0V0Z" fill="#D9D9D9" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.0127 7.37098C17.4633 5.45396 22.5542 5.72904 26.7725 8.11415C30.1161 10.0048 34.1438 10.2527 37.6943 8.787L37.8115 8.73915C39.0923 8.21045 40.4999 9.15146 40.5 10.537V28.7831C40.5 29.58 40.0197 30.2993 39.2832 30.6034L38.8389 30.786C34.4362 32.6034 29.442 32.2955 25.2959 29.9511C21.8941 28.0277 17.7883 27.8065 14.1992 29.3524L12.5 30.0839V40.4999H14C14.8284 40.4999 15.4999 41.1716 15.5 41.9999C15.5 42.8283 14.8284 43.4999 14 43.4999H8C7.17157 43.4999 6.5 42.8283 6.5 41.9999C6.50012 41.1716 7.17164 40.4999 8 40.4999H9.5V7.99989C9.50011 7.17156 10.1716 6.49989 11 6.49989C11.6948 6.49989 12.2767 6.97308 12.4473 7.61415L13.0127 7.37098ZM25.2959 10.7255C21.8941 8.80205 17.7883 8.57989 14.1992 10.1259L12.5 10.8583V26.8173L13.0127 26.5966C17.4632 24.6796 22.5542 24.9547 26.7725 27.3397C30.0552 29.196 33.9974 29.4694 37.5 28.0917V12.0429C33.4446 13.296 29.0268 12.8351 25.2959 10.7255Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型优先级.displayName = "大模型优先级";
