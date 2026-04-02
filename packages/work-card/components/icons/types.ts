import * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  /** 图标尺寸（同时设置 width / height），默认 48 */
  size?: number;
};
