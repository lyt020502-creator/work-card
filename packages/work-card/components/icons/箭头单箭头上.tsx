import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-单箭头-上（上 chevron 箭头图标）─────────────────────────
// 来源：icon/箭头-单箭头-上.svg
export const 箭头单箭头上 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头单箭头上({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5984-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect width="48" height="48" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5984-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M41.1221 32.0605C41.7079 31.4747 41.7079 30.525 41.1221 29.9392L25.738 14.5551C24.7617 13.5788 23.1788 13.5787 22.2024 14.5551L6.81832 29.9392C6.23254 30.525 6.23254 31.4747 6.81832 32.0605C7.40411 32.6463 8.35386 32.6463 8.93964 32.0605L23.9702 17.0299L39.0008 32.0605C39.5866 32.6463 40.5363 32.6463 41.1221 32.0605Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头单箭头上.displayName = "箭头单箭头上";
