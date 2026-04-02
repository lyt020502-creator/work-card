import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-播放下一个 ────────────────────────────────────────
// 来源：icon/图影音-播放下一个.svg
export const 图影音播放下一个 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音播放下一个({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6470-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6470-${uid})`}>
          <path
            d="M24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4ZM24 7C14.6112 7 7 14.6112 7 24C7 33.3888 14.6112 41 24 41C33.3888 41 41 33.3888 41 24C41 14.6112 33.3888 7 24 7ZM29 15.5C29.8284 15.5 30.5 16.1716 30.5 17V31C30.5 31.8284 29.8284 32.5 29 32.5C28.1716 32.5 27.5 31.8284 27.5 31V26.6201C26.99 27.0029 26.3354 27.4431 25.5088 27.9941L23.9629 29.0254C21.5388 30.6415 20.3264 31.4486 19.3213 31.3887C18.4457 31.3364 17.6366 30.9037 17.1074 30.2041C16.5001 29.4011 16.5 27.9444 16.5 25.0312V22.9688C16.5 20.0556 16.5001 18.5989 17.1074 17.7959C17.6366 17.0963 18.4457 16.6636 19.3213 16.6113C20.3264 16.5514 21.5388 17.3586 23.9629 18.9746L25.5088 20.0059C26.3352 20.5568 26.99 20.9962 27.5 21.3789V17C27.5 16.1716 28.1716 15.5 29 15.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音播放下一个.displayName = "图影音播放下一个";
