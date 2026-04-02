import * as React from "react";
import type { IconProps } from "./types";

// ── 互动表情（笑脸图标）──────────────────────────────────────
// 来源：icon/互动-表情.svg
export const 互动表情 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动表情({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5664-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect width="48" height="48" transform="matrix(1 -8.7836e-08 -8.7836e-08 -1 0 48)" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5664-${uid})`}>
            <path
              d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 7C33.3888 7 41 14.6112 41 24C41 33.3888 33.3888 41 24 41C14.6112 41 7 33.3888 7 24C7 14.6112 14.6112 7 24 7ZM17 25.499C15.7112 25.4991 14.3083 26.6155 14.6211 28.2715C15.3592 32.1765 19.3405 35.499 24 35.499C28.6595 35.499 32.6418 32.1765 33.3799 28.2715C33.6926 26.6156 32.2888 25.499 31 25.499H17ZM30.2051 28.499C29.3908 30.5909 26.9692 32.499 24 32.499C21.0309 32.499 18.6102 30.5909 17.7959 28.499H30.2051ZM30 16.999C28.6193 16.999 27.5 18.1183 27.5 19.499C27.5 20.8797 28.6193 21.999 30 21.999C31.3807 21.999 32.5 20.8797 32.5 19.499C32.5 18.1183 31.3807 16.999 30 16.999ZM18 16.999C16.6193 16.999 15.5 18.1183 15.5 19.499C15.5 20.8797 16.6193 21.999 18 21.999C19.3807 21.999 20.5 20.8797 20.5 19.499C20.5 18.1183 19.3807 16.999 18 16.999Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
互动表情.displayName = "互动表情";
