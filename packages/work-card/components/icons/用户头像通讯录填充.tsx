import * as React from "react";
import type { IconProps } from "./types";

// ── 用户头像-通讯录-填充 ────────────────────────────────────────
// 来源：icon/用户头像-通讯录-填充.svg
export const 用户头像通讯录填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 用户头像通讯录填充({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6335-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6335-${uid})`}>
          <path
            d="M32.5 27C37.4706 27 41.5 31.0294 41.5 36V39C41.5 41.2091 39.7091 43 37.5 43H10.5C8.29086 43 6.5 41.2091 6.5 39V36C6.5 31.0294 10.5294 27 15.5 27H32.5ZM42 23C42.8284 23 43.5 23.6716 43.5 24.5C43.5 25.3284 42.8284 26 42 26H39C38.1716 26 37.5 25.3284 37.5 24.5C37.5 23.6716 38.1716 23 39 23H42ZM24 5C29.5228 5 34 9.47715 34 15C34 20.5228 29.5228 25 24 25C18.4772 25 14 20.5228 14 15C14 9.47715 18.4772 5 24 5ZM42 18.5C42.8284 18.5 43.5 19.1716 43.5 20C43.5 20.8284 42.8284 21.5 42 21.5H37C36.1716 21.5 35.5 20.8284 35.5 20C35.5 19.1716 36.1716 18.5 37 18.5H42Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
用户头像通讯录填充.displayName = "用户头像通讯录填充";
