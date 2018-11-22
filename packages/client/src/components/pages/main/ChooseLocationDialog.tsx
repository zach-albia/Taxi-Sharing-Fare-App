import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { StyleRules, Theme } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import GoogleMap from "google-map-react";
import getConfig from "next/config";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import GoogleMapsApi from "../../../@types/GoogleMapsApi";
import { googleApiLoadedAction } from "../../../redux/actions";
import State from "../../../redux/State";
import SearchBox from "./SearchBox";

const {
  publicRuntimeConfig: {
    google: {
      api: { key }
    }
  }
} = getConfig();

type ChooseLocationDialogKey = "searchBox";

function styles(theme: Theme): StyleRules<ChooseLocationDialogKey> {
  return {
    searchBox: {
      marginTop: theme.spacing.unit * 7,
      zIndex: 20
    }
  };
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

interface ReduxProps {
  google: GoogleMapsApi;
  googleApiLoaded: typeof googleApiLoadedAction;
}

type Props = ChooseLocationDialogProps &
  ReduxProps & {
    classes: Record<ChooseLocationDialogKey, string>;
  };

export interface ChooseLocationDialogProps {
  open: boolean;
  onClose: () => void;
}

interface ChooseLocationDialogState {
  location?: any;
}

class ChooseLocationDialog extends React.Component<Props> {
  state: ChooseLocationDialogState = {};

  render() {
    const { classes, google, googleApiLoaded, onClose, open } = this.props;
    return (
      <Dialog
        fullScreen={true}
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        style={{ zIndex: 1100 }}
      >
        <AppBar elevation={0}>
          <Toolbar>
            <IconButton color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography
              variant="subheading"
              color="inherit"
              style={{ flexGrow: 1 }}
            >
              Choose pick-up location
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          style={{
            height: "100vh",
            position: "absolute",
            width: "100%",
            zIndex: 1
          }}
        >
          <GoogleMap
            bootstrapURLKeys={{
              key
            }}
            defaultCenter={{
              lat: 26.1065941,
              lng: 50.5093452
            }}
            defaultZoom={10}
            onGoogleApiLoaded={googleApiLoaded}
            // @ts-ignore
            placesLibrary={true}
            yesIWantToUseGoogleMapApiInternals={true}
          />
        </div>
        {google && (
          <>
            <Paper className={classes.searchBox} square={true}>
              <SearchBox google={google} placeholder="Search Bahrain" />
            </Paper>
            <Button
              style={{
                bottom: 24,
                left: "16%",
                position: "absolute",
                right: "16%",
                width: "66%",
                zIndex: 1200
              }}
              variant="contained"
              color="primary"
            >
              Save Location
            </Button>
          </>
        )}
      </Dialog>
    );
  }

  componentDidUpdate() {
    if (!this.props.open) {
      const pacContainers = document.getElementsByClassName("pac-container");
      // tslint:disable
      for (let i = 0; i < pacContainers.length; i++) {
        pacContainers.item(0).remove();
      }
    }
  }
}

function mapStateToProps(state: State) {
  return { google: state.google };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    googleApiLoaded: (api: GoogleMapsApi) =>
      dispatch(googleApiLoadedAction(api))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChooseLocationDialog));
