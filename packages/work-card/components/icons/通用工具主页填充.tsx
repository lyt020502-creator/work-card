import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具主页填充（房屋填充图标）──────────────────────────────────
// 来源：icon/通用工具-主页-填充.svg
export const 通用工具主页填充 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具主页填充({ size = 48, className, style, ...props }, ref) {
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
          d="M21.5357 6.41789C22.9837 5.28503 25.0174 5.28501 26.4654 6.41789L42.9136 19.2909C44.45 20.4933 43.6 22.9599 41.649 22.9599H39.3921V39.4823C39.3921 41.6915 37.6013 43.4823 35.3921 43.4823H12.6089C10.3998 43.4823 8.60897 41.6915 8.60894 39.4823V22.9599H6.35211C4.40123 22.9599 3.5504 20.4934 5.08648 19.2909L21.5357 6.41789ZM24.0005 30.1425C22.017 30.1425 20.4087 31.7508 20.4087 33.7343C20.4089 35.7177 22.0172 37.3251 24.0005 37.3251C25.9839 37.3251 27.5922 35.7176 27.5923 33.7343C27.5923 31.7508 25.984 30.1425 24.0005 30.1425Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
通用工具主页填充.displayName = "通用工具主页填充";
