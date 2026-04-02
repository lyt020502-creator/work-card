import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-单箭头-右（右 chevron 箭头图标）─────────────────────────
// 来源：icon/箭头-单箭头-右.svg → component-docs/src/components/icons/arrow.jsx
export const 箭头单箭头右 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头单箭头右({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5940-${uid}`}
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
          <g mask={`url(#mask0_31_5940-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.9396 6.93934C16.5254 6.35355 17.4751 6.35355 18.0609 6.93934L33.3066 22.1851C34.309 23.1874 34.309 24.8126 33.3066 25.8149L18.0609 41.0607C17.4751 41.6464 16.5254 41.6464 15.9396 41.0607C15.3538 40.4749 15.3538 39.5251 15.9396 38.9393L30.8789 24L15.9396 9.06066C15.3538 8.47487 15.3538 7.52512 15.9396 6.93934Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头单箭头右.displayName = "箭头单箭头右";
