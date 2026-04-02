import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-搜索 ──────────────────────────────────────────────
// 来源：icon/大模型-搜索.svg
export const 大模型搜索 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型搜索({ size = 48, className, style, ...props }, ref) {
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
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            d="M23.499 5.91479C33.211 5.91479 41.0848 13.7878 41.085 23.4998C41.085 27.8155 39.5281 31.7669 36.9482 34.8269L41.5605 39.4392C42.146 40.0249 42.146 40.9746 41.5605 41.5603C40.9748 42.1461 40.0243 42.1461 39.4385 41.5603L34.8271 36.949C31.767 39.5291 27.815 41.0857 23.499 41.0857C13.7871 41.0856 5.91406 33.2117 5.91406 23.4998C5.9142 13.7879 13.7872 5.91494 23.499 5.91479ZM23.499 9.08569C15.5382 9.08583 9.0851 15.5389 9.08496 23.4998C9.08496 31.4607 15.5381 37.9147 23.499 37.9148C31.4601 37.9148 37.9141 31.4608 37.9141 23.4998C37.9139 15.5388 31.46 9.08569 23.499 9.08569Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型搜索.displayName = "大模型搜索";
