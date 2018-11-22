import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/core/SvgIcon";
import TextField from "@material-ui/core/TextField";
import * as React from "react";

export default class AddPassengerForm extends React.Component {
  render() {
    return (
      <TextField
        variant="outlined"
        fullWidth={true}
        placeholder="Add a passenger..."
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  }
}
