import * as React from "react";
import type { IconProps } from "./types";

// ── 图影音-旋转 ──────────────────────────────────────────────
// 来源：icon/图影音-旋转.svg
export const 图影音旋转 = React.forwardRef<SVGSVGElement, IconProps>(
  function 图影音旋转({ size = 48, className, style, ...props }, ref) {
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
          id={`mask0_31_6637-${uid}`}
          style={{ maskType: "alpha" } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
        </mask>
        <g mask={`url(#mask0_31_6637-${uid})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M39.0005 12.5007C42.0378 12.5009 44.5005 14.9633 44.5005 18.0007V35.0007C44.5003 38.0379 42.0377 40.5004 39.0005 40.5007H15.0005C11.963 40.5007 9.50069 38.0381 9.50049 35.0007V18.0007C9.50049 14.9631 11.9629 12.5007 15.0005 12.5007H39.0005ZM15.0005 15.5007C13.6198 15.5007 12.5005 16.6199 12.5005 18.0007V35.0007C12.5007 36.3812 13.6199 37.5007 15.0005 37.5007H39.0005C40.3809 37.5004 41.5003 36.381 41.5005 35.0007V18.0007C41.5005 16.6201 40.381 15.5009 39.0005 15.5007H15.0005ZM17.5044 5.37859C17.5046 4.64661 18.3201 4.20985 18.9292 4.61589L21.8599 6.56999C22.4041 6.93283 22.4041 7.73255 21.8599 8.09538L18.9292 10.0495C18.3201 10.4555 17.5046 10.0188 17.5044 9.28679V8.70866H14.7544C9.94491 8.70866 6.04541 12.6072 6.04541 17.4167V18.3337C6.04521 19.0929 5.42968 19.7087 4.67041 19.7087C3.91122 19.7086 3.29561 19.0928 3.29541 18.3337V17.4167C3.29541 11.0884 8.42613 5.95866 14.7544 5.95866H17.5044V5.37859Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
图影音旋转.displayName = "图影音旋转";
