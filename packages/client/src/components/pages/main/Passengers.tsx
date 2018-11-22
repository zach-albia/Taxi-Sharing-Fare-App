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
import AddPassengerForm from "./AddPassengerForm";
import { MainClassKey } from "./Main";

export interface PassengersProps {
  classes: Record<MainClassKey, string>;
  onClick: () => void;
}

export default class Passengers extends React.Component<PassengersProps> {
  render() {
    return (
      <>
        <Typography variant="caption" gutterBottom={true}>
          Passengers
        </Typography>
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
              Fulan AlFulani
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
                  University of Bahrain
                </Typography>
              </ListItem>
              <ListItem
                className={this.props.classes.listItem}
                component={ButtonBase}
              >
                <ListItemIcon>
                  <MapMarkerIcon className={this.props.classes.markerIcon} />
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
              className={classNames(
                this.props.classes.markerIcon,
                this.props.classes.aPersonIcon
              )}
            />
            <Typography className={this.props.classes.grow}>
              'Illan Al'illanah
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              <ListItem
                className={this.props.classes.listItem}
                component={ButtonBase}
              >
                <ListItemIcon>
                  <MapMarkerIcon className={this.props.classes.markerIcon} />
                </ListItemIcon>
                <Typography>
                  <Typography variant="caption">Pick-up Location:</Typography>
                  Arabian Gulf University
                </Typography>
              </ListItem>
              <ListItem
                className={this.props.classes.listItem}
                component={ButtonBase}
              >
                <ListItemIcon>
                  <MapMarkerIcon className={this.props.classes.markerIcon} />
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
        <AddPassengerForm />
      </>
    );
  }
}
