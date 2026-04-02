import * as React from "react";
import type { IconProps } from "./types";

// ── 互动我派发的（纸飞机图标）──────────────────────────────
// 来源：icon/互动-我派发的.svg
export const 互动我派发的 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动我派发的({ size = 48, className, style, ...props }, ref) {
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
            id={`mask0_31_5769-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
          </mask>
          <g mask={`url(#mask0_31_5769-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.21518 26.0757C4.90116 24.4848 5.17635 20.9851 7.7103 19.7749L36.8226 5.8706C39.4202 4.63009 42.3643 6.74529 42.0179 9.60303L38.5648 38.0923C38.2574 40.6263 35.5096 42.0697 33.2484 40.8853L24.722 36.4185C23.9882 36.0341 23.7048 35.1279 24.0892 34.394C24.4736 33.6603 25.3798 33.3769 26.1136 33.7612L34.641 38.228C35.0432 38.4386 35.5316 38.1817 35.5863 37.731L38.808 11.1489L20.6351 31.7124C20.5303 31.831 20.4731 31.9839 20.473 32.1421L20.473 41.0005C20.473 41.8287 19.8012 42.5002 18.973 42.5005C18.1446 42.5005 17.473 41.8289 17.473 41.0005L17.473 32.1421C17.4731 31.2522 17.7978 30.3929 18.3871 29.7261L36.3158 9.43701L9.00327 22.4829C8.5526 22.6982 8.50315 23.3199 8.9144 23.603L14.4466 27.4067C15.1291 27.8761 15.3016 28.8101 14.8324 29.4927C14.363 30.1748 13.4299 30.3474 12.7474 29.8784L7.21518 26.0757Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
互动我派发的.displayName = "互动我派发的";
