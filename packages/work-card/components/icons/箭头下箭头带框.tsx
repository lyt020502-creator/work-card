import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-下箭头-带框（圆形边框内下箭头）──────────────────────────
// 来源：icon/箭头-下箭头-带框.svg
export const 箭头下箭头带框 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头下箭头带框({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5811-${uid}`}
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
          <g mask={`url(#mask0_31_5811-${uid})`}>
            <path
              d="M43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5C34.7696 4.5 43.5 13.2304 43.5 24ZM40.5 24C40.5 14.8873 33.1127 7.5 24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 33.1127 14.8873 40.5 24 40.5C33.1127 40.5 40.5 33.1127 40.5 24ZM32.0596 20.0107C32.6451 20.5965 32.6453 21.5461 32.0596 22.1318L25.3418 28.8496C24.5607 29.6304 23.2946 29.6297 22.5137 28.8486L15.7969 22.1309C15.2111 21.545 15.211 20.5955 15.7969 20.0098C16.3827 19.4242 17.3323 19.4241 17.918 20.0098L23.9277 26.0205L29.9385 20.0107C30.5243 19.425 31.4738 19.425 32.0596 20.0107Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头下箭头带框.displayName = "箭头下箭头带框";
