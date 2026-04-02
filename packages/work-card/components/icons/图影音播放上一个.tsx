import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-播放上一个 ────────────────────────────────────────
// 来源：icon/图影音-播放上一个.svg
export const 图影音播放上一个 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音播放上一个({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6476-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6476-${uid})`}>
          <path
            d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 7C33.3888 7 41 14.6112 41 24C41 33.3888 33.3888 41 24 41C14.6112 41 7 33.3888 7 24C7 14.6112 14.6112 7 24 7ZM19 15.5C18.1716 15.5 17.5 16.1716 17.5 17V31C17.5 31.8284 18.1716 32.5 19 32.5C19.8284 32.5 20.5 31.8284 20.5 31V26.6211C21.01 27.0039 21.6646 27.444 22.4912 27.9951L24.0371 29.0264C26.4612 30.6424 27.6736 31.4496 28.6787 31.3896C29.5543 31.3374 30.3634 30.9046 30.8926 30.2051C31.4999 29.402 31.5 27.9454 31.5 25.0322V22.9697C31.5 20.0565 31.4999 18.5999 30.8926 17.7969C30.3634 17.0973 29.5543 16.6646 28.6787 16.6123C27.6736 16.5523 26.4612 17.3596 24.0371 18.9756L22.4912 20.0068C21.6648 20.5577 21.01 20.9972 20.5 21.3799V17C20.5 16.1716 19.8284 15.5 19 15.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音播放上一个.displayName = "图影音播放上一个";
