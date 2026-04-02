import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-上箭头-带框（圆形边框内上箭头）──────────────────────────
// 来源：icon/箭头-上箭头-带框.svg
export const 箭头上箭头带框 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头上箭头带框({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5806-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect
              y="48"
              width="48"
              height="48"
              transform="rotate(-90 0 48)"
              fill="#FF0606"
            />
          </mask>
          <g mask={`url(#mask0_31_5806-${uid})`}>
            <path
              d="M4.5 24C4.5 13.2304 13.2304 4.5 24 4.5C34.7696 4.5 43.5 13.2304 43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24ZM7.5 24C7.5 33.1127 14.8873 40.5 24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 14.8873 33.1127 7.5 24 7.5C14.8873 7.5 7.5 14.8873 7.5 24ZM15.9404 27.9893C15.3549 27.4035 15.3547 26.4539 15.9404 25.8682L22.6582 19.1504C23.4393 18.3696 24.7054 18.3703 25.4863 19.1514L32.2031 25.8691C32.7889 26.455 32.789 27.4045 32.2031 27.9902C31.6173 28.5758 30.6677 28.5759 30.082 27.9902L24.0723 21.9795L18.0615 27.9893C17.4757 28.575 16.5262 28.575 15.9404 27.9893Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头上箭头带框.displayName = "箭头上箭头带框";
