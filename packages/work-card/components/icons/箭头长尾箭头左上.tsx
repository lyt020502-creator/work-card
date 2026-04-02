import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-长尾箭头-左上（长尾左上箭头图标）───────────────────────
// 来源：icon/箭头-长尾箭头-左上.svg
export const 箭头长尾箭头左上 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头长尾箭头左上({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5973-${uid}`}
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
          <g mask={`url(#mask0_31_5973-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.5 14.0001C11.5002 12.6196 12.6195 11.5002 14 11.5001L28 11.5001C28.8284 11.5001 29.5 12.1717 29.5 13.0001C29.5 13.8285 28.8284 14.5001 28 14.5001L16.6211 14.5001L36.0605 33.9396C36.6463 34.5254 36.6463 35.4749 36.0605 36.0607C35.4748 36.6464 34.5252 36.6464 33.9395 36.0607L14.5 16.6212L14.5 28.0001C14.5 28.8285 13.8284 29.5001 13 29.5001C12.1716 29.5001 11.5 28.8285 11.5 28.0001L11.5 14.0001Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头长尾箭头左上.displayName = "箭头长尾箭头左上";
