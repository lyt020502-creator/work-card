import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具-隐藏内容 ────────────
export const 通用工具隐藏内容 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具隐藏内容({ size = 48, className, style, ...props }, ref) {
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
        <path d="M24 4.5C34.7696 4.5 43.5 13.2304 43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5ZM14.2842 37.3359C17.0098 39.3251 20.3674 40.5 24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 20.3674 39.3251 17.0098 37.3359 14.2842L14.2842 37.3359ZM24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 28.3979 9.22163 32.3929 12.0264 35.3506L35.3516 12.0264C32.3938 9.22134 28.3981 7.5 24 7.5Z" fill="currentColor" />
      </svg>
    );
  }
);
通用工具隐藏内容.displayName = "通用工具隐藏内容";
