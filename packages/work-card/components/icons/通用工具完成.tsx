import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具完成（勾选/对号图标）──────────────────────────────────
// 来源：icon/通用工具-完成.svg
export const 通用工具完成 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具完成({ size = 48, className, style, ...props }, ref) {
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
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.18761 20.6014C4.7734 20.0157 5.72315 20.0157 6.30893 20.6014L18.8411 33.1336C19.4269 33.7194 20.3766 33.7194 20.9624 33.1336L41.1876 12.9084C41.7734 12.3226 42.7231 12.3226 43.3089 12.9084C43.8947 13.4942 43.8947 14.4439 43.3089 15.0297L23.0837 35.2549C21.3264 37.0123 18.4771 37.0123 16.7198 35.2549L4.18761 22.7228C3.60183 22.137 3.60183 21.1872 4.18761 20.6014Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
通用工具完成.displayName = "通用工具完成";
