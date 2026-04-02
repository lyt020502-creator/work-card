import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-长尾箭头-左下（长尾左下箭头图标）───────────────────────
// 来源：icon/箭头-长尾箭头-左下.svg
export const 箭头长尾箭头左下 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头长尾箭头左下({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5928-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect
              x="0.131868"
              y="0.131868"
              width="47.7363"
              height="47.7363"
              fill="#FF0606"
              stroke="#5C6F95"
              strokeWidth="0.263736"
            />
          </mask>
          <g mask={`url(#mask0_31_5928-${uid})`}>
                     <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.0011 36.5C12.6204 36.5 11.5012 35.3806 11.5011 34L11.5001 20C11.5001 19.1717 12.1718 18.5001 13.0001 18.5C13.8285 18.5 14.5001 19.1716 14.5001 20L14.5011 31.3789L33.9396 11.9395C34.5254 11.3537 35.4749 11.3537 36.0607 11.9395C36.6464 12.5252 36.6464 13.4748 36.0607 14.0605L16.6212 33.5L28.0001 33.5C28.8285 33.5 29.5001 34.1716 29.5001 35C29.5001 35.8284 28.8285 36.5 28.0001 36.5L14.0011 36.5Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头长尾箭头左下.displayName = "箭头长尾箭头左下";
