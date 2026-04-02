import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-暂停-带框 ────────────────────────────────────────
// 来源：icon/图影音-暂停-带框.svg
export const 图影音暂停带框 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音暂停带框({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6487-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6487-${uid})`}>
          <path
            d="M24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4ZM24 7C14.6112 7 7 14.6112 7 24C7 33.3888 14.6112 41 24 41C33.3888 41 41 33.3888 41 24C41 14.6112 33.3888 7 24 7ZM19 16.5C19.8284 16.5 20.5 17.1716 20.5 18V30C20.5 30.8284 19.8284 31.5 19 31.5C18.1716 31.5 17.5 30.8284 17.5 30V18C17.5 17.1716 18.1716 16.5 19 16.5ZM29 16.5C29.8284 16.5 30.5 17.1716 30.5 18V30C30.5 30.8284 29.8284 31.5 29 31.5C28.1716 31.5 27.5 30.8284 27.5 30V18C27.5 17.1716 28.1716 16.5 29 16.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音暂停带框.displayName = "图影音暂停带框";
