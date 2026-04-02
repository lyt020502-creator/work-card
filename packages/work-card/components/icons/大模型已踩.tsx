import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-已踩 ──────────────────────────────────────────────
// 来源：icon/大模型-已踩.svg
export const 大模型已踩 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型已踩({ size = 48, className, style, ...props }, ref) {
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
          <path d="M48 48H0V0H48V48Z" fill="#D9D9D9" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32.0002 33.9998C32.0002 34.067 32.0063 34.1331 32.0148 34.198L27.6828 40.4363C26.5675 42.0421 24.7365 42.9997 22.7814 42.9998C18.1991 42.9998 15.3263 38.0496 17.5998 34.071L17.884 33.574L11.8996 33.4656C8.13917 33.3969 5.36811 29.925 6.13495 26.2429L8.73358 13.7722C9.40988 10.5262 12.2704 8.19995 15.5861 8.19995H32.0002V33.9998ZM37.0002 8.19995C39.7616 8.19996 42.0002 10.4385 42.0002 13.2V28.4001C42.0001 31.1615 39.7615 33.4001 37.0002 33.4001H35.0002V8.19995H37.0002Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型已踩.displayName = "大模型已踩";
