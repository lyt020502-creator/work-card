import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具删除填充（删除填充图标，带 mask 版本）──────────────────────────────────
// 来源：icon/通用工具-删除-填充.svg
export const 通用工具删除填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具删除填充({ size = 48, className, style, ...props }, ref) {
    const uid = React.useId();
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
        <mask
          id={`mask0_31_6022-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect
            x="48"
            width="48"
            height="48"
            transform="rotate(90 48 0)"
            fill="#FF0606"
          />
        </mask>
        <g mask={`url(#mask0_31_6022-${uid})`}>
          <path
            d="M28 5C29.6569 5 31 6.34315 31 8V9H39.5C41.1569 9 42.5 10.3431 42.5 12C42.5 13.6569 41.1569 15 39.5 15V39C39.5 41.2091 37.7091 43 35.5 43H12.5C10.2909 43 8.5 41.2091 8.5 39V15C6.84315 15 5.5 13.6569 5.5 12C5.5 10.3431 6.84315 9 8.5 9H17V8C17 6.34315 18.3431 5 20 5H28ZM20 21C19.1716 21 18.5 21.6716 18.5 22.5V32.5C18.5 33.3284 19.1716 34 20 34C20.8284 34 21.5 33.3284 21.5 32.5V22.5C21.5 21.6716 20.8284 21 20 21ZM28 21C27.1716 21 26.5 21.6716 26.5 22.5V32.5C26.5 33.3284 27.1716 34 28 34C28.8284 34 29.5 33.3284 29.5 32.5V22.5C29.5 21.6716 28.8284 21 28 21Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
通用工具删除填充.displayName = "通用工具删除填充";
