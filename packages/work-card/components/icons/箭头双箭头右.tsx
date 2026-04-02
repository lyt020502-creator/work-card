import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-双箭头-右（双 chevron 右箭头图标）───────────────────────
// 来源：icon/箭头-双箭头-右.svg
export const 箭头双箭头右 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头双箭头右({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5871-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect width="48" height="48" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5871-${uid})`}>
            <path
              d="M25.3533 22.2322C26.3296 23.2085 26.3296 24.7915 25.3533 25.7678L11.0607 40.0604C10.4749 40.6462 9.52513 40.6462 8.93934 40.0604C8.35378 39.4746 8.35363 38.5248 8.93934 37.9391L22.8785 24L8.93934 10.0609C8.35356 9.4751 8.35356 8.52535 8.93934 7.93956C9.52513 7.3538 10.4749 7.35378 11.0607 7.93956L25.3533 22.2322ZM38.3533 22.2322C39.3296 23.2085 39.3296 24.7915 38.3533 25.7678L24.0607 40.0604C23.4749 40.6462 22.5251 40.6462 21.9393 40.0604C21.3538 39.4746 21.3536 38.5248 21.9393 37.9391L35.8785 24L21.9393 10.0609C21.3536 9.4751 21.3536 8.52535 21.9393 7.93956C22.5251 7.35379 23.4749 7.35378 24.0607 7.93956L38.3533 22.2322Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头双箭头右.displayName = "箭头双箭头右";
