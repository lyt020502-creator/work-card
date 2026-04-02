import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-未赞 ──────────────────────────────────────────────────
// 来源：icon/大模型-未赞.svg
export const 大模型未赞 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型未赞({ size = 48, className, style, ...props }, ref) {
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
          <path d="M0 0H48V48H0V0Z" fill="#D9D9D9" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            d="M25.2188 6C29.8011 6 32.6738 10.9501 30.4004 14.9287L30.1162 15.4258L36.1006 15.5342C39.8611 15.6028 42.6324 19.0756 41.8652 22.7578L39.2666 35.2275C38.5903 38.4736 35.7298 40.7998 32.4141 40.7998H11C8.23857 40.7998 6 38.5612 6 35.7998V20.5996C6.00021 17.8384 8.23871 15.5996 11 15.5996H15.4307L20.3174 8.56348C21.4327 6.95775 23.2637 6.00008 25.2188 6ZM11 18.5996C9.89556 18.5996 9.00021 19.4952 9 20.5996V35.7998C9 36.9044 9.89543 37.7998 11 37.7998H14.5V18.5996H11ZM25.2188 9C24.2464 9.00008 23.3359 9.47676 22.7812 10.2754L17.5 17.8789V37.7998H32.4141C34.3086 37.7998 35.9435 36.4709 36.3301 34.6162L38.9277 22.1455C39.3113 20.3044 37.9261 18.5685 36.0459 18.5342L25 18.333L27.7959 13.4404C28.9265 11.4618 27.4976 9 25.2188 9Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型未赞.displayName = "大模型未赞";
