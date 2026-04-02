import * as React from "react";
import type { IconProps } from "./types";

// ── 互动我关注的（眼睛图标）──────────────────────────────────
// 来源：icon/互动-我关注的.svg
export const 互动我关注的 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动我关注的({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5725-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5725-${uid})`}>
            <path
              d="M24 6C36.7025 6 47 16.8379 47 24C47 31.1621 36.7025 42 24 42C11.2975 42 1 31.1621 1 24C1 16.8379 11.2975 6 24 6ZM24 9C18.5015 9 13.4253 11.3559 9.7002 14.582C5.85398 17.9132 4 21.658 4 24C4 26.342 5.85398 30.0868 9.7002 33.418C13.4253 36.6441 18.5015 39 24 39C29.4985 39 34.5747 36.6441 38.2998 33.418C42.146 30.0868 44 26.342 44 24C44 21.658 42.146 17.9132 38.2998 14.582C34.5747 11.3559 29.4985 9 24 9ZM24 15.5C28.6944 15.5 32.5 19.3056 32.5 24C32.5 28.6944 28.6944 32.5 24 32.5C19.3056 32.5 15.5 28.6944 15.5 24C15.5 19.3056 19.3056 15.5 24 15.5ZM24 18.5C20.9624 18.5 18.5 20.9624 18.5 24C18.5 27.0376 20.9624 29.5 24 29.5C27.0376 29.5 29.5 27.0376 29.5 24C29.5 20.9624 27.0376 18.5 24 18.5Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
互动我关注的.displayName = "互动我关注的";
