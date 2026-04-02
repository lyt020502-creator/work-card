import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-写宣传文案 ────────────────────────────────────────
// 来源：icon/大模型-写宣传文案.svg
export const 大模型写宣传文案 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型写宣传文案({ size = 48, className, style, ...props }, ref) {
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
            d="M31.3452 5.60236C34.0942 3.91089 37.6772 5.57797 38.1538 8.77032L41.77 32.9959C42.2628 36.2975 39.1151 38.9675 35.938 37.9432L15.6362 31.3973L18.397 38.452C18.6989 39.2234 18.3179 40.0944 17.5464 40.3963C16.775 40.698 15.905 40.317 15.603 39.5457L11.6939 29.5565C11.691 29.5494 11.6888 29.5421 11.6861 29.535L7.74074 19.4539C6.81084 17.0765 8.65714 14.5358 11.2056 14.6854L16.1157 14.9734L31.3452 5.60236ZM35.187 9.21368C35.0282 8.14964 33.8338 7.59349 32.9175 8.15704L17.5542 17.6111C17.1176 17.8798 16.609 18.0084 16.0972 17.9783L11.0298 17.6795C10.6658 17.6582 10.4018 18.0215 10.5347 18.3611L14.2251 27.7908L36.8589 35.0877C37.9179 35.4291 38.9665 34.5388 38.8023 33.4383L35.187 9.21368ZM4.90676 25.2547C5.69005 24.985 6.54427 25.4011 6.81398 26.1844L9.0923 32.8035C9.36183 33.5868 8.94582 34.4401 8.16261 34.7098C7.37947 34.9793 6.52618 34.5631 6.25636 33.7801L3.97707 27.1609C3.70756 26.3778 4.12376 25.5245 4.90676 25.2547Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型写宣传文案.displayName = "大模型写宣传文案";
