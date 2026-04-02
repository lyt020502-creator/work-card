import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-长尾箭头-下（长尾下箭头图标）───────────────────────────
// 来源：icon/箭头-长尾箭头-下.svg
export const 箭头长尾箭头下 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头长尾箭头下({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_6011-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect
              x="48"
              y="48"
              width="48"
              height="48"
              transform="rotate(-180 48 48)"
              fill="#FF0606"
            />
          </mask>
          <g mask={`url(#mask0_31_6011-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.7684 40.3532C24.7921 41.3294 23.2092 41.3294 22.2329 40.3532L11.9391 30.0608C11.3536 29.4751 11.3536 28.5252 11.9391 27.9394C12.5248 27.3537 13.4746 27.3539 14.0604 27.9394L22.5008 36.3785L22.5001 8.49953C22.5003 7.67132 23.1717 6.99984 24 6.99969C24.8284 6.99969 25.5005 7.67179 25.5005 8.50022L25.5005 36.3785L33.9395 27.9394C34.5253 27.3537 35.475 27.3537 36.0608 27.9394C36.6466 28.5252 36.6466 29.475 36.0608 30.0608L25.7684 40.3532Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头长尾箭头下.displayName = "箭头长尾箭头下";
