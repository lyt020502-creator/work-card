import * as React from "react";
import type { IconProps } from "./types";

// ── 用户头像-成员 ────────────────────────────────────────────────
// 来源：icon/用户头像-成员.svg
export const 用户头像成员 = React.forwardRef<SVGSVGElement, IconProps>(
  function 用户头像成员({ size = 48, className, style, ...props }, ref) {
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
          d="M32 27C37.2467 27 41.5 31.2533 41.5 36.5V38.5C41.5 40.9853 39.4853 43 37 43H11C8.51472 43 6.5 40.9853 6.5 38.5V36.5C6.5 31.2533 10.7533 27 16 27H32ZM16 30C12.4101 30 9.5 32.9101 9.5 36.5V38.5C9.5 39.3284 10.1716 40 11 40H37C37.8284 40 38.5 39.3284 38.5 38.5V36.5C38.5 32.9101 35.5899 30 32 30H16ZM24 5C29.5228 5 34 9.47715 34 15C34 20.5228 29.5228 25 24 25C18.4772 25 14 20.5228 14 15C14 9.47715 18.4772 5 24 5ZM24 8C20.134 8 17 11.134 17 15C17 18.866 20.134 22 24 22C27.866 22 31 18.866 31 15C31 11.134 27.866 8 24 8Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
用户头像成员.displayName = "用户头像成员";
