import * as React from "react";
import type { IconProps } from "./types";

// ── 互动消息会话填充（填充消息气泡图标）──────────────────────
// 来源：icon/互动-消息会话-填充.svg
export const 互动消息会话填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动消息会话填充({ size = 48, className, style, ...props }, ref) {
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
        <g>
          <mask
            id={`mask0_31_6016-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect width="48" height="48" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_6016-${uid})`}>
            <path
              d="M39 8C41.2091 8 43 9.79086 43 12V35C43 37.2091 41.2091 39 39 39H16.7051C16.5697 39 16.4359 39.0278 16.3115 39.0811L8.78809 42.3057C7.46835 42.8713 6 41.9026 6 40.4668V12C6 9.79086 7.79086 8 10 8H39ZM19 18C17.8954 18 17 18.8954 17 20V26C17 27.1046 17.8954 28 19 28C20.1046 28 21 27.1046 21 26V20C21 18.8954 20.1046 18 19 18ZM31 18C29.8954 18 29 18.8954 29 20V26C29 27.1046 29.8954 28 31 28C32.1046 28 33 27.1046 33 26V20C33 18.8954 32.1046 18 31 18Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
互动消息会话填充.displayName = "互动消息会话填充";
