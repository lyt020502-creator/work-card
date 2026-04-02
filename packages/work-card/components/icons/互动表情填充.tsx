import * as React from "react";
import type { IconProps } from "./types";

// ── 互动表情填充（填充笑脸图标）──────────────────────────────
// 来源：icon/互动-表情-填充.svg
export const 互动表情填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动表情填充({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5987-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect width="48" height="48" transform="matrix(1 -8.7836e-08 -8.7836e-08 -1 0 48)" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5987-${uid})`}>
            <path
              d="M24 4.5C13.2304 4.5 4.5 13.2304 4.5 24C4.5 34.7696 13.2304 43.5 24 43.5C34.7696 43.5 43.5 34.7696 43.5 24C43.5 13.2304 34.7696 4.5 24 4.5ZM27.5 25C28.0523 25 28.5 25.4477 28.5 26V27C28.5 29.7614 26.2614 32 23.5 32H22.5C19.7386 32 17.5 29.7614 17.5 27V26C17.5 25.4477 17.9477 25 18.5 25H27.5ZM30.5 15.999C32.1569 15.999 33.5 17.3422 33.5 18.999C33.5 20.6559 32.1569 21.999 30.5 21.999C28.8431 21.999 27.5 20.6559 27.5 18.999C27.5 17.3422 28.8431 15.999 30.5 15.999ZM17 15.999C18.6569 15.999 20 17.3422 20 18.999C20 20.6559 18.6569 21.999 17 21.999C15.3431 21.999 14 20.6559 14 18.999C14 17.3422 15.3431 15.999 17 15.999Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
互动表情填充.displayName = "互动表情填充";
