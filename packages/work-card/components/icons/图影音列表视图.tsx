import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-列表视图 ──────────────────────────────────────────
// 来源：icon/图影音-列表视图.svg
export const 图影音列表视图 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音列表视图({ size = 48, className, style, ...props }, ref) {
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
        <rect x="8" y="8" width="13" height="13" rx="4" stroke="currentColor" strokeWidth="3" />
        <rect x="8" y="27" width="13" height="13" rx="4" stroke="currentColor" strokeWidth="3" />
        <path
          d="M25.5 11.5C25.5 10.6716 26.1716 10 27 10H40C40.8284 10 41.5 10.6716 41.5 11.5C41.5 12.3284 40.8284 13 40 13H27C26.1716 13 25.5 12.3284 25.5 11.5Z"
          fill="currentColor"
        />
        <rect x="25.5" y="16" width="16" height="3" rx="1.5" fill="currentColor" />
        <rect x="25.5" y="29" width="16" height="3" rx="1.5" fill="currentColor" />
        <rect x="25.5" y="35" width="16" height="3" rx="1.5" fill="currentColor" />
      </svg>
    );
  }
);
图影音列表视图.displayName = "图影音列表视图";
