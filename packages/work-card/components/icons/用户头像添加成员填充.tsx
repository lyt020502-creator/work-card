import * as React from "react";
import type { IconProps } from "./types";

// ── 用户头像-添加成员-填充 ────────────────────────────────────────
// 来源：icon/用户头像-添加成员-填充.svg
export const 用户头像添加成员填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 用户头像添加成员填充({ size = 48, className, style, ...props }, ref) {
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
          d="M36.5 27.5C37.3284 27.5 38 28.1716 38 29V34.001H43C43.8284 34.001 44.5 34.6726 44.5 35.501C44.5 36.3294 43.8284 37.001 43 37.001H38V42C38 42.8284 37.3284 43.5 36.5 43.5C35.6716 43.5 35 42.8284 35 42V37.001H30C29.1716 37.001 28.5 36.3294 28.5 35.501C28.5 34.6726 29.1716 34.001 30 34.001H35V29C35 28.1716 35.6716 27.5 36.5 27.5ZM27.2676 27C27.0974 27.2942 27 27.6357 27 28V43H10.5C8.29086 43 6.5 41.2091 6.5 39V36C6.5 31.0294 10.5294 27 15.5 27H27.2676ZM24 5C29.5228 5 34 9.47715 34 15C34 20.5228 29.5228 25 24 25C18.4772 25 14 20.5228 14 15C14 9.47715 18.4772 5 24 5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
用户头像添加成员填充.displayName = "用户头像添加成员填充";
