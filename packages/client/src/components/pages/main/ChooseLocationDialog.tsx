import AppBar from "@material-ui/core/AppBar/AppBar";
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import CloseIcon from "@material-ui/icons/Close";
import GoogleMap from "google-map-react";
import getConfig from "next/config";
import * as React from "react";
import { MainClassKey } from "./Main";

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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

interface ChooseLocationDialogProps {
  open: boolean;
  onClose: () => void;
  classes: Record<MainClassKey, string>;
}

export class ChooseLocationDialog extends React.Component<
  ChooseLocationDialogProps
> {
  render() {
    return (
      <Dialog
        fullScreen={true}
        open={this.props.open}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.props.onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="subheading"
              color="inherit"
              className={this.props.classes.grow}
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
    );
  }
}
