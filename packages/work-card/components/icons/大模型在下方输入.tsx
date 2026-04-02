import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-在下方输入 ────────────────────────────────────────
// 来源：icon/大模型-在下方输入.svg
export const 大模型在下方输入 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型在下方输入({ size = 48, className, style, ...props }, ref) {
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
            d="M24 18C25.1046 18 26 18.8954 26 20V33H30.0566C30.9473 33.0003 31.3933 34.0771 30.7637 34.707L24.6924 40.7783C24.3019 41.1687 23.6688 41.1686 23.2783 40.7783L17.207 34.707C16.5771 34.0771 17.0232 33.0001 17.9141 33H22V20C22 18.8954 22.8954 18 24 18ZM37 8.5C40.0376 8.5 42.5 10.9624 42.5 14V30C42.5 30.8284 41.8284 31.5 41 31.5C40.1716 31.5 39.5 30.8284 39.5 30V14C39.5 12.6193 38.3807 11.5 37 11.5H11C9.61929 11.5 8.5 12.6193 8.5 14V30C8.5 30.8284 7.82843 31.5 7 31.5C6.17157 31.5 5.5 30.8284 5.5 30V14C5.5 10.9624 7.96243 8.5 11 8.5H37Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型在下方输入.displayName = "大模型在下方输入";
