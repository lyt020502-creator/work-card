import * as React from "react";
import type { IconProps } from "./types";

// ── 互动接受（圆形勾选图标）──────────────────────────────────
// 来源：icon/互动-接受.svg
export const 互动接受 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动接受({ size = 48, className, style, ...props }, ref) {
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
              id={`mask0_31_7181-${uid}`}
              style={{ maskType: "alpha" } as React.CSSProperties}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="48"
              height="48"
            >
              <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
            </mask>
            <g mask={`url(#mask0_31_7181-${uid})`}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30.0809 19.4247C30.6667 18.8389 31.6172 18.8389 32.203 19.4247C32.7885 20.0104 32.7885 20.9601 32.203 21.5458L23.7177 30.0311C22.7413 31.0074 21.1578 31.0074 20.1815 30.0311L15.9393 25.7889C15.3536 25.2032 15.3536 24.2527 15.9393 23.6669C16.5251 23.0814 17.4747 23.0814 18.0604 23.6669L21.9501 27.5565L30.0809 19.4247Z"
                fill="currentColor"
              />
              <g>
                <path
                  d="M24 4.5C34.7696 4.5 43.5 13.2304 43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5ZM24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 33.1127 14.8873 40.5 24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 14.8873 33.1127 7.5 24 7.5Z"
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
互动接受.displayName = "互动接受";
