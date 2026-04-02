import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具-关闭（X 形关闭图标）──────────────────────────────
// 来源：icon/通用工具-关闭.svg → component-docs/src/components/icons/tool.jsx
export const 通用工具关闭 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具关闭({ size = 48, className, style, ...props }, ref) {
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
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M38.4949 7.38294C39.0807 6.79716 40.0312 6.79716 40.617 7.38294C41.2023 7.96865 41.2023 8.91832 40.617 9.50403L26.1209 23.9991L40.617 38.4952C41.2027 39.081 41.2027 40.0315 40.617 40.6173C40.0313 41.2028 39.0817 41.2025 38.4959 40.6173L23.9998 26.1212L9.50379 40.6173C8.91807 41.2027 7.96841 41.2027 7.3827 40.6173C6.79691 40.0315 6.79691 39.081 7.3827 38.4952L21.8778 23.9991L7.3827 9.50403C6.79703 8.91824 6.79696 7.96869 7.3827 7.38294C7.96844 6.79719 8.91799 6.79727 9.50379 7.38294L23.9989 21.878L38.4949 7.38294Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
通用工具关闭.displayName = "通用工具关闭";
