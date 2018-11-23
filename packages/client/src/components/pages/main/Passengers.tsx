import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Passenger } from "../../../domain/TaxiRide";
import { PassengerLocation } from "../../../redux/State";
import AddPassengerForm from "./AddPassengerForm";
import { MainClassKey } from "./Main";
import PassengerPanel from "./PassengerPanel";

export interface PassengersProps {
  classes: Record<MainClassKey, string>;
  onLocationClick: (passengerLocation: PassengerLocation) => () => void;
  passengers: Passenger[];
}

export default class Passengers extends React.PureComponent<PassengersProps> {
  render() {
    const { classes, onLocationClick, passengers } = this.props;
    return (
      <>
        {passengers.length > 0 ? (
          passengers.map(passenger => (
            <PassengerPanel
              key={passenger.id}
              classes={classes}
              passenger={passenger}
              onLocationClick={onLocationClick}
            />
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
