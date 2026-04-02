import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-缩小（对角线缩小箭头图标）──────────────────────────────
// 来源：icon/箭头-缩小.svg
export const 箭头缩小 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头缩小({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5854-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect width="48" height="48" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5854-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.5024 26.9992C19.8829 26.9994 21.0021 28.1184 21.0022 29.4989L21.0022 42.4989C21.0022 43.3273 20.3301 43.9994 19.5017 43.9994C18.6735 43.9992 18.0021 43.3277 18.0018 42.4996L18.0018 29.9995L5.50177 29.9995C4.67362 29.9994 4.00224 29.3278 4.00193 28.4997C4.00193 27.6713 4.67403 26.9991 5.50246 26.9991L18.5024 26.9992ZM42.4999 18.0001C43.3283 18.0001 43.9997 18.6716 43.9997 19.5C43.9997 20.3284 43.3283 20.9998 42.4999 20.9998L29.4999 20.9998C28.1192 20.9997 27.0002 19.8807 27.0002 18.5001L27.0002 5.50007C27.0002 4.67164 27.6716 4.00023 28.5 4.00023C29.3284 4.00023 29.9998 4.67164 29.9998 5.50007L29.9998 18.0001L42.4999 18.0001Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头缩小.displayName = "箭头缩小";
