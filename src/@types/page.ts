import { SvgIconProps } from "@material-ui/core/SvgIcon";
import React from "react";

export default interface Page {
  children?: Page[];
  icon: React.ComponentType<SvgIconProps>;
  pathname: string;
  title?: string;
}
