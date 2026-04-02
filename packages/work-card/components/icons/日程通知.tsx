import * as React from "react";
import type { IconProps } from "./types";

// ── 日程通知（日历通知图标，多色状态保留原始品牌色）──────────
// 来源：icon/日程通知.svg
export const 日程通知 = React.forwardRef<SVGSVGElement, IconProps>(
  function 日程通知({ size = 20, className, style, ...props }, ref) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        ref={ref}
        {...props}
      >
        <rect x="5.41663" y="2.5" width="1.25" height="3.75" rx="0.625" fill="currentColor" />
        <rect x="13.3334" y="2.5" width="1.25" height="3.75" rx="0.625" fill="currentColor" />
        <path
          d="M2.5 5.83342C2.5 4.91294 3.24619 4.16675 4.16667 4.16675H15.8333C16.7538 4.16675 17.5 4.91294 17.5 5.83341V8.33341H2.5V5.83342Z"
          fill="currentColor"
        />
        <path
          d="M2.5 9.58325H17.5V15.8333C17.5 16.7537 16.7538 17.4999 15.8333 17.4999H4.16667C3.24619 17.4999 2.5 16.7537 2.5 15.8333V9.58325Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
日程通知.displayName = "日程通知";
