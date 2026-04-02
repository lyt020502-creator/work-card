import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具-标签-填充 ────────────
export const 通用工具标签填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具标签填充({ size = 48, className, style, ...props }, ref) {
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
        <path fillRule="evenodd" clipRule="evenodd" d="M37.8902 5.92376C39.6351 5.85342 41.0712 7.28208 41.0093 9.02727L40.5132 23.0292C40.4863 23.7876 40.1729 24.5083 39.6363 25.0448L22.7935 41.8876C21.2314 43.4496 18.6983 43.4496 17.1363 41.8876L5.11577 29.8661C3.55387 28.3041 3.55385 25.7719 5.11577 24.2099L21.9644 7.36126C22.4974 6.82831 23.2113 6.51477 23.9644 6.4843L37.8902 5.92376ZM34.4595 12.5419C33.0927 11.1752 30.8761 11.1751 29.5093 12.5419C28.1425 13.9087 28.1426 16.1253 29.5093 17.4921C30.8762 18.8589 33.0927 18.8589 34.4595 17.4921C35.8264 16.1253 35.8264 13.9088 34.4595 12.5419Z" fill="currentColor" />
      </svg>
    );
  }
);
通用工具标签填充.displayName = "通用工具标签填充";
