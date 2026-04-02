import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-解释 ──────────────────────────────────────────────────
// 来源：icon/大模型-解释.svg
export const 大模型解释 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型解释({ size = 48, className, style, ...props }, ref) {
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
          <path d="M0 0H48V48H0V0Z" fill="#D9D9D9" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            d="M35.5 6C38.5376 6 41 8.46243 41 11.5V31.5L40.9922 31.6533C40.9154 32.4097 40.2767 33 39.5 33H12.5C11.1193 33 10 34.1193 10 35.5V36.5C10 37.8807 11.1193 39 12.5 39H39.5C40.3284 39 41 39.6716 41 40.5C41 41.3284 40.3284 42 39.5 42H12.5C9.46243 42 7 39.5376 7 36.5V11.5C7 8.46243 9.46243 6 12.5 6H35.5ZM12.5 9C11.1193 9 10 10.1193 10 11.5V30.6006C10.7502 30.217 11.5996 30 12.5 30H38V11.5C38 10.1193 36.8807 9 35.5 9H12.5ZM25.5 14C26.3284 14 27 14.6716 27 15.5C27 16.3284 26.3284 17 25.5 17H16.5C15.6716 17 15 16.3284 15 15.5C15 14.6716 15.6716 14 16.5 14H25.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型解释.displayName = "大模型解释";
