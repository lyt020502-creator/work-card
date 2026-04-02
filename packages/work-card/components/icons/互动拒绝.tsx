import * as React from "react";
import type { IconProps } from "./types";

// ── 互动拒绝（圆形减号图标）──────────────────────────────────
// 来源：icon/互动-拒绝.svg
export const 互动拒绝 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动拒绝({ size = 48, className, style, ...props }, ref) {
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
          <g>
            <mask
              id={`mask0_31_7202-${uid}`}
              style={{ maskType: "alpha" } as React.CSSProperties}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="48"
              height="48"
            >
              <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
            </mask>
            <g mask={`url(#mask0_31_7202-${uid})`}>
              <g>
                <path
                  d="M24 4.5C34.7696 4.5 43.5 13.2304 43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5ZM24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 33.1127 14.8873 40.5 24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 14.8873 33.1127 7.5 24 7.5ZM30.5 22.5C31.3284 22.5 32 23.1716 32 24C32 24.8284 31.3284 25.5 30.5 25.5H17.5C16.6716 25.5 16 24.8284 16 24C16 23.1716 16.6716 22.5 17.5 22.5H30.5Z"
                  fill="currentColor"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
);
互动拒绝.displayName = "互动拒绝";
