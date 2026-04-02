import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-带入输入框 ────────────────────────────────────────
// 来源：icon/大模型-带入输入框.svg
export const 大模型带入输入框 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型带入输入框({ size = 48, className, style, ...props }, ref) {
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
            d="M37 6.5C40.0376 6.5 42.5 8.96243 42.5 12V36C42.5 39.0376 40.0376 41.5 37 41.5H11C7.96243 41.5 5.5 39.0376 5.5 36V12C5.5 8.96243 7.96243 6.5 11 6.5H37ZM11 9.5C9.61929 9.5 8.5 10.6193 8.5 12V36C8.5 37.3807 9.61929 38.5 11 38.5H37C38.3807 38.5 39.5 37.3807 39.5 36V12C39.5 10.6193 38.3807 9.5 37 9.5H11ZM27.5 13.5C28.3284 13.5 29 14.1716 29 15C29 15.8284 28.3284 16.5 27.5 16.5H25.5V31.5H27.5C28.3284 31.5 29 32.1716 29 33C29 33.8284 28.3284 34.5 27.5 34.5H20.5C19.6716 34.5 19 33.8284 19 33C19 32.1716 19.6716 31.5 20.5 31.5H22.5V16.5H20.5C19.6716 16.5 19 15.8284 19 15C19 14.1716 19.6716 13.5 20.5 13.5H27.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型带入输入框.displayName = "大模型带入输入框";
