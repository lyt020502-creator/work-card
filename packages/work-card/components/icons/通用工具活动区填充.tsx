import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具-活动区-填充 ────────────
export const 通用工具活动区填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具活动区填充({ size = 48, className, style, ...props }, ref) {
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
        <path d="M22.5 43.0002H12C9.79092 43.0002 8.00009 41.2093 8 39.0002V24.0002H22.5V43.0002ZM40 39.0002C39.9999 41.2093 38.2091 43.0002 36 43.0002H25.5V24.0002H40V39.0002ZM13.9688 5.75022C15.6428 4.78372 17.7835 5.35744 18.75 7.03147L21.6191 12.0002H26.3809L29.25 7.03147C30.2165 5.35744 32.3572 4.78372 34.0312 5.75022C35.7051 6.71677 36.279 8.85751 35.3125 10.5315L34.4648 12.0002H39C41.2091 12.0002 43 13.7911 43 16.0002V17.0002C42.9999 19.2093 41.2091 21.0002 39 21.0002H9C6.79092 21.0002 5.00009 19.2093 5 17.0002V16.0002C5 13.7911 6.79086 12.0002 9 12.0002H13.5352L12.6875 10.5315C11.721 8.85751 12.2949 6.71677 13.9688 5.75022Z" fill="currentColor" />
      </svg>
    );
  }
);
通用工具活动区填充.displayName = "通用工具活动区填充";
