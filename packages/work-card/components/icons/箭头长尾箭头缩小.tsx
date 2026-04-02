import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-长尾箭头-缩小（对角线长尾缩小箭头图标）──────────────────
// 来源：icon/箭头-长尾箭头-缩小.svg
export const 箭头长尾箭头缩小 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头长尾箭头缩小({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5921-${uid}`}
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
          <g mask={`url(#mask0_31_5921-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M29.4935 21.0013C28.1129 21.0012 26.9938 19.8821 26.9937 18.5016L26.9937 10.501C26.994 9.67283 27.6653 9.00125 28.4936 9.0012C29.3219 9.0012 29.9932 9.6728 29.9934 10.501L29.9934 15.8817L39.9344 5.94075C40.52 5.35508 41.4699 5.35529 42.0557 5.94075C42.6415 6.52654 42.6415 7.47629 42.0557 8.06207L32.1161 18.0016L37.494 18.0016C38.3223 18.0018 38.9938 18.6731 38.9938 19.5015C38.9938 20.3298 38.3223 21.0011 37.494 21.0013L29.4935 21.0013ZM5.9373 42.0633C5.35098 41.4767 5.35089 40.5257 5.9373 39.9392L15.8748 30.0017L10.4997 30.0017C9.67123 30.0017 8.99912 29.3296 8.99912 28.5012C8.99926 27.6731 9.67089 27.0017 10.499 27.0013L18.4995 27.0013C19.8801 27.0013 20.999 28.1205 20.9992 29.5011L20.9992 37.5016C20.9991 38.33 20.3278 39.0014 19.4994 39.0014C18.6711 39.0014 17.9996 38.3299 17.9995 37.5016L17.9995 32.1265L8.06207 42.064C7.47544 42.6505 6.52387 42.6499 5.9373 42.0633Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头长尾箭头缩小.displayName = "箭头长尾箭头缩小";
