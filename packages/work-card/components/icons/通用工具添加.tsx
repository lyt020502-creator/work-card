import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具-添加 ────────────
export const 通用工具添加 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具添加({ size = 48, className, style, ...props }, ref) {
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
        <path d="M24 4.5C34.7696 4.5 43.5 13.2304 43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5ZM24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 33.1127 14.8873 40.5 24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 14.8873 33.1127 7.5 24 7.5ZM24 14.5C24.8284 14.5 25.5 15.1716 25.5 16V22.5H32C32.8284 22.5 33.5 23.1716 33.5 24C33.5 24.8284 32.8284 25.5 32 25.5H25.5V32C25.5 32.8284 24.8284 33.5 24 33.5C23.1716 33.5 22.5 32.8284 22.5 32V25.5H16C15.1716 25.5 14.5 24.8284 14.5 24C14.5 23.1716 15.1716 22.5 16 22.5H22.5V16C22.5 15.1716 23.1716 14.5 24 14.5Z" fill="currentColor" />
      </svg>
    );
  }
);
通用工具添加.displayName = "通用工具添加";
