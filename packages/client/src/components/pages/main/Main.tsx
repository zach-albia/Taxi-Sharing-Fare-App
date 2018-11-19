import { Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import deepOrange from "@material-ui/core/colors/deepOrange";
import red from "@material-ui/core/colors/red";
import { StandardProps } from "@material-ui/core/es";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { StyleRules } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/PersonPin";
import classNames from "classnames";
import MapMarkerIcon from "mdi-material-ui/MapMarker";
import * as React from "react";

type MainClassKey =
  | "aPersonIcon"
  | "button"
  | "fab"
  | "listItem"
  | "markerIcon";

function styles(theme: Theme): StyleRules<MainClassKey> {
  return {
    aPersonIcon: {
      color: "rgba(0, 0, 0, 0.54)",
      flexShrink: 0,
      marginRight: theme.spacing.unit * 2
    },
    button: {
      "&:hover": {
        backgroundColor: deepOrange[500]
      },
      backgroundColor: deepOrange[500],
      marginTop: theme.spacing.unit
    },
    fab: {
      bottom: theme.spacing.unit * 2,
      position: "absolute",
      right: theme.spacing.unit * 2
    },
    listItem: {
      paddingLeft: 0
    },
    markerIcon: {
      color: red["500"]
    }
  };
}

export interface MainProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, MainClassKey> {
  classes: Record<MainClassKey, string>;
}

function Main(props: MainProps) {
  const { classes } = props;
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="subheading" color="inherit">
            Taxi-sharing
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="subheading" gutterBottom={true}>
        Passengers
      </Typography>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <PersonIcon
            color="inherit"
            className={classNames(classes.markerIcon, classes.aPersonIcon)}
          />
          <Typography>Fulan AlFulani</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <ListItem className={classes.listItem} component={ButtonBase}>
              <ListItemIcon>
                <MapMarkerIcon className={classes.markerIcon} />
              </ListItemIcon>
              <Typography>Origin: University of Bahrain</Typography>
            </ListItem>
            <ListItem className={classes.listItem} component={ButtonBase}>
              <ListItemIcon>
                <MapMarkerIcon className={classes.markerIcon} />
              </ListItemIcon>
              <Typography>
                Destination: Al Kindi Specialized Hospital
              </Typography>
            </ListItem>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <PersonIcon
            color="inherit"
            className={classNames(classes.markerIcon, classes.aPersonIcon)}
          />
          <Typography>'Illan Al'illanah</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <ListItem className={classes.listItem} component={ButtonBase}>
              <ListItemIcon>
                <MapMarkerIcon className={classes.markerIcon} />
              </ListItemIcon>
              <Typography>Origin: Arabian Gulf University</Typography>
            </ListItem>
            <ListItem className={classes.listItem} component={ButtonBase}>
              <ListItemIcon>
                <MapMarkerIcon className={classes.markerIcon} />
              </ListItemIcon>
              <Typography>Destination: Al Abraaj</Typography>
            </ListItem>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Button
        fullWidth={true}
        variant="contained"
        className={classes.button}
        color="primary"
      >
        Split the Fare
      </Button>
      <Button variant="fab" color="secondary" className={classes.fab}>
        <AddIcon />
      </Button>
    </>
  );
}

export default withStyles(styles)(Main);
