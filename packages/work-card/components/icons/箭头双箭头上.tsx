import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-双箭头-上（双 chevron 上箭头图标）───────────────────────
// 来源：icon/箭头-双箭头-上.svg
export const 箭头双箭头上 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头双箭头上({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5730-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect
              y="48"
              width="48"
              height="48"
              transform="rotate(-90 0 48)"
              fill="#FF0606"
            />
          </mask>
          <g mask={`url(#mask0_31_5730-${uid})`}>
            <path
              d="M22.2322 22.6467C23.2085 21.6704 24.7915 21.6704 25.7678 22.6467L40.0604 36.9393C40.6462 37.5251 40.6462 38.4749 40.0604 39.0607C39.4746 39.6462 38.5248 39.6464 37.9391 39.0607L24 25.1215L10.0609 39.0607C9.4751 39.6464 8.52535 39.6464 7.93956 39.0607C7.3538 38.4749 7.35378 37.5251 7.93956 36.9393L22.2322 22.6467ZM22.2322 9.64667C23.2085 8.67036 24.7915 8.67038 25.7678 9.64667L40.0604 23.9393C40.6462 24.5251 40.6462 25.4749 40.0604 26.0607C39.4746 26.6462 38.5248 26.6464 37.9391 26.0607L24 12.1215L10.0609 26.0607C9.4751 26.6464 8.52535 26.6464 7.93956 26.0607C7.35379 25.4749 7.35378 24.5251 7.93956 23.9393L22.2322 9.64667Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头双箭头上.displayName = "箭头双箭头上";
