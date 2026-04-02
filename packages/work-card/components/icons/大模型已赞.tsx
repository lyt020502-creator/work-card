import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-已赞 ──────────────────────────────────────────────
// 来源：icon/大模型-已赞.svg
export const 大模型已赞 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型已赞({ size = 48, className, style, ...props }, ref) {
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M39.267 35.2277L41.865 22.7574C42.6321 19.0751 39.8609 15.603 36.1001 15.5347L30.1167 15.4259L30.4006 14.9289C32.6741 10.9503 29.8013 6 25.219 6C23.2637 6 21.4324 6.95783 20.3171 8.56386L16.5 14.0605V40.8H32.4141C35.7298 40.8 38.5907 38.4737 39.267 35.2277ZM13.5 40.8H11C8.23857 40.8 6 38.5614 6 35.8V20.6C6 17.8386 8.23858 15.6 11 15.6H13.5L13.5 40.8Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型已赞.displayName = "大模型已赞";
