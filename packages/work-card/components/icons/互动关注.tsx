import * as React from "react";
import type { IconProps } from "./types";

// ── 互动关注（星形关注图标）──────────────────────────────────
// 来源：icon/互动-关注.svg
export const 互动关注 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动关注({ size = 46, className, style, ...props }, ref) {
    const uid = React.useId();
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        ref={ref}
        {...props}
      >
        <g>
          <mask
            id={`mask0_31_5742-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="-1"
            y="-1"
            width="48"
            height="48"
          >
            <rect x="47" y="-1" width="48" height="48" transform="rotate(90 47 -1)" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5742-${uid})`}>
            <path
              d="M23.8113 35.7947C23.1895 35.4885 22.4608 35.4885 21.8391 35.7947L14.1847 39.5636C12.5741 40.3566 10.7338 39.0206 10.989 37.2435L12.2043 28.7805C12.3026 28.0961 12.0782 27.4047 11.5966 26.9085L5.64364 20.7749C4.39421 19.4875 5.0968 17.3269 6.86444 17.0206L15.2755 15.5633C15.9578 15.445 16.5466 15.0169 16.8693 14.4043L20.8502 6.84858C21.6874 5.25956 23.963 5.25956 24.8002 6.84858L28.7811 14.4043C29.1038 15.0169 29.6926 15.445 30.3749 15.5633L38.7859 17.0206C40.5536 17.3269 41.2562 19.4875 40.0068 20.7749L34.0538 26.9085C33.5722 27.4047 33.3478 28.0961 33.4461 28.7805L34.6614 37.2436C34.9166 39.0206 33.0763 40.3566 31.4656 39.5636L23.8113 35.7947Z"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    );
  }
);
互动关注.displayName = "互动关注";
