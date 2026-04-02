import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-日期 ──────────────────────────────────────────────────
// 来源：icon/大模型-日期.svg
export const 大模型日期 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型日期({ size = 48, className, style, ...props }, ref) {
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
            d="M32 4.5C32.8284 4.5 33.5 5.17157 33.5 6V8.5H37C40.0376 8.5 42.5 10.9624 42.5 14V36C42.5 39.0376 40.0376 41.5 37 41.5H11C7.96243 41.5 5.5 39.0376 5.5 36V14C5.5 10.9624 7.96243 8.5 11 8.5H14.5V6C14.5 5.17157 15.1716 4.5 16 4.5C16.8284 4.5 17.5 5.17157 17.5 6V8.5H30.5V6C30.5 5.17157 31.1716 4.5 32 4.5ZM8.5 36C8.5 37.3807 9.61929 38.5 11 38.5H37C38.3807 38.5 39.5 37.3807 39.5 36V21.5H8.5V36ZM11 11.5C9.61929 11.5 8.5 12.6193 8.5 14V18.5H39.5V14C39.5 12.6193 38.3807 11.5 37 11.5H33.5V12C33.5 12.8284 32.8284 13.5 32 13.5C31.1716 13.5 30.5 12.8284 30.5 12V11.5H17.5V12C17.5 12.8284 16.8284 13.5 16 13.5C15.1716 13.5 14.5 12.8284 14.5 12V11.5H11Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型日期.displayName = "大模型日期";
