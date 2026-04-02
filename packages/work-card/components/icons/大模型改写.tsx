import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-改写 ──────────────────────────────────────────────────
// 来源：icon/大模型-改写.svg
export const 大模型改写 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型改写({ size = 48, className, style, ...props }, ref) {
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.6109 4.35696C25.7587 2.20913 29.2403 2.20915 31.3882 4.35696L41.9956 14.9634C44.1432 17.1113 44.1434 20.5939 41.9956 22.7417L24.3179 40.4195C22.1701 42.5672 18.6875 42.5671 16.5396 40.4195L5.93313 29.812C3.78532 27.6642 3.7853 24.1826 5.93313 22.0347L23.6109 4.35696ZM8.05422 24.1558C7.07797 25.1321 7.07799 26.7146 8.05422 27.6909L18.6607 38.2974C19.637 39.2737 21.2195 39.2737 22.1958 38.2974L24.1851 36.3072L10.0435 22.1656L8.05422 24.1558ZM29.2671 6.47805C28.2908 5.50182 26.7082 5.50179 25.732 6.47805L12.1655 20.0445L26.3072 34.1861L39.8736 20.6197C40.8498 19.6433 40.8499 18.0608 39.8736 17.0845L29.2671 6.47805Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型改写.displayName = "大模型改写";
