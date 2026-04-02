import * as React from "react";
import type { IconProps } from "./types";

// ── 通知类（喇叭/通知图标，多色状态保留原始品牌色）──────────────
// 来源：icon/通知类.svg
export const 通知类 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通知类({ size = 20, className, style, ...props }, ref) {
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
        <rect x="14.2352" y="9.4502" width="4.36173" height="1.30852" rx="0.654259" fill="currentColor" />
        <rect x="14.2003" y="5.3501" width="4.36173" height="1.30852" rx="0.654259" transform="rotate(-30 14.2003 5.3501)" fill="currentColor" />
        <rect width="4.36173" height="1.30852" rx="0.654259" transform="matrix(-0.866025 -0.5 -0.5 0.866025 18.6318 15.9053)" fill="currentColor" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.81627 5.95679C2.01647 5.95679 1.3681 6.60516 1.3681 7.40495V12.5953C1.3681 13.3951 2.01647 14.0434 2.81627 14.0434H5.07558V5.95679H2.81627ZM5.94793 5.94133V14.0589C5.97896 14.0683 6.00875 14.0818 6.03643 14.0993L10.4982 16.9141C11.2214 17.3704 12.1638 16.8507 12.1638 15.9955V4.00462C12.1638 3.14948 11.2214 2.62974 10.4982 3.08604L6.03643 5.90094C6.00875 5.91841 5.97896 5.93196 5.94793 5.94133Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
通知类.displayName = "通知类";
