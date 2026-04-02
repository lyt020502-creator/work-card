import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-收起小窗（收起画中画/小窗图标）─────────────────────────
// 来源：icon/箭头-收起小窗.svg
export const 箭头收起小窗 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头收起小窗({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5897-${uid}`}
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
              transform="matrix(1 0 0 -1 0 48)"
              fill="#FF0606"
            />
          </mask>
          <g mask={`url(#mask0_31_5897-${uid})`}>
            <path
              d="M29 41.5C32.0376 41.5 34.5 39.0376 34.5 36V33.5C34.5 32.6716 33.8284 32 33 32C32.1716 32 31.5 32.6716 31.5 33.5V36C31.5 37.3807 30.3807 38.5 29 38.5H11C9.61929 38.5 8.5 37.3807 8.5 36L8.5 12C8.5 10.6193 9.61929 9.5 11 9.5H29C30.3807 9.5 31.5 10.6193 31.5 12V14C31.5 14.8284 32.1716 15.5 33 15.5C33.8284 15.5 34.5 14.8284 34.5 14V12C34.5 8.96243 32.0376 6.5 29 6.5H11C7.96243 6.5 5.5 8.96243 5.5 12L5.5 36C5.5 39.0376 7.96243 41.5 11 41.5H29ZM36.9395 29.3027C37.5253 29.8885 38.4748 29.8885 39.0605 29.3027L43.3027 25.0596C43.8884 24.4738 43.8885 23.5242 43.3027 22.9385L39.0605 18.6963C38.4748 18.1106 37.5252 18.1105 36.9395 18.6963C36.3537 19.2821 36.3537 20.2316 36.9395 20.8174L38.6221 22.5H26C25.1716 22.5 24.5 23.1716 24.5 24C24.5 24.8284 25.1716 25.5 26 25.5H38.6201L36.9395 27.1816C36.3537 27.7674 36.3537 28.717 36.9395 29.3027Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头收起小窗.displayName = "箭头收起小窗";
