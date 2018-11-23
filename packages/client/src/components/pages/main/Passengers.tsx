import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Passenger } from "../../../domain/TaxiRide";
import AddPassengerForm from "./AddPassengerForm";
import { MainClassKey } from "./Main";
import PassengerPanel from "./PassengerPanel";

export interface PassengersProps {
  classes: Record<MainClassKey, string>;
  onClickLocation: () => void;
  passengers: Passenger[];
}

export default class Passengers extends React.PureComponent<PassengersProps> {
  render() {
    const { classes, onClickLocation, passengers } = this.props;
    return (
      <>
        {passengers.length > 0 ? (
          passengers.map(passenger => (
            <PassengerPanel
              key={passenger.id}
              classes={classes}
              passenger={passenger}
              onClick={onClickLocation}
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
