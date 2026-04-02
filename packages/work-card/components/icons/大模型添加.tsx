import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-添加（十字加号图标）──────────────────────────────────
// 来源：icon/大模型-添加.svg → component-docs/src/components/icons/ai.jsx
export const 大模型添加 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型添加({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_6221-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect width="48" height="48" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_6221-${uid})`}>
            <path
              d="M24 4C24.8284 4 25.5 4.67157 25.5 5.5V22.5H42.5C43.3284 22.5 44 23.1716 44 24C44 24.8284 43.3284 25.5 42.5 25.5H25.5V42.5C25.5 43.3284 24.8284 44 24 44C23.1716 44 22.5 43.3284 22.5 42.5V25.5H5.5C4.67157 25.5 4 24.8284 4 24C4 23.1716 4.67157 22.5 5.5 22.5H22.5V5.5C22.5 4.67157 23.1716 4 24 4Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
大模型添加.displayName = "大模型添加";
