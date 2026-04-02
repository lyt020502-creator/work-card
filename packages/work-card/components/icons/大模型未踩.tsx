import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-未踩 ──────────────────────────────────────────────────
// 来源：icon/大模型-未踩.svg
export const 大模型未踩 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型未踩({ size = 48, className, style, ...props }, ref) {
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
            d="M37.0002 8.19995C39.7616 8.19996 42.0002 10.4385 42.0002 13.2V28.4001C42.0001 31.1615 39.7615 33.4001 37.0002 33.4001H32.5695L27.6828 40.4363C26.5675 42.0421 24.7365 42.9997 22.7814 42.9998C18.1991 42.9998 15.3263 38.0496 17.5998 34.071L17.884 33.574L11.8996 33.4656C8.13917 33.3969 5.36811 29.925 6.13495 26.2429L8.73358 13.7722C9.40988 10.5262 12.2704 8.19995 15.5861 8.19995H37.0002ZM15.5861 11.2C13.6914 11.2 12.0565 12.5296 11.6701 14.3845L9.07245 26.8542C8.68889 28.6953 10.074 30.4312 11.9543 30.4656L23.0002 30.6667L20.2043 35.5593C19.0736 37.5379 20.5026 39.9998 22.7814 39.9998C23.7536 39.9997 24.6643 39.5238 25.2189 38.7253L30.5051 31.1111C30.5024 31.0744 30.5002 31.0372 30.5002 30.9998V11.2H15.5861ZM33.5002 11.2V30.4001H37.0002C38.1047 30.4001 39.0001 29.5046 39.0002 28.4001V13.2C39.0002 12.0954 38.1047 11.2 37.0002 11.2H33.5002Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型未踩.displayName = "大模型未踩";
