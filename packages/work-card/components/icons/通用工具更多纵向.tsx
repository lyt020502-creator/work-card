import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具-更多-纵向 ────────────
export const 通用工具更多纵向 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具更多纵向({ size = 48, className, style, ...props }, ref) {
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
        <path d="M27 12C27 13.6569 25.6569 15 24 15C22.3431 15 21 13.6569 21 12C21 10.3431 22.3431 9 24 9C25.6569 9 27 10.3431 27 12ZM27 24C27 25.6569 25.6569 27 24 27C22.3431 27 21 25.6569 21 24C21 22.3431 22.3431 21 24 21C25.6569 21 27 22.3431 27 24ZM27 36C27 37.6569 25.6569 39 24 39C22.3431 39 21 37.6569 21 36C21 34.3431 22.3431 33 24 33C25.6569 33 27 34.3431 27 36Z" fill="currentColor" />
      </svg>
    );
  }
);
通用工具更多纵向.displayName = "通用工具更多纵向";
