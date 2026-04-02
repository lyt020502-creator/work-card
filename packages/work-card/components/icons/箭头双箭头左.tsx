import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-双箭头-左（双 chevron 左箭头图标）───────────────────────
// 来源：icon/箭头-双箭头-左.svg
export const 箭头双箭头左 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头双箭头左({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5887-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect
              width="48"
              height="48"
              transform="matrix(-1 0 0 1 48 0)"
              fill="#FF0606"
            />
          </mask>
          <g mask={`url(#mask0_31_5887-${uid})`}>
            <path
              d="M22.6467 22.2322C21.6704 23.2085 21.6704 24.7915 22.6467 25.7678L36.9393 40.0604C37.5251 40.6462 38.4749 40.6462 39.0607 40.0604C39.6462 39.4746 39.6464 38.5248 39.0607 37.9391L25.1215 24L39.0607 10.0609C39.6464 9.4751 39.6464 8.52535 39.0607 7.93956C38.4749 7.3538 37.5251 7.35378 36.9393 7.93956L22.6467 22.2322ZM9.64667 22.2322C8.67036 23.2085 8.67038 24.7915 9.64667 25.7678L23.9393 40.0604C24.5251 40.6462 25.4749 40.6462 26.0607 40.0604C26.6462 39.4746 26.6464 38.5248 26.0607 37.9391L12.1215 24L26.0607 10.0609C26.6464 9.4751 26.6464 8.52535 26.0607 7.93956C25.4749 7.35379 24.5251 7.35378 23.9393 7.93956L9.64667 22.2322Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头双箭头左.displayName = "箭头双箭头左";
