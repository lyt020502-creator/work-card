import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-阅读 ──────────────────────────────────────────────────
// 来源：icon/大模型-阅读.svg
export const 大模型阅读 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型阅读({ size = 48, className, style, ...props }, ref) {
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
            d="M30 5.5C33.0376 5.5 35.5 7.96243 35.5 11V16.5H38C41.0376 16.5 43.5 18.9624 43.5 22V37C43.5 40.0376 41.0376 42.5 38 42.5H10C6.96243 42.5 4.5 40.0376 4.5 37V11C4.5 7.96243 6.96243 5.5 10 5.5H30ZM35.5 37C35.5 37.9005 35.2821 38.7497 34.8984 39.5H38C39.3807 39.5 40.5 38.3807 40.5 37V22C40.5 20.6193 39.3807 19.5 38 19.5H35.5V37ZM10 8.5C8.61929 8.5 7.5 9.61929 7.5 11V37C7.5 38.3807 8.61929 39.5 10 39.5H30C31.3807 39.5 32.5 38.3807 32.5 37V11C32.5 9.61929 31.3807 8.5 30 8.5H10ZM19 22.5C19.8284 22.5 20.5 23.1716 20.5 24C20.5 24.8284 19.8284 25.5 19 25.5H13C12.1716 25.5 11.5 24.8284 11.5 24C11.5 23.1716 12.1716 22.5 13 22.5H19ZM25 16.5C25.8284 16.5 26.5 17.1716 26.5 18C26.5 18.8284 25.8284 19.5 25 19.5H13C12.1716 19.5 11.5 18.8284 11.5 18C11.5 17.1716 12.1716 16.5 13 16.5H25Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型阅读.displayName = "大模型阅读";
