import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-右箭头-带框（圆形边框内右箭头）──────────────────────────
// 来源：icon/箭头-右箭头-带框.svg
export const 箭头右箭头带框 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头右箭头带框({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5801-${uid}`}
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
          <g mask={`url(#mask0_31_5801-${uid})`}>
            <path
              d="M24 4.5C34.7696 4.5 43.5 13.2304 43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5ZM24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 33.1127 14.8873 40.5 24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 14.8873 33.1127 7.5 24 7.5ZM20.0107 15.9395C20.5965 15.3538 21.5461 15.3538 22.1318 15.9395L28.8496 22.6572C29.6304 23.4382 29.6305 24.7044 28.8496 25.4854L22.1318 32.2021C21.546 32.7879 20.5955 32.788 20.0098 32.2021C19.4244 31.6164 19.4242 30.6667 20.0098 30.0811L26.0205 24.0713L20.0107 18.0605C19.4251 17.4748 19.425 16.5252 20.0107 15.9395Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头右箭头带框.displayName = "箭头右箭头带框";
