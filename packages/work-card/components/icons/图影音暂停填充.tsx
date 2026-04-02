import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-暂停-填充 ────────────────────────────────────────
// 来源：icon/图影音-暂停-填充.svg
export const 图影音暂停填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音暂停填充({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6460-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6460-${uid})`}>
          <path
            d="M15.6924 8C17.7316 8.00004 19.3848 9.6532 19.3848 11.6924V36.3076C19.3848 38.3468 17.7316 40 15.6924 40C13.6532 40 12 38.3468 12 36.3076V11.6924C12 9.65318 13.6532 8 15.6924 8ZM32.3076 8C34.3468 8.00004 36 9.6532 36 11.6924V36.3076C36 38.3468 34.3468 40 32.3076 40C30.2684 40 28.6152 38.3468 28.6152 36.3076V11.6924C28.6152 9.65318 30.2684 8 32.3076 8Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音暂停填充.displayName = "图影音暂停填充";
