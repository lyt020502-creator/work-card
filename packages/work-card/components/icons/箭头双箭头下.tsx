import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-双箭头-下（双 chevron 下箭头图标）───────────────────────
// 来源：icon/箭头-双箭头-下.svg
export const 箭头双箭头下 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头双箭头下({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5903-${uid}`}
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
          <g mask={`url(#mask0_31_5903-${uid})`}>
            <path
              d="M25.7678 25.3533C24.7915 26.3296 23.2085 26.3296 22.2322 25.3533L7.93956 11.0607C7.35377 10.4749 7.35377 9.52513 7.93956 8.93934C8.52537 8.35378 9.47517 8.35363 10.0609 8.93934L24 22.8785L37.9391 8.93934C38.5249 8.35356 39.4747 8.35356 40.0604 8.93934C40.6462 9.52513 40.6462 10.4749 40.0604 11.0607L25.7678 25.3533ZM25.7678 38.3533C24.7915 39.3296 23.2085 39.3296 22.2322 38.3533L7.93956 24.0607C7.35377 23.4749 7.35377 22.5251 7.93956 21.9393C8.52536 21.3538 9.47517 21.3536 10.0609 21.9393L24 35.8785L37.9391 21.9393C38.5249 21.3536 39.4747 21.3536 40.0604 21.9393C40.6462 22.5251 40.6462 23.4749 40.0604 24.0607L25.7678 38.3533Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头双箭头下.displayName = "箭头双箭头下";
