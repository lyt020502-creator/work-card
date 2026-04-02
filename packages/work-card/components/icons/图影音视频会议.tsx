import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-视频会议 ──────────────────────────────────────────
// 来源：icon/图影音-视频会议.svg
export const 图影音视频会议 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音视频会议({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6551-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6551-${uid})`}>
          <path
            d="M33.5 8.5C36.5376 8.5 39 10.9624 39 14V16.8623L41.7178 14.9404C43.3321 13.7992 45.5622 14.9537 45.5625 16.9307V33.1172C45.5625 35.0704 43.3796 36.2305 41.7607 35.1377L39 33.2734V35C39 38.0376 36.5376 40.5 33.5 40.5H8.5C5.46243 40.5 3 38.0376 3 35V14C3 10.9624 5.46243 8.5 8.5 8.5H33.5ZM8.5 11.5C7.11929 11.5 6 12.6193 6 14V35C6 36.3807 7.11929 37.5 8.5 37.5H33.5C34.8807 37.5 36 36.3807 36 35V14C36 12.6193 34.8807 11.5 33.5 11.5H8.5ZM39 20.3838V29.8047L42.6875 32.2939V17.7764L39 20.3838ZM18.5 17C19.3284 17 20 17.6716 20 18.5C20 19.3284 19.3284 20 18.5 20H11.5C10.6716 20 10 19.3284 10 18.5C10 17.6716 10.6716 17 11.5 17H18.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音视频会议.displayName = "图影音视频会议";
