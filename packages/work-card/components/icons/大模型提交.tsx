import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-提交 ──────────────────────────────────────────────
// 来源：icon/大模型-提交.svg
export const 大模型提交 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型提交({ size = 48, className, style, ...props }, ref) {
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
            d="M8.5 11C8.5 8.79086 10.2909 7 12.5 7H27.9029C28.9283 7 29.9145 7.39377 30.6579 8.1L38.255 15.3172C39.0499 16.0724 39.5 17.1208 39.5 18.2172V37C39.5 39.2091 37.7091 41 35.5 41H12.5C10.2909 41 8.5 39.2091 8.5 37V11Z"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M24 21V32.5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M30 8V14C30 15.6569 31.3431 17 33 17H38"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M30.3643 26.5L24.3539 20.4896C24.1586 20.2943 23.842 20.2943 23.6467 20.4896L17.6363 26.5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </svg>
    );
  }
);
大模型提交.displayName = "大模型提交";
