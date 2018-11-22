import { Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import red from "@material-ui/core/colors/red";
import { StandardProps } from "@material-ui/core/es";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import { StyleRules } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MapMarkerIcon from "mdi-material-ui/MapMarker";
import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import TaxiRide from "../../../domain/TaxiRide";
import State from "../../../redux/State";
import TaxiSharingAppBar from "../TaxiSharingAppBar";
import ChooseLocationDialog from "./ChooseLocationDialog";
import { MainClassKey } from "./Main";
import Passengers from "./Passengers";
import PlaceSelect from "./PlaceSelect";

export type MainClassKey =
  | "aPersonIcon"
  | "button"
  | "fab"
  | "grow"
  | "listItem"
  | "markerIcon"
  | "selectIcon";

function styles(theme: Theme): StyleRules<MainClassKey> {
  return {
    aPersonIcon: {
      color: "rgba(0, 0, 0, 0.54)",
      flexShrink: 0,
      marginRight: theme.spacing.unit * 2
    },
    button: {
      marginBottom: theme.spacing.unit * 2,
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
    },
    selectIcon: {
      marginRight: theme.spacing.unit * 2
    }
  };
}

interface ReduxProps {
  destinations: google.maps.Place[];
  origins: google.maps.Place[];
  taxiRide: TaxiRide;
  taxiRideIsValid: boolean;
}

type Props = ReduxProps & {
  classes: Record<MainClassKey, string>;
} & StandardProps<React.HTMLAttributes<HTMLDivElement>, MainClassKey>;

interface MainState {
  dialogOpen: boolean;
}

class Main extends React.Component<Props, MainState> {
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
    const {
      classes,
      destinations,
      origins,
      taxiRide,
      taxiRideIsValid
    } = this.props;
    const { dialogOpen } = this.state;
    return (
      <>
        <TaxiSharingAppBar />
        <Typography variant="subheading" gutterBottom={true}>
          Ride Details
        </Typography>
        <Passengers classes={classes} onClick={this.openDialog} />
        <PlaceSelect
          classes={classes}
          label="Origin"
          place={taxiRide.origin}
          places={origins}
        />
        <PlaceSelect
          classes={classes}
          label="Origin"
          place={taxiRide.destination}
          places={destinations}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={classes.markerIcon}>
                <MapMarkerIcon />
              </InputAdornment>
            )
          }}
          SelectProps={{
            classes: {
              icon: classes.selectIcon
            }
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
          SelectProps={{
            classes: {
              icon: classes.selectIcon
            }
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
          disabled={!taxiRideIsValid}
          fullWidth={true}
          variant="contained"
          className={classes.button}
          color="primary"
        >
          Split the Fare
        </Button>
        <ChooseLocationDialog open={dialogOpen} onClose={this.closeDialog} />
      </>
    );
  }
}

function taxiRideSelector(state: State) {
  return state.currentTaxiRide;
}

const originsSelector = createSelector(taxiRideSelector, taxiRide =>
  taxiRide.passengers.filter(p => !!p.pickUpLocation).map(p => p.pickUpLocation)
);

const destinationsSelector = createSelector(taxiRideSelector, taxiRide =>
  taxiRide.passengers
    .filter(p => !!p.dropOffLocation)
    .map(p => p.dropOffLocation)
);

const taxiRideIsValidSelector = createSelector(
  taxiRideSelector,
  ({ passengers, destination, origin }) =>
    passengers.length > 0 &&
    passengers.every(p => !!p.pickUpLocation && !!p.dropOffLocation) &&
    !!origin &&
    !!destination
);

const mapStateToProps = createSelector(
  taxiRideSelector,
  originsSelector,
  destinationsSelector,
  taxiRideIsValidSelector,
  (taxiRide, origins, destinations, taxiRideIsValid) => ({
    destinations,
    origins,
    taxiRide,
    taxiRideIsValid
  })
);

export default connect(mapStateToProps)(withStyles(styles)(Main));
