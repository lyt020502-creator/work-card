import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-纠错-1（X + 下划线纠错图标）──────────────────────────
// 来源：icon/大模型-纠错-1.svg
export const 大模型纠错1 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型纠错1({ size = 48, className, style, ...props }, ref) {
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
          <path d="M0 0H48V48H0V0Z" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M43 39.4994C43.8283 39.4994 44.4998 40.1712 44.5 40.9994C44.5 41.8278 43.8284 42.4994 43 42.4994H7C6.17157 42.4994 5.5 41.8278 5.5 40.9994C5.50022 40.1712 6.17171 39.4994 7 39.4994H43ZM36.667 7.21131C37.2528 6.62553 38.2033 6.62553 38.7891 7.21131C39.3745 7.79704 39.3745 8.74668 38.7891 9.33241L27.1211 20.9994L38.7881 32.6674C39.3739 33.2532 39.3739 34.2027 38.7881 34.7885C38.2023 35.374 37.2527 35.3742 36.667 34.7885L25 23.1215L13.333 34.7885C12.7473 35.3742 11.7977 35.374 11.2119 34.7885C10.6261 34.2027 10.6261 33.2532 11.2119 32.6674L22.8779 20.9994L11.2109 9.33241C10.6255 8.74668 10.6255 7.79703 11.2109 7.21131C11.7967 6.62553 12.7472 6.62553 13.333 7.21131L25 18.8783L36.667 7.21131Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型纠错1.displayName = "大模型纠错1";
