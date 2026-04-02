import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-播放 ──────────────────────────────────────────────
// 来源：icon/图影音-播放.svg
export const 图影音播放 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音播放({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6543-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6543-${uid})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.325 9.09681C14.6599 8.05611 12.5 9.25321 12.5 11.2168V36.7828C12.5 38.7464 14.6599 39.9435 16.325 38.9028L36.7778 26.1198C38.3445 25.1406 38.3445 22.859 36.7778 21.8798L16.325 9.09681ZM9.5 11.2168C9.5 6.89691 14.2517 4.26327 17.915 6.55281L38.3678 19.3358C41.8145 21.49 41.8145 26.5096 38.3678 28.6638L17.915 41.4468C14.2517 43.7364 9.5 41.1027 9.5 36.7828V11.2168Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音播放.displayName = "图影音播放";
