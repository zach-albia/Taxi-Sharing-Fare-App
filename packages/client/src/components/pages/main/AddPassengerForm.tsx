import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addPassengerAction } from "../../../redux/actions";

interface Props {
  addPassenger: typeof addPassengerAction;
}

interface State {
  name: string;
}

class AddPassengerForm extends React.Component<Props> {
  state: State = {
    name: ""
  };

  private addPassenger = () => {
    this.props.addPassenger(this.state.name);
  };

  private changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { name } = this.state;
    return (
      <TextField
        fullWidth={true}
        margin="normal"
        onChange={this.changeName}
        placeholder="Add a passenger..."
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                disabled={!name}
                onClick={this.addPassenger}
                style={{ marginRight: -16 }}
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addPassenger: (name: string) => dispatch(addPassengerAction(name))
  };
}

export default connect(
  state => state,
  mapDispatchToProps
)(AddPassengerForm);
