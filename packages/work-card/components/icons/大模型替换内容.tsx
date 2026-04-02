import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-替换内容 ──────────────────────────────────────────────
// 来源：icon/大模型-替换内容.svg
export const 大模型替换内容 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型替换内容({ size = 48, className, style, ...props }, ref) {
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
          <path d="M48 0L48 48L1.69672e-06 48L3.8147e-06 -2.11798e-06L48 0Z" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M39.5 29.4999C40.3284 29.4999 41 30.1715 41 30.9999C41 31.8283 40.3284 32.4999 39.5 32.4999H10.1211L15.0605 37.4393C15.6463 38.0251 15.6463 38.9746 15.0605 39.5604C14.4748 40.1462 13.5252 40.1462 12.9395 39.5604L7.14648 33.7675C5.57172 32.1926 6.68693 29.5 8.91406 29.4999H39.5ZM31.9395 8.93934C32.5252 8.35355 33.4748 8.35355 34.0605 8.93934L39.8535 14.7323C41.4283 16.3072 40.3131 18.9998 38.0859 18.9999H7.5C6.67157 18.9999 6 18.3283 6 17.4999C6 16.6715 6.67157 15.9999 7.5 15.9999H36.8789L31.9395 11.0604C31.3537 10.4746 31.3537 9.52513 31.9395 8.93934Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型替换内容.displayName = "大模型替换内容";
