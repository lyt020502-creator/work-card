import * as React from "react";
import type { IconProps } from "./types";

// ── Vector（气泡提示背景图标，深色多色保留原色）──────────────
// 来源：icon/Vector.svg
export const Vector = React.forwardRef<SVGSVGElement, IconProps>(
  function Vector({ size, className, style, ...props }, ref) {
    const aspectRatio = 68 / 37;
    const w = size ?? 68;
    const h = size ? size / aspectRatio : 37;
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 68 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        ref={ref}
        {...props}
      >
        <g opacity="0.9">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.8579 30C27.7951 30.0483 29.5969 31.0043 30.723 32.5813L33.1188 35.9366C33.4398 36.386 34.0643 36.4902 34.5138 36.1693C34.6025 36.1059 34.6802 36.0285 34.7439 35.9401L37.3847 32.2756C38.4498 30.7976 40.1791 29.945 42 30"
            fill="currentColor"
          />
          <path
            d="M0 4C0 1.79086 1.79086 0 4 0H64C66.2091 0 68 1.79086 68 4V26C68 28.2091 66.2091 30 64 30H42H25.8579H4C1.79086 30 0 28.2091 0 26V4Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);
Vector.displayName = "Vector";
