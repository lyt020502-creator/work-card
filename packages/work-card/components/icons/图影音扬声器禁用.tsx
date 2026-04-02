import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-扬声器-禁用 ──────────────────────────────────────
// 来源：icon/图影音-扬声器-禁用.svg
export const 图影音扬声器禁用 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音扬声器禁用({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6602-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6602-${uid})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.499 16.4995H15C13.6194 16.4995 12.5002 17.619 12.5 18.9995V28.9995C12.5001 30.3801 13.6194 31.4995 15 31.4995H21.6357C22.2676 31.4995 22.8763 31.7391 23.3389 32.1694L31.9785 40.2085C32.9378 41.1007 34.4994 40.4207 34.5 39.1109V34.4995L37.5 37.4995V39.1109C37.4994 43.0418 32.8126 45.0826 29.9346 42.4048L21.4395 34.4995H15C11.9625 34.4995 9.50013 32.037 9.5 28.9995V18.9995C9.50014 16.4232 11.2717 14.2608 13.6631 13.6636L16.499 16.4995ZM14.9395 8.93897C15.5252 8.35335 16.4748 8.35335 17.0605 8.93897L42.0605 33.939C42.6463 34.5247 42.6462 35.4743 42.0605 36.0601C41.4748 36.6459 40.5252 36.6459 39.9395 36.0601L14.9395 11.0601C14.3538 10.4743 14.3537 9.52472 14.9395 8.93897ZM29.9346 5.59522C32.8127 2.91706 37.4999 4.95777 37.5 8.88917V24.772L34.5 21.772V8.88917C34.4999 7.57876 32.9379 6.89882 31.9785 7.79151L26.042 13.314L23.9189 11.1909L29.9346 5.59522Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音扬声器禁用.displayName = "图影音扬声器禁用";
