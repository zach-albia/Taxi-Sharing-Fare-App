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
import { LocationType } from "../../../domain/TaxiRide";
import {
  googleApiLoadedAction,
  setDialogLocationAction,
  setPassengerLocationAction
} from "../../../redux/actions";
import State, { PassengerLocation } from "../../../redux/State";
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
  dialogLocation?: PassengerLocation;
  google: GoogleMapsApi;
  googleApiLoaded: typeof googleApiLoadedAction;
  setDialogLocation: typeof setDialogLocationAction;
  setPassengerLocation: typeof setPassengerLocationAction;
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
  location?: google.maps.LatLngLiteral;
}

class ChooseLocationDialog extends React.Component<Props> {
  state: ChooseLocationDialogState = {};

  private geocoder: google.maps.Geocoder;
  private marker: google.maps.Marker;

  private onSaveLocation = () => {
    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder();
    }
    const { dialogLocation, setPassengerLocation } = this.props;
    const { location } = this.state;
    this.geocoder.geocode({ location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const result = results[0];
        if (result) {
          const updatedLocation: PassengerLocation = {
            ...dialogLocation,
            place: {
              ...dialogLocation.place,
              location,
              placeId: result.place_id,
              query: result.formatted_address
            }
          };
          setPassengerLocation(updatedLocation);
          this.props.onClose();
        }
      }
    });
  };

  private onGoogleMapClick = location => {
    this.setState({ location });
    this.setMarker(location);
  };

  private googleApiLoaded = (api: GoogleMapsApi) => {
    const { dialogLocation, googleApiLoaded } = this.props;
    googleApiLoaded(api);
    if (dialogLocation && dialogLocation.place) {
      this.setMarker(dialogLocation.place
        .location as google.maps.LatLngLiteral);
    }
  };

  private setMarker(location: google.maps.LatLngLiteral) {
    if (!this.marker) {
      this.marker = new google.maps.Marker();
    }
    this.marker.setMap(this.props.google.map);
    this.marker.setPosition(location);
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

  render() {
    const { classes, dialogLocation, google, onClose, open } = this.props;
    const { location } = this.state;
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
              {dialogLocation &&
                `Choose ${
                  dialogLocation.type === LocationType.Pickup
                    ? "Pickup"
                    : "Drop Off"
                } Location`}
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
            onClick={this.onGoogleMapClick}
            onGoogleApiLoaded={this.googleApiLoaded}
            // @ts-ignore
            placesLibrary={true}
            yesIWantToUseGoogleMapApiInternals={true}
          />
        </div>
        {google && (
          <>
            <Paper className={classes.searchBox} square={true}>
              <SearchBox
                google={google}
                placeholder="Search Bahrain"
                query={
                  dialogLocation && dialogLocation.place
                    ? dialogLocation.place.query
                    : undefined
                }
              />
            </Paper>
            <Button
              color="primary"
              disabled={!location}
              onClick={this.onSaveLocation}
              style={{
                bottom: 24,
                left: "16%",
                position: "absolute",
                right: "16%",
                width: "66%",
                zIndex: 1200
              }}
              variant="contained"
            >
              Save Location
            </Button>
          </>
        )}
      </Dialog>
    );
  }
}

function mapStateToProps({ dialogLocation, google }: State) {
  return { dialogLocation, google };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    googleApiLoaded: (api: GoogleMapsApi) =>
      dispatch(googleApiLoadedAction(api)),
    setDialogLocation: (dialogLocation: PassengerLocation) =>
      dispatch(setDialogLocationAction(dialogLocation)),
    setPassengerLocation: (passengerLocation: PassengerLocation) =>
      dispatch(setPassengerLocationAction(passengerLocation))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChooseLocationDialog));
