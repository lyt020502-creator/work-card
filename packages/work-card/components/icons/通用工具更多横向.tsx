import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具-更多-横向 ────────────
export const 通用工具更多横向 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具更多横向({ size = 48, className, style, ...props }, ref) {
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
        <path d="M12 21.0001C13.6569 21.0001 15 22.3432 15 24.0001C15 25.6569 13.6569 27.0001 12 27.0001C10.3431 27.0001 9 25.6569 9 24.0001C9 22.3432 10.3431 21.0001 12 21.0001ZM24 21.0001C25.6569 21.0001 27 22.3432 27 24.0001C27 25.6569 25.6569 27.0001 24 27.0001C22.3431 27.0001 21 25.6569 21 24.0001C21 22.3432 22.3431 21.0001 24 21.0001ZM36 21.0001C37.6569 21.0001 39 22.3432 39 24.0001C39 25.6569 37.6569 27.0001 36 27.0001C34.3431 27.0001 33 25.6569 33 24.0001C33 22.3432 34.3431 21.0001 36 21.0001Z" fill="currentColor" />
      </svg>
    );
  }
);
通用工具更多横向.displayName = "通用工具更多横向";
