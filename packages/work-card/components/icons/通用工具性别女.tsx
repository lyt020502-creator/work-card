import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具性别女（女性符号图标）──────────────────────────────────
// 来源：icon/通用工具-性别女.svg
export const 通用工具性别女 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具性别女({ size = 48, className, style, ...props }, ref) {
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
        <path
          d="M25 3.5C33.2843 3.5 40 10.2157 40 18.5C40 26.4482 33.818 32.9512 26 33.4658V36.5H34C34.8284 36.5 35.5 37.1716 35.5 38C35.5 38.8284 34.8284 39.5 34 39.5H26V41.5C26 42.3284 25.3284 43 24.5 43C23.6716 43 23 42.3284 23 41.5V39.5H15C14.1716 39.5 13.5 38.8284 13.5 38C13.5 37.1716 14.1716 36.5 15 36.5H23V33.3672C15.6613 32.3894 10 26.1061 10 18.5C10 10.2157 16.7157 3.5 25 3.5ZM25 6.5C18.3726 6.5 13 11.8726 13 18.5C13 25.1274 18.3726 30.5 25 30.5C31.6274 30.5 37 25.1274 37 18.5C37 11.8726 31.6274 6.5 25 6.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
通用工具性别女.displayName = "通用工具性别女";
