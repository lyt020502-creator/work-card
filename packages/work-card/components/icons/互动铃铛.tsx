import * as React from "react";
import type { IconProps } from "./types";

// ── 互动铃铛（通知铃铛图标）──────────────────────────────────
// 来源：icon/互动-铃铛.svg
export const 互动铃铛 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动铃铛({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5720-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5720-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.0002 5.5C31.3513 5.50017 36.5002 10.6488 36.5002 17V26.1494C36.5002 26.6968 36.6792 27.2296 37.0109 27.665L41.7453 33.8789C43.5006 36.1827 41.8582 39.4997 38.9621 39.5H27.6506C27.6314 39.6369 27.5879 39.7774 27.5109 39.918C26.8318 41.1586 25.5143 41.9999 24.0002 42C22.486 42 21.1677 41.1587 20.4885 39.918C20.4116 39.7775 20.369 39.6368 20.3498 39.5H9.03828C6.14189 39.5 4.49877 36.1828 6.2541 33.8789L10.9885 27.665C11.3202 27.2296 11.5002 26.6968 11.5002 26.1494V17C11.5002 10.6487 16.6489 5.5 23.0002 5.5H25.0002ZM23.0002 8.5C18.3058 8.5 14.5002 12.3056 14.5002 17V26.1494C14.5002 27.3537 14.105 28.5255 13.3752 29.4834L8.64082 35.6973C8.39005 36.0264 8.62451 36.5 9.03828 36.5H38.9621C39.3755 36.4997 39.6099 36.0263 39.3596 35.6973L34.6252 29.4834C33.8953 28.5255 33.5002 27.3537 33.5002 26.1494V17C33.5002 12.3057 29.6945 8.50017 25.0002 8.5H23.0002Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
互动铃铛.displayName = "互动铃铛";
