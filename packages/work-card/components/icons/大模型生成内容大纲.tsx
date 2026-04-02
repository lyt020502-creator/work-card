import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-生成内容大纲 ──────────────────────────────────────────
// 来源：icon/大模型-生成内容大纲.svg
export const 大模型生成内容大纲 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型生成内容大纲({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <path d="M0 0H48V48H0V0Z" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            d="M11 34.5C11.8284 34.5 12.5 35.1716 12.5 36C12.5 36.8284 11.8284 37.5 11 37.5H7C6.17157 37.5 5.5 36.8284 5.5 36C5.5 35.1716 6.17157 34.5 7 34.5H11ZM41 34.5C41.8284 34.5 42.5 35.1716 42.5 36C42.5 36.8284 41.8284 37.5 41 37.5H17C16.1716 37.5 15.5 36.8284 15.5 36C15.5 35.1716 16.1716 34.5 17 34.5H41ZM21 22.5C21.8284 22.5 22.5 23.1716 22.5 24C22.5 24.8284 21.8284 25.5 21 25.5H17C16.1716 25.5 15.5 24.8284 15.5 24C15.5 23.1716 16.1716 22.5 17 22.5H21ZM41 22.5C41.8284 22.5 42.5 23.1716 42.5 24C42.5 24.8284 41.8284 25.5 41 25.5H27C26.1716 25.5 25.5 24.8284 25.5 24C25.5 23.1716 26.1716 22.5 27 22.5H41ZM11 10.5C11.8284 10.5 12.5 11.1716 12.5 12C12.5 12.8284 11.8284 13.5 11 13.5H7C6.17157 13.5 5.5 12.8284 5.5 12C5.5 11.1716 6.17157 10.5 7 10.5H11ZM41 10.5C41.8284 10.5 42.5 11.1716 42.5 12C42.5 12.8284 41.8284 13.5 41 13.5H17C16.1716 13.5 15.5 12.8284 15.5 12C15.5 11.1716 16.1716 10.5 17 10.5H41Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型生成内容大纲.displayName = "大模型生成内容大纲";
