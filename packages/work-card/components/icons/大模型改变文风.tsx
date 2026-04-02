import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-改变文风 ──────────────────────────────────────────────
// 来源：icon/大模型-改变文风.svg
export const 大模型改变文风 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型改变文风({ size = 48, className, style, ...props }, ref) {
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
            d="M21.6303 7.00399C22.3931 4.73143 25.6075 4.73141 26.3704 7.00398L27.2493 9.62244C28.9607 14.7207 32.8059 18.8219 37.7834 20.858L39.8055 21.6852C41.8769 22.5325 41.8769 25.4657 39.8055 26.313L37.7834 27.1402C32.8059 29.1762 28.9607 33.2775 27.2493 38.3757L26.3704 40.9942C25.6075 43.2668 22.3931 43.2668 21.6303 40.9942L20.7513 38.3757C19.0399 33.2775 15.1948 29.1762 10.2172 27.1402L8.19509 26.313C6.12377 25.4657 6.12377 22.5325 8.19509 21.6852L10.2172 20.858C15.1948 18.8219 19.0399 14.7207 20.7513 9.62245L21.6303 7.00399ZM24.0003 9.37075L23.5954 10.5771C21.6064 16.5022 17.1377 21.2684 11.3531 23.6347L10.4622 23.9991L11.3531 24.3635C17.1377 26.7297 21.6064 31.496 23.5954 37.421L24.0003 38.6274L24.4053 37.421C26.3942 31.496 30.8629 26.7297 36.6476 24.3635L37.5384 23.9991L36.6476 23.6347C30.8629 21.2685 26.3942 16.5022 24.4053 10.5771L24.0003 9.37075Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型改变文风.displayName = "大模型改变文风";
