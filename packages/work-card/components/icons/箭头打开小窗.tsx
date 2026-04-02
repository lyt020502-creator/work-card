import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-打开小窗（打开画中画/小窗图标）─────────────────────────
// 来源：icon/箭头-打开小窗.svg
export const 箭头打开小窗 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头打开小窗({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5881-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect width="48" height="48" fill="white" />
          </mask>
          <g mask={`url(#mask0_31_5881-${uid})`}>
            <path
              d="M19 41.5C15.9624 41.5 13.5 39.0376 13.5 36V33.5C13.5 32.6716 14.1716 32 15 32C15.8284 32 16.5 32.6716 16.5 33.5V36C16.5 37.3807 17.6193 38.5 19 38.5H37C38.3807 38.5 39.5 37.3807 39.5 36V12C39.5 10.6193 38.3807 9.5 37 9.5L19 9.5C17.6193 9.5 16.5 10.6193 16.5 12V14C16.5 14.8284 15.8284 15.5 15 15.5C14.1716 15.5 13.5 14.8284 13.5 14V12C13.5 8.96243 15.9624 6.5 19 6.5H37C40.0376 6.5 42.5 8.96243 42.5 12L42.5 36C42.5 39.0376 40.0376 41.5 37 41.5H19ZM11.0605 29.3027C10.4747 29.8885 9.5252 29.8885 8.93945 29.3027L4.69727 25.0596C4.11156 24.4738 4.11151 23.5242 4.69727 22.9385L8.93945 18.6963C9.52523 18.1106 10.4748 18.1105 11.0605 18.6963C11.6463 19.2821 11.6463 20.2316 11.0605 20.8174L9.37793 22.5H22C22.8284 22.5 23.5 23.1716 23.5 24C23.5 24.8284 22.8284 25.5 22 25.5L9.37988 25.5L11.0605 27.1816C11.6463 27.7674 11.6463 28.717 11.0605 29.3027Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头打开小窗.displayName = "箭头打开小窗";
