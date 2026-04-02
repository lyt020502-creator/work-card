import * as React from "react";
import type { IconProps } from "./types";

// ── 互动关闭铃铛（静音铃铛图标）──────────────────────────────
// 来源：icon/互动-关闭铃铛.svg
export const 互动关闭铃铛 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动关闭铃铛({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_7054-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_7054-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26 38C27.1046 38 28.0414 38.949 27.5111 39.9179C26.8319 41.1587 25.5142 42 24 42C22.4858 42 21.1681 41.1587 20.4889 39.9179C19.9586 38.949 20.8954 38 22 38H26Z"
              fill="currentColor"
            />
            <path
              d="M13 17C13 11.4772 17.4772 7 23 7H25C30.5228 7 35 11.4772 35 17V26.1498C35 27.0257 35.2875 27.8773 35.8183 28.574L40.5527 34.7879C41.5557 36.1044 40.6169 38 38.9618 38H9.03817C7.38309 38 6.44426 36.1044 7.4473 34.7879L12.1817 28.574C12.7125 27.8773 13 27.0257 13 26.1498V17Z"
              stroke="currentColor"
              strokeWidth="3"
            />
            <g>
              <rect x="8" y="11.5933" width="8.99813" height="45.1595" transform="rotate(-45 8 11.5933)" fill="white" />
              <rect x="11.1216" y="6.18555" width="45.3174" height="3" rx="1.5" transform="rotate(45 11.1216 6.18555)" fill="currentColor" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
);
互动关闭铃铛.displayName = "互动关闭铃铛";
