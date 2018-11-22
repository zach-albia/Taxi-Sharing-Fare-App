import { ActionType, getType } from "typesafe-actions";
import uuid from "uuid/v1";
import { Passenger } from "../domain/TaxiRide";
import * as actions from "./actions";
import State from "./State";

export type RootAction = ActionType<typeof actions>;

export const exampleInitialState: State = {
  currentTaxiRide: {
    passengers: []
  }
};

export default function(state = exampleInitialState, action: RootAction) {
  switch (action.type) {
    case getType(actions.googleApiLoadedAction):
      return {
        ...state,
        google: action.payload
      };
    case getType(actions.addPassengerAction):
      const newPassenger: Passenger = {
        id: uuid(),
        name: action.payload
      };
      return {
        ...state,
        currentTaxiRide: {
          passengers: [...state.currentTaxiRide.passengers, newPassenger]
        }
      };
    default:
      return state;
  }
}
