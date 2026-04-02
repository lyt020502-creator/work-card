import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-放大（对角线放大箭头图标）──────────────────────────────
// 来源：icon/箭头-放大.svg
export const 箭头放大 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头放大({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5709-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect
              x="48"
              width="48"
              height="48"
              transform="rotate(90 48 0)"
              fill="#FF0606"
            />
          </mask>
          <g mask={`url(#mask0_31_5709-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.5005 36.9999C24.3288 36.9999 25.0002 37.6714 25.0003 38.4998C25.0001 39.328 24.3288 39.9996 23.5005 39.9996L10.5005 39.9996C9.11994 39.9996 8.00096 38.8804 8.00076 37.4999L8.00076 24.4999C8.00082 23.6715 8.67223 23.0001 9.5006 23C10.3289 23.0001 11.0004 23.6715 11.0004 24.4999V36.9999L23.5005 36.9999ZM37.5004 8.00026C38.8811 8.00026 40.0001 9.11928 40.0001 10.5L40.0001 23.5C39.9999 24.3282 39.3286 24.9998 38.5003 24.9998C37.6721 24.9997 37.0006 24.3281 37.0004 23.5L37.0004 10.9999L24.5004 10.9999C23.6722 10.9998 23.0008 10.3282 23.0005 9.5001C23.0005 8.67173 23.672 8.00035 24.5004 8.00026L37.5004 8.00026Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头放大.displayName = "箭头放大";
