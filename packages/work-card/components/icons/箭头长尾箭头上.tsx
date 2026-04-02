import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-长尾箭头-上（长尾上箭头图标）───────────────────────────
// 来源：icon/箭头-长尾箭头-上.svg
export const 箭头长尾箭头上 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头长尾箭头上({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_6031-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect width="48" height="48" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_6031-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.2316 7.64683C23.2079 6.67057 24.7908 6.67063 25.7671 7.64683L36.0609 17.9392C36.6464 18.5249 36.6464 19.4748 36.0609 20.0606C35.4752 20.6463 34.5254 20.6461 33.9396 20.0606L25.4992 11.6215L25.4999 39.5005C25.4997 40.3287 24.8283 41.0002 24 41.0003C23.1716 41.0003 22.4995 40.3282 22.4995 39.4998L22.4995 11.6215L14.0605 20.0606C13.4747 20.6463 12.525 20.6463 11.9392 20.0606C11.3534 19.4748 11.3534 18.525 11.9392 17.9392L22.2316 7.64683Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头长尾箭头上.displayName = "箭头长尾箭头上";
