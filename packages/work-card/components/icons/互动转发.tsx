import * as React from "react";
import type { IconProps } from "./types";

// ── 互动转发（转发/外链图标）──────────────────────────────────
// 来源：icon/互动-转发.svg
export const 互动转发 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动转发({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5790-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect x="48" y="5.91284e-06" width="48" height="48" transform="rotate(90 48 5.91284e-06)" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5790-${uid})`}>
            <path
              d="M6.5 12.5C6.5 9.46244 8.96243 7.00001 12 7.00001L24 7.00001C24.8284 7.00001 25.5 7.67158 25.5 8.50001C25.5 9.32843 24.8284 10 24 10L12 10C10.6193 10 9.5 11.1193 9.5 12.5L9.5 35.5C9.5 36.8807 10.6193 38 12 38L36 38C37.3807 38 38.5 36.8807 38.5 35.5L38.5 23.5C38.5 22.6716 39.1716 22 40 22C40.8284 22 41.5 22.6716 41.5 23.5L41.5 35.5C41.5 38.5376 39.0376 41 36 41L12 41C8.96244 41 6.5 38.5376 6.5 35.5L6.5 12.5ZM24.9395 23.5606C24.3537 22.9748 24.3537 22.0252 24.9395 21.4395L36.3789 10L32 10C31.1716 10 30.5 9.32843 30.5 8.5C30.5 7.67158 31.1716 7 32 7L40 7C40.8284 7 41.5 7.67158 41.5 8.5L41.5 16.5C41.5 17.3284 40.8284 18 40 18C39.1716 18 38.5 17.3284 38.5 16.5L38.5 12.1211L27.0605 23.5606C26.4748 24.1463 25.5252 24.1463 24.9395 23.5606Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
互动转发.displayName = "互动转发";
