import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-播放-带框 ────────────────────────────────────────
// 来源：icon/图影音-播放-带框.svg
export const 图影音播放带框 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音播放带框({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6482-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6482-${uid})`}>
          <path
            d="M24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4ZM24 7C14.6112 7 7 14.6112 7 24C7 33.3888 14.6112 41 24 41C33.3888 41 41 33.3888 41 24C41 14.6112 33.3888 7 24 7ZM21.8213 16.6113C22.8264 16.5514 24.0388 17.3586 26.4629 18.9746L28.0088 20.0059C30.0119 21.3412 31.0143 22.009 31.3633 22.8506C31.6684 23.5863 31.6684 24.4137 31.3633 25.1494C31.0143 25.991 30.0119 26.6588 28.0088 27.9941L26.4629 29.0254C24.0388 30.6415 22.8264 31.4486 21.8213 31.3887C20.9457 31.3364 20.1366 30.9037 19.6074 30.2041C19.0001 29.4011 19 27.9444 19 25.0312V22.9688C19 20.0556 19.0001 18.5989 19.6074 17.7959C20.1366 17.0963 20.9457 16.6636 21.8213 16.6113Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音播放带框.displayName = "图影音播放带框";
