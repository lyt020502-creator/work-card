import * as React from "react";
import type { IconProps } from "./types";

// ── 通用工具-邮件 ────────────
export const 通用工具邮件 = React.forwardRef<SVGSVGElement, IconProps>(
  function 通用工具邮件({ size = 48, className, style, ...props }, ref) {
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
        <path d="M37.7499 7.59375C40.7355 7.59385 43.1561 10.0143 43.1561 13V35C43.1561 37.9857 40.7355 40.4062 37.7499 40.4062H10.2636C7.27901 40.4062 4.85904 37.9876 4.85742 35.0029L4.8457 13.0029C4.84412 10.016 7.26504 7.59375 10.2519 7.59375H37.7499ZM7.66991 35.001C7.67067 36.4329 8.8317 37.5938 10.2636 37.5938H37.7499C39.1823 37.5937 40.3436 36.4324 40.3436 35V17.8359L25.7587 26.6504C24.9861 27.1172 24.0216 27.1295 23.2372 26.6826L7.66014 17.8076L7.66991 35.001ZM10.2519 10.4062C8.81904 10.4062 7.65765 11.5681 7.65819 13.001V14.374L24.4628 23.9482L40.3436 14.3516V13C40.3436 11.5676 39.1822 10.4064 37.7499 10.4062H10.2519Z" fill="currentColor" />
      </svg>
    );
  }
);
通用工具邮件.displayName = "通用工具邮件";
