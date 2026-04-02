import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-长尾箭头-右上（长尾右上箭头图标）───────────────────────
// 来源：icon/箭头-长尾箭头-右上.svg
export const 箭头长尾箭头右上 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头长尾箭头右上({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5958-${uid}`}
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
          <g mask={`url(#mask0_31_5958-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M33.9989 11.5C35.3796 11.5 36.4988 12.6194 36.4989 14L36.4999 28C36.4999 28.8283 35.8282 29.4999 34.9999 29.5C34.1715 29.5 33.4999 28.8284 33.4999 28L33.4989 16.6211L14.0604 36.0605C13.4746 36.6463 12.5251 36.6463 11.9393 36.0605C11.3536 35.4748 11.3536 34.5252 11.9393 33.9395L31.3788 14.5H19.9999C19.1715 14.5 18.4999 13.8284 18.4999 13C18.4999 12.1716 19.1715 11.5 19.9999 11.5H33.9989Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头长尾箭头右上.displayName = "箭头长尾箭头右上";
