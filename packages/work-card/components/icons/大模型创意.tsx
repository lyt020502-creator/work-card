import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-创意 ──────────────────────────────────────────────
// 来源：icon/大模型-创意.svg
export const 大模型创意 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型创意({ size = 48, className, style, ...props }, ref) {
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
          <rect width="48" height="48" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            d="M31 40.5C31.8284 40.5 32.5 41.1716 32.5 42C32.5 42.8284 31.8284 43.5 31 43.5H17C16.1716 43.5 15.5 42.8284 15.5 42C15.5 41.1716 16.1716 40.5 17 40.5H31ZM24 3.5C32.5375 3.5 39.5 10.317 39.5 18.7764C39.4998 24.3517 36.4697 29.2152 31.9668 31.8799V34.5C31.9668 35.8806 30.8473 36.9998 29.4668 37H18.5391C17.1583 37 16.0391 35.8807 16.0391 34.5V31.8408C11.5765 29.1741 8.50017 24.3369 8.5 18.7764C8.5 10.317 15.4625 3.5 24 3.5ZM24 6.5C17.0735 6.5 11.5 12.0193 11.5 18.7764C11.5002 23.4576 14.2459 27.5587 18.2305 29.6318C18.7557 29.9051 19.0497 30.4455 19.0361 31H19.0391V34H28.9668V31.126C28.9175 30.538 29.2198 29.951 29.7773 29.665C33.7842 27.6099 36.4998 23.4973 36.5 18.7764C36.5 12.0193 30.9265 6.5 24 6.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型创意.displayName = "大模型创意";
