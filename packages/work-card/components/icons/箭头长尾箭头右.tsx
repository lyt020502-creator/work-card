import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-长尾箭头-右（长尾右箭头图标）───────────────────────────
// 来源：icon/箭头-长尾箭头-右.svg
export const 箭头长尾箭头右 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头长尾箭头右({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5837-${uid}`}
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
          <g mask={`url(#mask0_31_5837-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M40.3531 22.232C41.3293 23.2083 41.3293 24.7913 40.3531 25.7676L30.06 36.0607C29.4742 36.6462 28.5244 36.6464 27.9387 36.0607C27.3532 35.4749 27.3532 34.5251 27.9387 33.9393L36.3784 25.4996L8.50018 25.4996C7.67175 25.4996 7.00034 24.8282 7.00034 23.9998C7.00043 23.1715 7.67181 22.5 8.50018 22.5L36.3784 22.5L27.9394 14.0609C27.3536 13.4752 27.3536 12.5254 27.9394 11.9396C28.5252 11.3538 29.4749 11.3538 30.0607 11.9396L40.3531 22.232Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头长尾箭头右.displayName = "箭头长尾箭头右";
