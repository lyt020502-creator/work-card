import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-缩小-带框（方形边框内缩小箭头图标）──────────────────────
// 来源：icon/箭头-缩小-带框.svg
export const 箭头缩小带框 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头缩小带框({ size = 48, className, style, ...props }, ref) {
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
        <g>
          <mask
            id={`mask0_31_5703-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect
              x="48"
              width="48"
              height="48"
              transform="rotate(90 48 0)"
              fill="#FF0606"
            />
          </mask>
          <g mask={`url(#mask0_31_5703-${uid})`}>
            <path
              d="M37 5.5C40.0376 5.5 42.5 7.96243 42.5 11V37C42.5 40.0376 40.0376 42.5 37 42.5H11C7.96243 42.5 5.5 40.0376 5.5 37V11C5.5 7.96243 7.96243 5.5 11 5.5H37ZM11 8.5C9.61929 8.5 8.5 9.61929 8.5 11V37C8.5 38.3807 9.61929 39.5 11 39.5H37C38.3807 39.5 39.5 38.3807 39.5 37V11C39.5 9.61929 38.3807 8.5 37 8.5H11ZM21 24.5C22.3807 24.5 23.5 25.6193 23.5 27V34C23.5 34.8284 22.8284 35.5 22 35.5C21.1716 35.5 20.5 34.8284 20.5 34V27.5H14C13.1716 27.5 12.5 26.8284 12.5 26C12.5 25.1716 13.1716 24.5 14 24.5H21ZM26 12.5C26.8284 12.5 27.5 13.1716 27.5 14V20.5H34C34.8284 20.5 35.5 21.1716 35.5 22C35.5 22.8284 34.8284 23.5 34 23.5H27C25.6193 23.5 24.5 22.3807 24.5 21V14C24.5 13.1716 25.1716 12.5 26 12.5Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头缩小带框.displayName = "箭头缩小带框";
