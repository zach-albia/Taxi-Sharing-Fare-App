import { Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import red from "@material-ui/core/colors/red";
import { StandardProps } from "@material-ui/core/es";
import { StyleRules } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import TaxiRide, { Passenger } from "../../../domain/TaxiRide";
import {
  chooseDestinationAction,
  chooseOriginAction,
  setDialogLocationAction
} from "../../../redux/actions";
import State, { PassengerLocation } from "../../../redux/State";
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
  | "markerIcon";

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
    }
  };
}

interface ReduxProps {
  chooseDestination: typeof chooseDestinationAction;
  chooseOrigin: typeof chooseOriginAction;
  destinations: google.maps.Place[];
  origins: google.maps.Place[];
  passengers: Passenger[];
  setDialogLocation: typeof setDialogLocationAction;
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

  private openDialog = (passengerLocation: PassengerLocation) => () => {
    this.props.setDialogLocation(passengerLocation);
    this.setState({ dialogOpen: true });
  };

  private closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const {
      chooseDestination,
      chooseOrigin,
      classes,
      destinations,
      origins,
      passengers,
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
        <Passengers
          classes={classes}
          onLocationClick={this.openDialog}
          passengers={passengers}
        />
        {origins && (
          <PlaceSelect
            label="Origin"
            onSelect={chooseOrigin}
            place={taxiRide.origin}
            places={origins}
          />
        )}
        {destinations && (
          <PlaceSelect
            label="Destination"
            onSelect={chooseDestination}
            place={taxiRide.destination}
            places={destinations}
          />
        )}
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

const passengersSelector = createSelector(taxiRideSelector, taxiRide =>
  taxiRide.passengerIds.map(id => taxiRide.passengers[id] as Passenger)
);

const originsSelector = createSelector(passengersSelector, passengers =>
  passengers.filter(p => !!p.pickUpLocation).map(p => p.pickUpLocation)
);

const destinationsSelector = createSelector(passengersSelector, passengers =>
  passengers.filter(p => !!p.dropOffLocation).map(p => p.dropOffLocation)
);

const taxiRideIsValidSelector = createSelector(
  taxiRideSelector,
  passengersSelector,
  ({ destination, origin }, passengers) =>
    passengers.length > 0 &&
    passengers.every(p => !!p.pickUpLocation && !!p.dropOffLocation) &&
    !!origin &&
    !!destination
);

const mapStateToProps = createSelector(
  taxiRideSelector,
  passengersSelector,
  originsSelector,
  destinationsSelector,
  taxiRideIsValidSelector,
  (taxiRide, passengers, origins, destinations, taxiRideIsValid) => ({
    destinations,
    origins,
    passengers,
    taxiRide,
    taxiRideIsValid
  })
);

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    chooseDestination: (destination: google.maps.Place) =>
      dispatch(chooseDestinationAction(destination)),
    chooseOrigin: (origin: google.maps.Place) =>
      dispatch(chooseOriginAction(origin)),
    setDialogLocation: (dialogLocation: PassengerLocation) =>
      dispatch(setDialogLocationAction(dialogLocation))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Main));
