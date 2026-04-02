import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-长尾箭头-左（长尾左箭头图标）───────────────────────────
// 来源：icon/箭头-长尾箭头-左.svg
export const 箭头长尾箭头左 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头长尾箭头左({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5686-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect
              y="48"
              width="48"
              height="48"
              transform="rotate(-90 0 48)"
              fill="#FF0606"
            />
          </mask>
          <g mask={`url(#mask0_31_5686-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.64687 25.768C6.67066 24.7917 6.67069 23.2087 7.64687 22.2324L17.94 11.9393C18.5258 11.3538 19.4756 11.3536 20.0613 11.9393C20.6468 12.5251 20.6468 13.4749 20.0613 14.0607L11.6216 22.5004L39.4998 22.5004C40.3283 22.5004 40.9997 23.1718 40.9997 24.0002C40.9996 24.8285 40.3282 25.5 39.4998 25.5L11.6216 25.5L20.0606 33.9391C20.6464 34.5248 20.6464 35.4746 20.0606 36.0604C19.4748 36.6462 18.5251 36.6462 17.9393 36.0604L7.64687 25.768Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头长尾箭头左.displayName = "箭头长尾箭头左";
