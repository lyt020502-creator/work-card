import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具复制（复制/双层矩形图标）──────────────────────────────────
// 来源：icon/通用工具-复制.svg
export const 通用工具复制 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具复制({ size = 48, className, style, ...props }, ref) {
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
          d="M36.5 6C39.5376 6 42 8.46243 42 11.5V29.5C42 32.5376 39.5376 35 36.5 35H35V36.5C35 39.5376 32.5376 42 29.5 42H11.5C8.46243 42 6 39.5376 6 36.5V18.5C6 15.4624 8.46243 13 11.5 13H13V11.5C13 8.46243 15.4624 6 18.5 6H36.5ZM11.5 16C10.1193 16 9 17.1193 9 18.5V36.5C9 37.8807 10.1193 39 11.5 39H29.5C30.8807 39 32 37.8807 32 36.5V18.5C32 17.1193 30.8807 16 29.5 16H11.5ZM18.5 9C17.1193 9 16 10.1193 16 11.5V13H29.5C32.5376 13 35 15.4624 35 18.5V32H36.5C37.8807 32 39 30.8807 39 29.5V11.5C39 10.1193 37.8807 9 36.5 9H18.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
通用工具复制.displayName = "通用工具复制";
