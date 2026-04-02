import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-长尾箭头-右下（长尾右下箭头图标）───────────────────────
// 来源：icon/箭头-长尾箭头-右下.svg
export const 箭头长尾箭头右下 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头长尾箭头右下({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5943-${uid}`}
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
          <g mask={`url(#mask0_31_5943-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M36.5 33.9999C36.4998 35.3804 35.3805 36.4998 34 36.4999L20 36.4999C19.1716 36.4999 18.5 35.8283 18.5 34.9999C18.5 34.1715 19.1716 33.4999 20 33.4999L31.3789 33.4999L11.9395 14.0604C11.3537 13.4746 11.3537 12.5251 11.9395 11.9393C12.5252 11.3536 13.4748 11.3536 14.0605 11.9393L33.5 31.3788L33.5 19.9999C33.5 19.1715 34.1716 18.4999 35 18.4999C35.8284 18.4999 36.5 19.1715 36.5 19.9999L36.5 33.9999Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头长尾箭头右下.displayName = "箭头长尾箭头右下";
