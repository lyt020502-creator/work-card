import * as React from "react";
import type { IconProps } from "./types";

// ── 互动我执行的（勾选任务图标）──────────────────────────────
// 来源：icon/互动-我执行的.svg
export const 互动我执行的 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动我执行的({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5698-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect x="48" y="5.91284e-06" width="48" height="48" transform="rotate(90 48 5.91284e-06)" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5698-${uid})`}>
            <path
              d="M6.5 12.5C6.5 9.46244 8.96243 7.00001 12 7.00001L24 7.00001C24.8284 7.00001 25.5 7.67158 25.5 8.50001C25.5 9.32843 24.8284 10 24 10L12 10C10.6193 10 9.5 11.1193 9.5 12.5L9.5 35.5C9.5 36.8807 10.6193 38 12 38L36 38C37.3807 38 38.5 36.8807 38.5 35.5L38.5 23.5C38.5 22.6716 39.1716 22 40 22C40.8284 22 41.5 22.6716 41.5 23.5L41.5 35.5C41.5 38.5376 39.0376 41 36 41L12 41C8.96244 41 6.5 38.5376 6.5 35.5L6.5 12.5ZM18.0391 18.8887C17.4533 18.3029 17.4533 17.3534 18.0391 16.7676C18.6249 16.1818 19.5744 16.1818 20.1602 16.7676L26.1709 22.7783L37.8379 11.1104C38.4236 10.5248 39.3732 10.5249 39.959 11.1104C40.5448 11.6961 40.5448 12.6466 39.959 13.2324L27.9385 25.2529C26.9623 26.2291 25.3796 26.2289 24.4033 25.2529L18.0391 18.8887Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
互动我执行的.displayName = "互动我执行的";
