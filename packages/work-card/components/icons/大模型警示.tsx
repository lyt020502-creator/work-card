import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-警示 ──────────────────────────────────────────────────
// 来源：icon/大模型-警示.svg
export const 大模型警示 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型警示({ size = 48, className, style, ...props }, ref) {
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.1357 7.54321C21.8817 4.61996 26.1161 4.62011 27.8622 7.54321L44.0771 34.6926C45.8682 37.6921 43.7065 41.5002 40.2128 41.5002H7.78509C4.29143 41.5002 2.13045 37.6921 3.92181 34.6926L20.1357 7.54321ZM25.287 9.0813C24.705 8.10726 23.294 8.10739 22.7118 9.0813L6.497 36.2307C5.89998 37.2305 6.6206 38.5002 7.78509 38.5002H40.2128C41.3774 38.5002 42.098 37.2306 41.5009 36.2307L25.287 9.0813ZM23.9999 31.0002C24.8281 31.0005 25.4999 31.672 25.4999 32.5002V33.5002C25.4998 34.3284 24.828 35 23.9999 35.0002C23.1716 35.0002 22.5001 34.3285 22.4999 33.5002V32.5002C22.4999 31.6718 23.1715 31.0002 23.9999 31.0002ZM23.9999 17.0002C24.8281 17.0005 25.4999 17.672 25.4999 18.5002V27.5002C25.4998 28.3284 24.828 29 23.9999 29.0002C23.1716 29.0002 22.5001 28.3285 22.4999 27.5002V18.5002C22.4999 17.6718 23.1715 17.0002 23.9999 17.0002Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型警示.displayName = "大模型警示";
