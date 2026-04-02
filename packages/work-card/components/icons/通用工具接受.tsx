import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具-接受 ────────────
export const 通用工具接受 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具接受({ size = 48, className, style, ...props }, ref) {
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
        <path d="M24 4.5C34.7696 4.5 43.5 13.2304 43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5ZM24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 33.1127 14.8873 40.5 24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 14.8873 33.1127 7.5 24 7.5ZM33.0312 17.7178C33.617 17.132 34.5666 17.132 35.1523 17.7178C35.7381 18.3036 35.7381 19.2531 35.1523 19.8389L24.5459 30.4453C23.5696 31.4216 21.987 31.4216 21.0107 30.4453L14.6465 24.0811C14.061 23.4952 14.0608 22.5457 14.6465 21.96C15.2322 21.3743 16.1818 21.3745 16.7676 21.96L22.7783 27.9707L33.0312 17.7178Z" fill="currentColor" />
      </svg>
    );
  }
);
通用工具接受.displayName = "通用工具接受";
