import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-翻译 ──────────────────────────────────────────────────
// 来源：icon/大模型-翻译.svg
export const 大模型翻译 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型翻译({ size = 48, className, style, ...props }, ref) {
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
          <rect width="48" height="48" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0-${uid})`}>
          <path
            d="M32 5.5C35.0376 5.5 37.5 7.96243 37.5 11V16.5H40C43.0376 16.5 45.5 18.9624 45.5 22V37C45.5 40.0376 43.0376 42.5 40 42.5H12C8.96243 42.5 6.5 40.0376 6.5 37V11C6.5 7.96243 8.96243 5.5 12 5.5H32ZM12 8.5C10.6193 8.5 9.5 9.61929 9.5 11V37C9.5 38.3807 10.6193 39.5 12 39.5H32C33.3807 39.5 34.5 38.3807 34.5 37V11C34.5 9.61929 33.3807 8.5 32 8.5H12ZM37.5 37C37.5 37.9005 37.2821 38.7497 36.8984 39.5H40C41.3807 39.5 42.5 38.3807 42.5 37V22C42.5 20.6193 41.3807 19.5 40 19.5H37.5V37ZM20.123 16.6543C20.8042 14.9518 23.2261 14.9873 23.8574 16.709L28.9082 30.4834C29.1934 31.2611 28.7942 32.1229 28.0166 32.4082C27.2389 32.6934 26.3771 32.2943 26.0918 31.5166L24.959 28.4277C24.8143 28.4742 24.6602 28.5 24.5 28.5H19C18.8735 28.5 18.7511 28.4826 18.6338 28.4531L17.3926 31.5576C17.0848 32.3265 16.2114 32.7002 15.4424 32.3926C14.6736 32.0848 14.3 31.2123 14.6074 30.4434L20.123 16.6543ZM19.8154 25.5H23.8857L21.9395 20.1914L19.8154 25.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型翻译.displayName = "大模型翻译";
