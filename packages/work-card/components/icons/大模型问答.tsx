import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-问答 ──────────────────────────────────────────────────
// 来源：icon/大模型-问答.svg
export const 大模型问答 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型问答({ size = 48, className, style, ...props }, ref) {
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
          <rect width="48" height="48" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            d="M31.5 5.5C34.5376 5.5 37 7.96243 37 11V16.5H39.5C42.5376 16.5 45 18.9624 45 22V40.6875C44.9998 43.3211 42.2007 45.0108 39.8701 43.7842L33.6289 40.5H20.5C17.4624 40.5 15 38.0376 15 35V31.6943L9.12988 34.7842C6.79928 36.0108 4.00016 34.3211 4 31.6875V11C4 7.96243 6.46243 5.5 9.5 5.5H31.5ZM37 26C37 29.0376 34.5376 31.5 31.5 31.5H18V35C18 36.3807 19.1193 37.5 20.5 37.5H33.7529C34.1586 37.5 34.558 37.5992 34.917 37.7881L41.2676 41.1299C41.6004 41.3047 41.9998 41.0635 42 40.6875V22C42 20.6193 40.8807 19.5 39.5 19.5H37V26ZM9.5 8.5C8.11929 8.5 7 9.61929 7 11V31.6875C7.00016 32.0635 7.39961 32.3047 7.73242 32.1299L14.083 28.7881C14.442 28.5991 14.8414 28.5 15.2471 28.5H31.5C32.8807 28.5 34 27.3807 34 26V11C34 9.61929 32.8807 8.5 31.5 8.5H9.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型问答.displayName = "大模型问答";
