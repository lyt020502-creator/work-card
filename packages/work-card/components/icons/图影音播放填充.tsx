import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-播放-填充 ────────────────────────────────────────
// 来源：icon/图影音-播放-填充.svg
export const 图影音播放填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音播放填充({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6457-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6457-${uid})`}>
          <path
            d="M17.988 39.9166C15.5834 41.4468 14.3811 42.2119 13.3876 42.1377C12.5218 42.073 11.7264 41.6364 11.207 40.9406C10.611 40.1423 10.611 38.7172 10.611 35.867L10.611 12.1329C10.611 9.28267 10.611 7.85757 11.207 7.05922C11.7264 6.36343 12.5218 5.92681 13.3876 5.86216C14.3811 5.78798 15.5834 6.55309 17.988 8.0833L36.6363 19.9505C38.7514 21.2965 39.809 21.9695 40.1733 22.8273C40.4916 23.5768 40.4916 24.4234 40.1733 25.1728C39.8089 26.0307 38.7514 26.7037 36.6363 28.0497L17.988 39.9166Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音播放填充.displayName = "图影音播放填充";
