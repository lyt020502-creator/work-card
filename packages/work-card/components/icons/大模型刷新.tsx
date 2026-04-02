import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-刷新（圆弧旋转图标，用作加载 Spinner）────────────────
// 来源：icon/大模型-刷新.svg → component-docs/src/components/icons/ai.jsx
export const 大模型刷新 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型刷新({ size = 48, className, style, ...props }, ref) {
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
        <g clipPath={`url(#clip0_31_5876-${uid})`}>
          <mask
            id={`mask0_31_5876-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <path
              d="M48 0L48 48L1.70663e-06 48L3.8147e-06 -2.10806e-06L48 0Z"
              fill="#FF0606"
            />
          </mask>
          <g mask={`url(#mask0_31_5876-${uid})`}>
            <path
              d="M24.2363 6.5C30.9472 6.50009 36.7952 10.1798 39.8076 15.6162L41.96 14.876C42.9085 14.5494 43.8225 15.4456 43.5146 16.4004L41.5342 22.5439C41.2851 23.3164 40.3642 23.6331 39.6924 23.1777L34.3496 19.5566C33.5193 18.9938 33.6874 17.7242 34.6357 17.3975L36.918 16.6113C34.3526 12.358 29.6377 9.50008 24.2363 9.5C16.077 9.5 9.5 16.0125 9.5 24C9.5 31.9875 16.077 38.5 24.2363 38.5C29.3701 38.4999 33.8842 35.9189 36.5225 32.0088C36.9858 31.3221 37.9187 31.1412 38.6055 31.6045C39.2918 32.0679 39.473 32.9999 39.0098 33.6865C35.8306 38.3985 30.397 41.4999 24.2363 41.5C14.4617 41.5 6.5 33.6856 6.5 24C6.5 14.3144 14.4617 6.5 24.2363 6.5Z"
              fill="currentColor"
            />
          </g>
        </g>
        <defs>
          <clipPath id={`clip0_31_5876-${uid}`}>
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
);
大模型刷新.displayName = "大模型刷新";
