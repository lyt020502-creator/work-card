import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-标题 ──────────────────────────────────────────────────
// 来源：icon/大模型-标题.svg
export const 大模型标题 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型标题({ size = 48, className, style, ...props }, ref) {
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
            d="M36.5 6C39.5376 6 42 8.46243 42 11.5V36.5C42 39.5376 39.5376 42 36.5 42H11.5C8.46243 42 6 39.5376 6 36.5V11.5C6 8.46243 8.46243 6 11.5 6H36.5ZM11.5 9C10.1193 9 9 10.1193 9 11.5V36.5C9 37.8807 10.1193 39 11.5 39H36.5C37.8807 39 39 37.8807 39 36.5V11.5C39 10.1193 37.8807 9 36.5 9H11.5ZM31 26.5C31.8284 26.5 32.5 27.1716 32.5 28C32.5 28.8284 31.8284 29.5 31 29.5H17C16.1716 29.5 15.5 28.8284 15.5 28C15.5001 27.1717 16.1716 26.5 17 26.5H31ZM31 17.5C31.8284 17.5 32.5 18.1716 32.5 19C32.5 19.8284 31.8284 20.5 31 20.5H17C16.1716 20.5 15.5 19.8284 15.5 19C15.5 18.1716 16.1716 17.5 17 17.5H31Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型标题.displayName = "大模型标题";
