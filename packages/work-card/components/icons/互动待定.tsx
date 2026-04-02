import * as React from "react";
import type { IconProps } from "./types";

// ── 互动待定（问号圆形图标）──────────────────────────────────
// 来源：icon/互动-待定.svg
export const 互动待定 = React.forwardRef<SVGSVGElement, IconProps>(
  function 互动待定({ size = 48, className, style, ...props }, ref) {
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
          <g>
            <mask
              id={`mask0_31_7189-${uid}`}
              style={{ maskType: "alpha" } as React.CSSProperties}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="48"
              height="48"
            >
              <rect x="48" width="48" height="48" transform="rotate(90 48 0)" fill="#FF0606" />
            </mask>
            <g mask={`url(#mask0_31_7189-${uid})`}>
              <g>
                <path
                  d="M24 4.5C34.7696 4.5 43.5 13.2304 43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5ZM24 7.5C14.8873 7.5 7.5 14.8873 7.5 24C7.5 33.1127 14.8873 40.5 24 40.5C33.1127 40.5 40.5 33.1127 40.5 24C40.5 14.8873 33.1127 7.5 24 7.5Z"
                  fill="currentColor"
                />
                <g>
                  <g>
                    <mask
                      id={`mask1_31_7189-${uid}`}
                      style={{ maskType: "alpha" } as React.CSSProperties}
                      maskUnits="userSpaceOnUse"
                      x="7"
                      y="7"
                      width="34"
                      height="34"
                    >
                      <rect x="41" y="7" width="34" height="34" transform="rotate(90 41 7)" fill="#FF0606" />
                    </mask>
                    <g mask={`url(#mask1_31_7189-${uid})`}>
                      <g>
                        <path
                          d="M24 30.5C25.1046 30.5 26 31.3954 26 32.5C26 33.6046 25.1046 34.5 24 34.5C22.8954 34.5 22 33.6046 22 32.5C22 31.3954 22.8954 30.5 24 30.5ZM24 14.5C25.7983 14.5 27.5323 15.0248 28.8457 16.1113C30.1876 17.2216 31 18.8498 31 20.8125C31 22.3945 30.2379 23.6646 29.3359 24.5811C28.4396 25.4918 27.3218 26.1463 26.3447 26.5557C25.7326 26.8123 25.5003 27.2704 25.5 27.458V27.8018C25.5 28.6302 24.8284 29.3018 24 29.3018C23.1716 29.3018 22.5 28.6302 22.5 27.8018V27.458C22.5002 25.6206 23.9306 24.3139 25.1855 23.7881C25.8985 23.4894 26.6489 23.0337 27.1973 22.4766C27.7401 21.925 28 21.369 28 20.8125C28 19.7378 27.5812 18.9594 26.9326 18.4229C26.2554 17.8626 25.2391 17.5 24 17.5C22.7609 17.5 21.7446 17.8626 21.0674 18.4229C20.4188 18.9594 20 19.7378 20 20.8125C20 21.6409 19.3284 22.3125 18.5 22.3125C17.6716 22.3125 17 21.6409 17 20.8125C17 18.8498 17.8124 17.2216 19.1543 16.1113C20.4677 15.0248 22.2017 14.5 24 14.5Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
);
互动待定.displayName = "互动待定";
