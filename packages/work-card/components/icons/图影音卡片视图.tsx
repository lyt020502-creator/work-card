import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-卡片视图 ──────────────────────────────────────────
// 来源：icon/图影音-卡片视图.svg
export const 图影音卡片视图 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音卡片视图({ size = 48, className, style, ...props }, ref) {
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
        <rect x="27" y="8" width="13" height="13" rx="4" stroke="currentColor" strokeWidth="3" />
        <rect x="27" y="27" width="13" height="13" rx="4" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }
);
图影音卡片视图.displayName = "图影音卡片视图";
