import * as React from "react";
import type { IconProps } from "./types";

// ── 大模型-自定义指令 ────────────────────────────────────────────
// 来源：icon/大模型-自定义指令.svg
export const 大模型自定义指令 = React.forwardRef<SVGSVGElement, IconProps>(
  function 大模型自定义指令({ size = 48, className, style, ...props }, ref) {
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
            d="M39.9999 37.5C40.8283 37.5 41.4999 38.1716 41.4999 39C41.4999 39.8284 40.8283 40.5 39.9999 40.5H5.99988C5.17145 40.5 4.49988 39.8284 4.49988 39C4.49988 38.1716 5.17145 37.5 5.99988 37.5H39.9999ZM8.63171 33.4893L5.56335 34.417C5.21037 34.5237 4.82703 34.4277 4.56628 34.167C4.30559 33.9062 4.20958 33.5229 4.31628 33.1699L5.24402 30.1016L8.63171 33.4893ZM27.6044 7.74219C28.5399 6.80663 30.0575 6.80663 30.993 7.74219C31.9282 8.67772 31.9283 10.1944 30.993 11.1299L9.98718 32.1348L6.59948 28.7471L27.6044 7.74219ZM38.3768 17.6562L43.5428 20.0107L38.3778 22.3584L36.0253 27.5098L33.6708 22.3584L28.5116 20.0117L33.6718 17.6572L36.0253 12.5059L38.3768 17.6562ZM41.9471 8.24805L43.9823 9.1748L41.9471 10.0996L41.0204 12.1299L40.0926 10.0996L38.0604 9.17578L40.0936 8.24805L41.0204 6.21875L41.9471 8.24805Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
大模型自定义指令.displayName = "大模型自定义指令";
