import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-重新生成 ──────────────────────────────────────────────
// 来源：icon/大模型-重新生成.svg
export const 大模型重新生成 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型重新生成({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <path d="M48 0L48 48L1.70663e-06 48L3.8147e-06 -2.10806e-06L48 0Z" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.4774 8.84632C24.9424 3.95903 35.7449 6.74544 40.5877 15.1334C45.4305 23.5214 42.4424 34.2696 33.9774 39.1569C28.642 42.2372 22.3855 42.2681 17.2762 39.777C16.5318 39.4138 16.2228 38.5157 16.5858 37.7711C16.9489 37.0267 17.8471 36.7177 18.5916 37.0807C22.8315 39.1478 28.0314 39.126 32.4774 36.5592C39.5436 32.4796 41.9828 23.5508 37.9891 16.6334C33.9953 9.71623 25.0435 7.36437 17.9774 11.444C13.1323 14.2413 10.4576 19.3261 10.5496 24.4772L13.0887 21.9391C13.6745 21.3534 14.624 21.3535 15.2098 21.9391C15.7956 22.5249 15.7955 23.4744 15.2098 24.0602L10.9676 28.3034C9.99131 29.2797 8.40779 29.2797 7.43148 28.3034L3.1893 24.0602C2.6036 23.4744 2.60354 22.5249 3.1893 21.9391C3.77506 21.3534 4.72463 21.3534 5.31039 21.9391L7.54965 24.1774C7.56476 18.0843 10.7746 12.1389 16.4774 8.84632Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型重新生成.displayName = "大模型重新生成";
