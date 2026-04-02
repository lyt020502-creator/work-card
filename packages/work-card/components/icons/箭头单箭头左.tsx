import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-单箭头-左（左 chevron 箭头图标）─────────────────────────
// 来源：icon/箭头-单箭头-左.svg → component-docs/src/components/icons/arrow.jsx
export const 箭头单箭头左 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头单箭头左({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5955-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect
              x="47.8681"
              y="0.131868"
              width="47.7363"
              height="47.7363"
              transform="rotate(90 47.8681 0.131868)"
              fill="#FF0606"
              stroke="#5C6F95"
              strokeWidth="0.263736"
            />
          </mask>
          <g mask={`url(#mask0_31_5955-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32.0604 6.93934C31.4746 6.35355 30.5249 6.35355 29.9391 6.93934L14.6462 22.2322C13.6699 23.2085 13.6699 24.7915 14.6462 25.7678L29.9391 41.0607C30.5249 41.6464 31.4746 41.6464 32.0604 41.0607C32.6462 40.4749 32.6462 39.5251 32.0604 38.9393L17.1211 24L32.0604 9.06066C32.6462 8.47487 32.6462 7.52512 32.0604 6.93934Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头单箭头左.displayName = "箭头单箭头左";
