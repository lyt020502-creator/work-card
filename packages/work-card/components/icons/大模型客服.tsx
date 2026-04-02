import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-客服 ──────────────────────────────────────────────
// 来源：icon/大模型-客服.svg
export const 大模型客服 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型客服({ size = 48, className, style, ...props }, ref) {
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
            d="M24 5.5C16.704 5.5 10.7613 11.2878 10.5098 18.5225C7.70189 18.7705 5.5 21.1277 5.5 24V30C5.5 32.869 7.69683 35.2229 10.5 35.4756V35.5H13.5V19C13.5 13.201 18.201 8.5 24 8.5C29.799 8.5 34.5 13.201 34.5 19V36C34.5 37.3807 33.3807 38.5 32 38.5H28.5947C28.0758 37.6042 27.1097 37 26 37H23C21.3431 37 20 38.3431 20 40C20 41.6569 21.3431 43 23 43H26C27.1097 43 28.0758 42.3958 28.5947 41.5H32C35.0376 41.5 37.5 39.0376 37.5 36V35.4756C40.3032 35.2229 42.5 32.869 42.5 30V24C42.5 21.128 40.2986 18.771 37.4912 18.5225C37.2397 11.2878 31.296 5.5 24 5.5ZM37.5 21.5498C38.6411 21.7814 39.5 22.7905 39.5 24V30C39.5 31.2094 38.641 32.2175 37.5 32.4492V21.5498ZM10.5 32.4492C9.35896 32.2175 8.5 31.2094 8.5 30V24C8.5 22.7905 9.35886 21.7814 10.5 21.5498V32.4492Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型客服.displayName = "大模型客服";
