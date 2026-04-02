import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-单箭头-下（下 chevron 箭头图标）─────────────────────────
// 来源：icon/箭头-单箭头-下.svg
export const 箭头单箭头下 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头单箭头下({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5970-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect width="48" height="48" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5970-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.93934 17.0597C6.35355 17.6455 6.35355 18.5952 6.93934 19.181L22.2322 34.4739C23.2085 35.4502 24.7915 35.4502 25.7678 34.4739L41.0607 19.181C41.6464 18.5952 41.6464 17.6455 41.0607 17.0597C40.4749 16.4739 39.5251 16.4739 38.9393 17.0597L24 31.999L9.06066 17.0597C8.47487 16.4739 7.52512 16.4739 6.93934 17.0597Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头单箭头下.displayName = "箭头单箭头下";
