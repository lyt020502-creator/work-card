import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-箭头-收起（三横线+左箭头收起图标）──────────────────────
// 来源：icon/箭头-箭头-收起.svg
export const 箭头箭头收起 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头箭头收起({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5864-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect
              width="48"
              height="48"
              transform="matrix(1 -2.06594e-10 -2.06594e-10 -1 0 48)"
              fill="#FF0606"
            />
          </mask>
          <g mask={`url(#mask0_31_5864-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M44.731 13.5C45.5594 13.4999 46.231 12.8284 46.231 12C46.231 11.1716 45.5594 10.5001 44.731 10.5H16.731C15.9026 10.5 15.231 11.1716 15.231 12C15.231 12.8284 15.9026 13.5 16.731 13.5H44.731ZM8.66559 33.5557C9.24864 34.1442 10.1982 34.1485 10.7867 33.5654C11.3749 32.9824 11.3794 32.0328 10.7964 31.4443L4.9068 25.5L10.7964 19.5557C11.3795 18.9672 11.3752 18.0176 10.7867 17.4346C10.1982 16.8518 9.24857 16.8559 8.66559 17.4443L2.07867 24.0928C1.3065 24.8723 1.30642 26.1287 2.07867 26.9082L8.66559 33.5557ZM44.731 25.5C45.5594 25.4999 46.231 24.8284 46.231 24C46.231 23.1716 45.5594 22.5001 44.731 22.5L16.731 22.5C15.9026 22.5 15.231 23.1716 15.231 24C15.231 24.8284 15.9026 25.5 16.731 25.5L44.731 25.5ZM44.731 37.5C45.5594 37.5 46.231 36.8284 46.231 36C46.231 35.1716 45.5594 34.5 44.731 34.5L16.731 34.5C15.9027 34.5002 15.231 35.1717 15.231 36C15.231 36.8283 15.9027 37.4998 16.731 37.5L44.731 37.5Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头箭头收起.displayName = "箭头箭头收起";
