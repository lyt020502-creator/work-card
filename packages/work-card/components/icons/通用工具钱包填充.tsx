import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具-钱包-填充 ────────────
export const 通用工具钱包填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具钱包填充({ size = 48, className, style, ...props }, ref) {
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
        <path fillRule="evenodd" clipRule="evenodd" d="M6 15.4464C6 13.9108 7.65887 12.9482 8.99219 13.7101L17.9844 18.8478C19.2307 19.56 20 20.886 20 22.3214V36.0001C19.9998 38.2091 18.209 40.0001 16 40.0001H10C7.79096 40.0001 6.00016 38.2091 6 36.0001V15.4464ZM38.8135 8.34778C40.134 7.37476 42 8.31784 42 9.95813V36.0001C41.9998 38.2091 40.209 40.0001 38 40.0001H27C24.791 40.0001 23.0002 38.2091 23 36.0001V22.0206C23.0001 20.7499 23.604 19.5548 24.627 18.8009L38.8135 8.34778Z" fill="currentColor" />
      </svg>
    );
  }
);
通用工具钱包填充.displayName = "通用工具钱包填充";
