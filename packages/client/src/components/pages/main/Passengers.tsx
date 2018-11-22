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
import AddPassengerForm from "./AddPassengerForm";
import { MainClassKey } from "./Main";

export interface PassengersProps {
  classes: Record<MainClassKey, string>;
  onClickLocation: () => void;
  passengers: Passenger[];
}

const selectLocationMsg = "Tap to select location";

export default class Passengers extends React.Component<PassengersProps> {
  render() {
    const { classes, onClickLocation, passengers } = this.props;
    return (
      <>
        <Typography variant="caption" gutterBottom={true}>
          Passengers
        </Typography>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <PersonIcon
              color="inherit"
              className={classNames(classes.markerIcon, classes.aPersonIcon)}
            />
            <Typography className={classes.grow}>Fulan AlFulani</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              <ListItem
                className={classes.listItem}
                component={ButtonBase}
                onClick={onClickLocation}
              >
                <ListItemIcon>
                  <MapMarkerIcon className={classes.markerIcon} />
                </ListItemIcon>
                <Typography>
                  <Typography variant="caption">Pick-up Location:</Typography>
                  University of Bahrain
                </Typography>
              </ListItem>
              <ListItem className={classes.listItem} component={ButtonBase}>
                <ListItemIcon>
                  <MapMarkerIcon className={classes.markerIcon} />
                </ListItemIcon>
                <Typography>
                  <Typography variant="caption">Drop-off Location:</Typography>
                  Al Kindi Specialized Hospital
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
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <PersonIcon
              color="inherit"
              className={classNames(classes.markerIcon, classes.aPersonIcon)}
            />
            <Typography className={classes.grow}>'Illan Al'illanah</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              <ListItem className={classes.listItem} component={ButtonBase}>
                <ListItemIcon>
                  <MapMarkerIcon className={classes.markerIcon} />
                </ListItemIcon>
                <Typography>
                  <Typography variant="caption">Pick-up Location:</Typography>
                  Arabian Gulf University
                </Typography>
              </ListItem>
              <ListItem className={classes.listItem} component={ButtonBase}>
                <ListItemIcon>
                  <MapMarkerIcon className={classes.markerIcon} />
                </ListItemIcon>
                <Typography>
                  <Typography variant="caption">Drop-off Location:</Typography>
                  Al Abraaj
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
        {passengers.length > 0 ? (
          passengers.map(passenger => (
            <ExpansionPanel key={passenger.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <PersonIcon
                  color="inherit"
                  className={classNames(
                    classes.markerIcon,
                    classes.aPersonIcon
                  )}
                />
                <Typography className={classes.grow}>
                  {passenger.name}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  <ListItem
                    className={classes.listItem}
                    component={ButtonBase}
                    onClick={onClickLocation}
                  >
                    <ListItemIcon>
                      <MapMarkerIcon className={classes.markerIcon} />
                    </ListItemIcon>
                    <Typography>
                      <Typography variant="caption">
                        Pick-up Location:
                      </Typography>
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
                    onClick={onClickLocation}
                  >
                    <ListItemIcon>
                      <MapMarkerIcon className={classes.markerIcon} />
                    </ListItemIcon>
                    <Typography>
                      <Typography variant="caption">
                        Drop-off Location:
                      </Typography>
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
                <Button size="small">Edit Name</Button>
                <Button size="small" color="primary">
                  Delete
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          ))
        ) : (
          <Typography variant="caption">
            No passengers yet. Add some below
          </Typography>
        )}
        <AddPassengerForm />
      </>
    );
  }
}
