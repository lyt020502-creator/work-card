import * as React from "react";
import type { IconProps } from "./types";

// ── 待办（待办/日历勾选图标，多色状态保留原始品牌色）──────────
// 来源：icon/待办.svg
export const 待办 = React.forwardRef<SVGSVGElement, IconProps>(
  function 待办({ size = 20, className, style, ...props }, ref) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        ref={ref}
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.5 4.79167C2.5 3.52601 3.52601 2.5 4.79167 2.5H15.2083C16.474 2.5 17.5 3.52601 17.5 4.79167V5.9375H2.50011V7.1875H17.5V15.2083C17.5 16.474 16.474 17.5 15.2083 17.5H4.79167C3.52601 17.5 2.5 16.474 2.5 15.2083V4.79167ZM8.15027 11.2247C7.90619 10.9806 7.51046 10.9806 7.26638 11.2247C7.02231 11.4688 7.02231 11.8645 7.26638 12.1086L8.88828 13.7305C9.13236 13.9746 9.52809 13.9746 9.77217 13.7305L13.5025 10.0001C13.7466 9.75606 13.7466 9.36033 13.5025 9.11626C13.2585 8.87218 12.8627 8.87218 12.6187 9.11626L9.33022 12.4047L8.15027 11.2247Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
待办.displayName = "待办";
