import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/PersonPin";
import classNames from "classnames";
import MapMarkerIcon from "mdi-material-ui/MapMarker";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Passenger } from "../../../domain/TaxiRide";
import { editPassengerNameAction } from "../../../redux/actions";
import { MainClassKey } from "./Main";

const selectLocationMsg = "Tap to select location";

export interface PassengerPanelProps {
  classes: Record<MainClassKey, string>;
  passenger: Passenger;
  onClick: () => void;
}

interface ReduxProps {
  editPassengerName: typeof editPassengerNameAction;
}

interface State {
  editMode: boolean;
  name: string;
}

type Props = PassengerPanelProps & ReduxProps;

class PassengerPanel extends React.Component<Props, State> {
  state: State = {
    editMode: false,
    name: this.props.passenger.name
  };

  private toEditMode = () => {
    this.setState({ editMode: true });
  };

  private toViewMode = () => {
    this.setState({ editMode: false });
  };

  private onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };

  private editPassengerName = () => {
    const id = this.props.passenger.id;
    const name = this.state.name;
    this.props.editPassengerName(id, name);
  };

  render() {
    const { classes, onClick, passenger } = this.props;
    const { editMode, name } = this.state;
    const personIcon = (
      <PersonIcon
        color="inherit"
        className={classNames(classes.markerIcon, classes.aPersonIcon)}
      />
    );
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {editMode ? (
            <TextField
              InputProps={{
                startAdornment: personIcon
              }}
              onChange={this.onNameChanged}
              required={true}
              value={name}
            />
          ) : (
            <>
              {personIcon}
              <Typography className={classes.grow}>{passenger.name}</Typography>
            </>
          )}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <ListItem
              className={classes.listItem}
              component={ButtonBase}
              onClick={onClick}
            >
              <ListItemIcon>
                <MapMarkerIcon className={classes.markerIcon} />
              </ListItemIcon>
              <Typography>
                <Typography variant="caption">Pick-up Location:</Typography>
                {passenger.pickUpLocation ? (
                  passenger.pickUpLocation.query
                ) : (
                  <i>{selectLocationMsg}</i>
                )}
              </Typography>
            </ListItem>
            <ListItem
              className={classes.listItem}
              component={ButtonBase}
              onClick={onClick}
            >
              <ListItemIcon>
                <MapMarkerIcon className={classes.markerIcon} />
              </ListItemIcon>
              <Typography>
                <Typography variant="caption">Drop-off Location:</Typography>
                {passenger.dropOffLocation ? (
                  passenger.dropOffLocation.query
                ) : (
                  <i>{selectLocationMsg}</i>
                )}
              </Typography>
            </ListItem>
          </List>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button
            onClick={editMode ? this.toViewMode : this.toEditMode}
            size="small"
          >
            {editMode ? "Cancel" : "Edit Name"}
          </Button>
          <Button
            color="primary"
            disabled={!name}
            onClick={editMode ? this.editPassengerName : undefined}
            size="small"
          >
            {editMode ? "Save" : "Delete"}
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    editPassengerName: (id: string, name: string) =>
      dispatch(editPassengerNameAction(id, name))
  };
}

export default connect(
  state => state,
  mapDispatchToProps
)(PassengerPanel);
