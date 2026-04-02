import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-指令 ──────────────────────────────────────────────
// 来源：icon/大模型-指令.svg
export const 大模型指令 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型指令({ size = 48, className, style, ...props }, ref) {
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
        <mask
          id={`mask0-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <path d="M0 0H48V48H0V0Z" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            d="M24 4.5C34.7696 4.5 43.5 13.2304 43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5ZM24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 31.184 12.0917 37.2943 18.5 39.5596V18.1182C18.5 16.2597 20.4559 15.0507 22.1182 15.8818L31.9531 20.7998C33.7619 21.7044 33.8037 24.2701 32.0254 25.2334L21.7148 30.8193C21.6449 30.8572 21.5727 30.8883 21.5 30.9141V40.3105C22.3153 40.4345 23.1501 40.5 24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 14.8873 33.1127 7.5 24 7.5ZM21.5 27.5234L29.752 23.0537L21.5 18.9268V27.5234Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型指令.displayName = "大模型指令";
