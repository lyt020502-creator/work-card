import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具-新建文档 ────────────
export const 通用工具新建文档 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具新建文档({ size = 48, className, style, ...props }, ref) {
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
        <path d="M27.4737 39.5H12C9.79086 39.5 8 37.7091 8 35.5V12C8 9.79086 9.79086 8 12 8H30C34.4183 8 38 11.5817 38 16V25.1818M38 30.5V40.5M33 35.5L43 35.4961M16.5 19H27.5027M16.5 25H23.5007" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
);
通用工具新建文档.displayName = "通用工具新建文档";
