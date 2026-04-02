import * as React from "react";
import type { IconProps } from "./types";

// ── 发送（纸飞机发送图标）──────────────────────────────────────
// 来源：icon/发送.svg
export const 发送 = React.forwardRef<SVGSVGElement, IconProps>(
  function 发送({ size = 24, className, style, ...props }, ref) {
    const uid = React.useId();
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        ref={ref}
        {...props}
      >
        <mask
          id={`mask0_265_1162-${uid}`}
          style={{ maskType: "luminance" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill="white" />
        </mask>
        <g mask={`url(#mask0_265_1162-${uid})`}>
          <mask
            id={`mask1_265_1162-${uid}`}
            style={{ maskType: "luminance" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="white" />
          </mask>
          <g mask={`url(#mask1_265_1162-${uid})`}>
            <path
              d="M8.39252 20.2762C7.91473 20.605 7.2691 20.2368 7.30907 19.6582L7.59564 15.524L7.60393 15.5295L7.60255 15.5309L11.2203 18.3296L8.39252 20.2762ZM18.069 3.17513C19.2886 2.74116 20.4985 3.84555 20.1772 5.09965L16.4759 19.5415C16.1873 20.6675 14.8397 21.1303 13.9202 20.4191L11.2203 18.3296H11.2216L7.60393 15.5295L12.5592 10.9084C12.813 10.6716 12.8274 10.2732 12.591 10.019C12.354 9.76458 11.9551 9.75082 11.7009 9.98794L6.59437 14.7506L2.30339 11.4318C1.29236 10.6497 1.54599 9.05915 2.75017 8.63035L18.069 3.17513Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
发送.displayName = "发送";
