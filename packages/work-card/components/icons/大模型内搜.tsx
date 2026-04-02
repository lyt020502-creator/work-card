import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-内搜 ──────────────────────────────────────────────
// 来源：icon/大模型-内搜.svg
export const 大模型内搜 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型内搜({ size = 48, className, style, ...props }, ref) {
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
          <rect width="48" height="48" fill="#D9D9D9" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            d="M36.5 6C39.5376 6 42 8.46243 42 11.5V36.5C42 39.5376 39.5376 42 36.5 42H11.5C8.46243 42 6 39.5376 6 36.5V11.5C6 8.46243 8.46243 6 11.5 6H36.5ZM11.5 9C10.1193 9 9 10.1193 9 11.5V36.5C9 37.8807 10.1193 39 11.5 39H36.5C37.8807 39 39 37.8807 39 36.5V11.5C39 10.1193 37.8807 9 36.5 9H11.5ZM23.7861 14.5C28.6382 14.5002 32.5713 18.434 32.5713 23.2861C32.5712 25.1703 31.9756 26.9142 30.9658 28.3447L32.5605 29.9395C33.1462 30.5252 33.1462 31.4748 32.5605 32.0605C31.9748 32.6463 31.0253 32.6462 30.4395 32.0605L28.8447 30.4658C27.4142 31.4756 25.6703 32.0712 23.7861 32.0713C18.934 32.0713 15.0002 28.1382 15 23.2861C15 18.4339 18.9339 14.5 23.7861 14.5ZM23.7861 17.5C20.5908 17.5 18 20.0907 18 23.2861C18.0002 26.4813 20.5909 29.0713 23.7861 29.0713C26.9812 29.0711 29.5711 26.4812 29.5713 23.2861C29.5713 20.0909 26.9813 17.5002 23.7861 17.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型内搜.displayName = "大模型内搜";
