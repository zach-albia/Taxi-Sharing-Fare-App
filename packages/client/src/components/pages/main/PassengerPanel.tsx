import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/PersonPin";
import classNames from "classnames";
import MapMarkerIcon from "mdi-material-ui/MapMarker";
import * as React from "react";
import { Passenger } from "../../../domain/TaxiRide";
import { MainClassKey } from "./Main";

const selectLocationMsg = "Tap to select location";

interface PassengerPanelProps {
  classes: Record<MainClassKey, string>;
  passenger: Passenger;
  onClick: () => void;
}

export default class PassengerPanel extends React.Component<
  PassengerPanelProps
> {
  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <PersonIcon
            color="inherit"
            className={classNames(
              this.props.classes.markerIcon,
              this.props.classes.aPersonIcon
            )}
          />
          <Typography className={this.props.classes.grow}>
            {this.props.passenger.name}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <ListItem
              className={this.props.classes.listItem}
              component={ButtonBase}
              onClick={this.props.onClick}
            >
              <ListItemIcon>
                <MapMarkerIcon className={this.props.classes.markerIcon} />
              </ListItemIcon>
              <Typography>
                <Typography variant="caption">Pick-up Location:</Typography>
                {this.props.passenger.pickUpLocation ? (
                  this.props.passenger.pickUpLocation.query
                ) : (
                  <i>{selectLocationMsg}</i>
                )}
              </Typography>
            </ListItem>
            <ListItem
              className={this.props.classes.listItem}
              component={ButtonBase}
              onClick={this.props.onClick}
            >
              <ListItemIcon>
                <MapMarkerIcon className={this.props.classes.markerIcon} />
              </ListItemIcon>
              <Typography>
                <Typography variant="caption">Drop-off Location:</Typography>
                {this.props.passenger.dropOffLocation ? (
                  this.props.passenger.dropOffLocation.query
                ) : (
                  <i>{selectLocationMsg}</i>
                )}
              </Typography>
            </ListItem>
          </List>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button size="small">Edit Name</Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}
