import { Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button/Button";
import red from "@material-ui/core/colors/red";
import Dialog from "@material-ui/core/Dialog";
import { StandardProps } from "@material-ui/core/es";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Slide from "@material-ui/core/Slide";
import { StyleRules } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import GoogleMap from "google-map-react";
import MapMarkerIcon from "mdi-material-ui/MapMarker";
import getConfig from "next/config";
import * as React from "react";
import TaxiSharingAppBar from "../TaxiSharingAppBar";
import Passengers from "./Passengers";

const {
  publicRuntimeConfig: {
    google: {
      api: { key }
    }
  }
} = getConfig();

function createMapOptions(_) {
  return {
    gestureHandling: "greedy" // Will capture all touch events on the map towards map panning
  };
}

export type MainClassKey =
  | "aPersonIcon"
  | "button"
  | "fab"
  | "grow"
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
      marginTop: theme.spacing.unit
    },
    fab: {
      bottom: theme.spacing.unit * 2,
      position: "fixed",
      right: theme.spacing.unit * 2
    },
    grow: {
      flexGrow: 1
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

interface MainState {
  dialogOpen: boolean;
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Main extends React.Component<MainProps, MainState> {
  state: MainState = {
    dialogOpen: false
  };

  private openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  private closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { dialogOpen } = this.state;
    return (
      <>
        <TaxiSharingAppBar />
        <Typography variant="subheading" gutterBottom={true}>
          Ride Details
        </Typography>
        <Typography variant="caption" gutterBottom={true}>
          Passengers
        </Typography>
        <Passengers classes={classes} onClick={this.openDialog} />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={classes.markerIcon}>
                <MapMarkerIcon />
              </InputAdornment>
            )
          }}
          label="Ride Origin"
          select={true}
          variant="outlined"
          fullWidth={true}
          value={0}
          margin="normal"
        >
          <MenuItem value={0}>University of Bahrain</MenuItem>
          <MenuItem value={1}>Arabian Gulf University</MenuItem>
        </TextField>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={classes.markerIcon}>
                <MapMarkerIcon />
              </InputAdornment>
            )
          }}
          label="Ride Destination"
          select={true}
          variant="outlined"
          fullWidth={true}
          value={1}
          margin="normal"
        >
          <MenuItem value={0}>Al Kindi Specialized Hospital</MenuItem>
          <MenuItem value={1}>Al Abraaj</MenuItem>
        </TextField>
        <Button
          fullWidth={true}
          variant="contained"
          className={classes.button}
          color="primary"
        >
          Split the Fare
        </Button>
        <Dialog
          fullScreen={true}
          open={dialogOpen}
          onClose={this.closeDialog}
          TransitionComponent={Transition}
        >
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.closeDialog}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="subheading"
                color="inherit"
                className={classes.grow}
              >
                Choose pick-up location
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{ height: "100vh", position: "absolute", width: "100%" }}>
            <GoogleMap
              bootstrapURLKeys={{
                key,
                region: "bh"
              }}
              defaultCenter={{
                lat: 26.1065941,
                lng: 50.5093452
              }}
              defaultZoom={10}
              options={createMapOptions}
            />
          </div>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(Main);
