import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import { FieldRenderProps } from "react-final-form";

const FinalCheckbox: React.SFC<FieldRenderProps> = ({
  input: { checked, name, onChange, ...restInput },
  meta,
  ...rest
}) => (
  <Checkbox
    {...rest}
    name={name}
    inputProps={restInput}
    onChange={onChange}
    checked={!!checked}
  />
);

export default FinalCheckbox;
