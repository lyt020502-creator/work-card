import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-箭头-展开（三横线+右箭头展开图标）──────────────────────
// 来源：icon/箭头-箭头-展开.svg
export const 箭头箭头展开 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头箭头展开({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5847-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect width="48" height="48" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5847-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.99994 34.5C2.17159 34.5001 1.49994 35.1716 1.49994 36C1.49994 36.8284 2.17159 37.4999 2.99994 37.5H30.9999C31.8284 37.5 32.4999 36.8284 32.4999 36C32.4999 35.1716 31.8284 34.5 30.9999 34.5H2.99994ZM39.0654 14.4443C38.4823 13.8558 37.5328 13.8515 36.9443 14.4346C36.356 15.0176 36.3515 15.9672 36.9345 16.5557L42.8242 22.5L36.9345 28.4443C36.3514 29.0328 36.3558 29.9824 36.9443 30.5654C37.5328 31.1482 38.4824 31.1441 39.0654 30.5557L45.6523 23.9072C46.4245 23.1277 46.4245 21.8713 45.6523 21.0918L39.0654 14.4443ZM2.99994 22.5C2.17159 22.5001 1.49994 23.1716 1.49994 24C1.49994 24.8284 2.17159 25.4999 2.99994 25.5H30.9999C31.8284 25.5 32.4999 24.8284 32.4999 24C32.4999 23.1716 31.8284 22.5 30.9999 22.5H2.99994ZM2.99994 10.5C2.17151 10.5 1.49994 11.1716 1.49994 12C1.49994 12.8284 2.17151 13.5 2.99994 13.5H30.9999C31.8282 13.4998 32.4999 12.8283 32.4999 12C32.4999 11.1717 31.8282 10.5002 30.9999 10.5H2.99994Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头箭头展开.displayName = "箭头箭头展开";
