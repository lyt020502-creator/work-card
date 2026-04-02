import * as React from "react";
import type { IconProps } from "./types";

// ── 箭头-长尾箭头-放大（对角线长尾放大箭头图标）──────────────────
// 来源：icon/箭头-长尾箭头-放大.svg
export const 箭头长尾箭头放大 = React.forwardRef<SVGSVGElement, IconProps>(
  function 箭头长尾箭头放大({ size = 48, className, style, ...props }, ref) {
    const uid = React.useId();
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
          <mask
            id={`mask0_31_5914-${uid}`}
            style={{ maskType: "alpha" } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <rect
              x="48"
              width="48"
              height="48"
              transform="rotate(90 48 0)"
              fill="#FF0606"
            />
          </mask>
          <g mask={`url(#mask0_31_5914-${uid})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.9387 22.0619C25.3533 21.4761 25.3533 20.5262 25.9387 19.9405L35.8782 10.001L30.5004 10.001C29.6719 10.001 29.0005 9.32957 29.0005 8.50115C29.0005 7.67274 29.6719 7.00131 30.5004 7.00131L38.4995 7.00131C39.8802 7.00131 40.9999 8.12102 40.9999 9.50173L40.9999 17.5009C40.9999 18.3293 40.3284 19.0006 39.5001 19.0007C38.6717 19.0007 38.0002 18.3293 38.0002 17.5009L37.9996 12.1223L28.06 22.0619C27.4742 22.6473 26.5244 22.6475 25.9387 22.0619ZM9.50053 41.0011C8.11982 41.0011 7.00011 39.8814 7.00011 38.5007L7.0001 30.5016C7.0001 29.6731 7.67152 29.0017 8.49994 29.0017C9.32837 29.0017 9.99978 29.6731 9.99978 30.5016L9.99978 35.8767L19.9379 25.9385C20.5246 25.3522 21.4762 25.3527 22.0627 25.9392C22.649 26.5257 22.6489 27.4767 22.0627 28.0633L12.1246 38.0014L17.4997 38.0014C18.3281 38.0014 18.9995 38.6729 18.9995 39.5013C18.9995 40.3297 18.3281 41.0011 17.4997 41.0011L9.50053 41.0011Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    );
  }
);
箭头长尾箭头放大.displayName = "箭头长尾箭头放大";
