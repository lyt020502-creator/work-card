import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具关闭1（关闭/电源图标）──────────────────────────────────
// 来源：icon/通用工具-关闭-1.svg
export const 通用工具关闭1 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具关闭1({ size = 48, className, style, ...props }, ref) {
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
        <g>
          <path
            d="M5 24C5 17.0868 8.69326 11.0372 14.207 7.71484C14.9165 7.28756 15.8381 7.51632 16.2656 8.22558C16.6932 8.93515 16.4645 9.8576 15.7549 10.2852C11.1047 13.0873 8 18.1818 8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24C40 18.1818 36.8953 13.0873 32.2451 10.2852C31.5355 9.8576 31.3068 8.93515 31.7344 8.22558C32.1619 7.51632 33.0835 7.28756 33.793 7.71484C39.3067 11.0372 43 17.0868 43 24C43 34.4934 34.4934 43 24 43C13.5066 43 5 34.4934 5 24Z"
            fill="currentColor"
          />
          <path
            d="M22.5 5.5C22.5 4.67157 23.1716 4 24 4C24.8284 4 25.5 4.67157 25.5 5.5V22.5C25.5 23.3284 24.8284 24 24 24C23.1716 24 22.5 23.3284 22.5 22.5V5.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
通用工具关闭1.displayName = "通用工具关闭1";
