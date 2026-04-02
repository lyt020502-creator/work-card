import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-洞察摘要 ──────────────────────────────────────────────
// 来源：icon/大模型-洞察摘要.svg
export const 大模型洞察摘要 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型洞察摘要({ size = 48, className, style, ...props }, ref) {
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
            d="M30.5615 4.65146C31.603 3.44978 33.5535 4.48169 33.1455 6.01865L30.3389 16.5909L29.5 19.7511L32.7334 19.2647L38.6621 18.3741C40.055 18.165 40.9422 19.818 39.998 20.8634L19.4561 43.6056C18.3745 44.803 16.4242 43.682 16.9141 42.1446L20.4814 30.9483L21.5 27.7511L18.1855 28.2735L12.8652 29.1114C11.4836 29.3291 10.5821 27.7045 11.498 26.6476L30.5615 4.65146ZM16.4551 25.5089L21.0332 24.7872L25.834 24.0313L24.3584 28.6622L21.877 36.4493L34.9609 21.964L29.9463 22.7179L25.4287 23.3966L26.6006 18.9815L28.582 11.5167L16.4551 25.5089ZM13 14.5001C13.8284 14.5001 14.5 15.1717 14.5 16.0001C14.4999 16.8284 13.8283 17.5001 13 17.5001H7C6.17165 17.5001 5.50013 16.8284 5.5 16.0001C5.5 15.1717 6.17157 14.5001 7 14.5001H13ZM17 8.50009C17.8284 8.50009 18.5 9.17166 18.5 10.0001C18.4999 10.8284 17.8283 11.5001 17 11.5001H7C6.17165 11.5001 5.50013 10.8284 5.5 10.0001C5.5 9.17166 6.17157 8.50009 7 8.50009H17Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型洞察摘要.displayName = "大模型洞察摘要";
