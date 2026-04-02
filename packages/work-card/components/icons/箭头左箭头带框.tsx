import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-左箭头-带框（圆形边框内左箭头）──────────────────────────
// 来源：icon/箭头-左箭头-带框.svg
export const 箭头左箭头带框 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头左箭头带框({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5796-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect
              width="48"
              height="48"
              transform="matrix(1 -8.7836e-08 -8.7836e-08 -1 0 48)"
              fill="#FF0606"
            />
          </mask>
          <g mask={`url(#mask0_31_5796-${uid})`}>
            <path
              d="M24 4.5C13.2304 4.5 4.5 13.2304 4.5 24C4.5 34.7696 13.2304 43.5 24 43.5C34.7696 43.5 43.5 34.7696 43.5 24C43.5 13.2304 34.7696 4.5 24 4.5ZM24 7.5C33.1127 7.5 40.5 14.8873 40.5 24C40.5 33.1127 33.1127 40.5 24 40.5C14.8873 40.5 7.5 33.1127 7.5 24C7.5 14.8873 14.8873 7.5 24 7.5ZM27.9893 15.9395C27.4035 15.3538 26.4539 15.3538 25.8682 15.9395L19.1504 22.6572C18.3696 23.4382 18.3695 24.7044 19.1504 25.4854L25.8682 32.2021C26.454 32.7879 27.4045 32.788 27.9902 32.2021C28.5756 31.6164 28.5758 30.6667 27.9902 30.0811L21.9795 24.0713L27.9893 18.0605C28.5749 17.4748 28.575 16.5252 27.9893 15.9395Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头左箭头带框.displayName = "箭头左箭头带框";
