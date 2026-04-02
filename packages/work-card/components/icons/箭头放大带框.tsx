import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-放大-带框（方形边框内放大箭头图标）──────────────────────
// 来源：icon/箭头-放大-带框.svg
export const 箭头放大带框 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头放大带框({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5680-${uid}`}
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
              fill="#D9D9D9"
            />
          </mask>
          <g mask={`url(#mask0_31_5680-${uid})`}>
            <path
              d="M37 5.5C40.0376 5.5 42.5 7.96243 42.5 11V37C42.5 40.0376 40.0376 42.5 37 42.5H11C7.96243 42.5 5.5 40.0376 5.5 37V11C5.5 7.96243 7.96243 5.5 11 5.5H37ZM11 8.5C9.61929 8.5 8.5 9.61929 8.5 11V37C8.5 38.3807 9.61929 39.5 11 39.5H37C38.3807 39.5 39.5 38.3807 39.5 37V11C39.5 9.61929 38.3807 8.5 37 8.5H11ZM12 26.5C12.8284 26.5 13.5 27.1716 13.5 28V34.5H20C20.8284 34.5 21.5 35.1716 21.5 36C21.5 36.8284 20.8284 37.5 20 37.5H13C11.6193 37.5 10.5 36.3807 10.5 35V28C10.5 27.1716 11.1716 26.5 12 26.5ZM35 10.5C36.3807 10.5 37.5 11.6193 37.5 13V20C37.5 20.8284 36.8284 21.5 36 21.5C35.1716 21.5 34.5 20.8284 34.5 20V13.5H28C27.1716 13.5 26.5 12.8284 26.5 12C26.5 11.1716 27.1716 10.5 28 10.5H35Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头放大带框.displayName = "箭头放大带框";
