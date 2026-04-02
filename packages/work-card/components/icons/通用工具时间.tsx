import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具-时间 ────────────
export const 通用工具时间 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具时间({ size = 48, className, style, ...props }, ref) {
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
        <path d="M24 4.5C13.2304 4.5 4.5 13.2304 4.5 24C4.5 34.7696 13.2304 43.5 24 43.5C34.7696 43.5 43.5 34.7696 43.5 24C43.5 13.2304 34.7696 4.5 24 4.5ZM24 7.5C33.1127 7.5 40.5 14.8873 40.5 24C40.5 33.1127 33.1127 40.5 24 40.5C14.8873 40.5 7.5 33.1127 7.5 24C7.5 14.8873 14.8873 7.5 24 7.5ZM23 13C22.1716 13 21.5 13.6716 21.5 14.5V23.5859C21.5 24.2489 21.7636 24.8847 22.2324 25.3535L28.4395 31.5605C29.0252 32.1463 29.9748 32.1463 30.5605 31.5605C31.1463 30.9748 31.1463 30.0252 30.5605 29.4395L24.5 23.3789V14.5C24.5 13.6716 23.8284 13 23 13Z" fill="currentColor" />
      </svg>
    );
  }
);
通用工具时间.displayName = "通用工具时间";
