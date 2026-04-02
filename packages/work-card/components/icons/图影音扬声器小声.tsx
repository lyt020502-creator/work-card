import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-扬声器-小声 ──────────────────────────────────────
// 来源：icon/图影音-扬声器-小声.svg
export const 图影音扬声器小声 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音扬声器小声({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6599-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6599-${uid})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27.9345 5.59491C30.8127 2.91672 35.5 4.9578 35.5 8.88928V39.1104C35.5 43.0418 30.8127 45.0829 27.9345 42.4047L19.4394 34.4998H13C9.96243 34.4998 7.5 32.0374 7.5 28.9998V18.9998C7.5 15.9623 9.96243 13.4998 13 13.4998H19.4394L27.9345 5.59491ZM32.5 8.88928C32.5 7.57879 30.9376 6.89843 29.9782 7.79116L21.339 15.83C20.8764 16.2605 20.2679 16.4998 19.636 16.4998H13C11.6193 16.4998 10.5 17.6191 10.5 18.9998V28.9998C10.5 30.3805 11.6193 31.4998 13 31.4998H19.636C20.2679 31.4998 20.8764 31.7391 21.339 32.1696L29.9782 40.2085C30.9376 41.1012 32.5 40.4209 32.5 39.1104V8.88928Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音扬声器小声.displayName = "图影音扬声器小声";
