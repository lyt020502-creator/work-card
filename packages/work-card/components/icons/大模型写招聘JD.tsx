import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-写招聘JD ──────────────────────────────────────────
// 来源：icon/大模型-写招聘JD.svg
export const 大模型写招聘JD = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型写招聘JD({ size = 48, className, style, ...props }, ref) {
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
            d="M29.5 5.5C32.5376 5.5 35 7.96243 35 11V12.5H37.5C40.5376 12.5 43 14.9624 43 18V37C43 40.0376 40.5376 42.5 37.5 42.5H10.5C7.46243 42.5 5 40.0376 5 37V18C5 14.9624 7.46243 12.5 10.5 12.5H13V11C13 7.96243 15.4624 5.5 18.5 5.5H29.5ZM10.5 15.5C9.11929 15.5 8 16.6193 8 18V37C8 38.3807 9.11929 39.5 10.5 39.5H37.5C38.8807 39.5 40 38.3807 40 37V18C40 16.6193 38.8807 15.5 37.5 15.5H10.5ZM29.5 22.5C30.3284 22.5 31 23.1716 31 24C31 24.8284 30.3284 25.5 29.5 25.5H18.5C17.6716 25.5 17 24.8284 17 24C17 23.1716 17.6716 22.5 18.5 22.5H29.5ZM18.5 8.5C17.1193 8.5 16 9.61929 16 11V12.5H32V11C32 9.61929 30.8807 8.5 29.5 8.5H18.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型写招聘JD.displayName = "大模型写招聘JD";
