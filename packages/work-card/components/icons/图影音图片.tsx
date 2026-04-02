import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-图片 ──────────────────────────────────────────────
// 来源：icon/图影音-图片.svg
export const 图影音图片 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音图片({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6643-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6643-${uid})`}>
          <path
            d="M38.5 7C41.5375 7.00011 44 9.46251 44 12.5V35.5C44 38.5375 41.5375 40.9999 38.5 41H9.51465C6.47823 41 4.01627 38.5394 4.01465 35.5029L4.00195 12.5029C4.00033 9.46422 6.46324 7 9.50195 7H38.5ZM16.4219 24.6602C15.4565 23.7599 13.9579 23.7648 12.999 24.6719L7.03027 30.3193L7.01172 30.2988L7.01465 35.501C7.01539 36.8812 8.13446 38 9.51465 38H38.5C39.8806 37.9999 41 36.8806 41 35.5V34.2725L32.0518 26.7031C31.119 25.914 29.7523 25.914 28.8203 26.7041L24.4922 30.374C23.912 30.8658 23.0553 30.8459 22.499 30.3271L16.4219 24.6602ZM9.50195 10C8.12084 10 7.00141 11.1199 7.00195 12.501L7.00879 26.209L10.9365 22.4932C13.046 20.4972 16.3438 20.4853 18.4678 22.4658L23.5693 27.2227L26.8809 24.416C28.9313 22.6778 31.9381 22.6759 33.9902 24.4121L41 30.3418V12.5C41 11.1194 39.8806 10.0001 38.5 10H9.50195ZM32.5 14C33.8807 14 35 15.1193 35 16.5C35 17.8807 33.8807 19 32.5 19C31.1193 19 30 17.8807 30 16.5C30 15.1193 31.1193 14 32.5 14Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音图片.displayName = "图影音图片";
