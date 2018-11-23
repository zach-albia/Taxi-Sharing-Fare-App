import { ActionType, getType } from "typesafe-actions";
import uuid from "uuid/v1";
import { Passenger } from "../domain/TaxiRide";
import * as actions from "./actions";
import State from "./State";

export type RootAction = ActionType<typeof actions>;

export const exampleInitialState: State = {
  currentTaxiRide: {
    passengerIds: [],
    passengers: {}
  }
};

export default function(state = exampleInitialState, action: RootAction) {
  switch (action.type) {
    case getType(actions.addPassengerAction):
      const newPassenger: Passenger = {
        id: uuid(),
        name: action.payload
      };
      return {
        ...state,
        currentTaxiRide: {
          passengerIds: [
            ...state.currentTaxiRide.passengerIds,
            newPassenger.id
          ],
          passengers: {
            ...state.currentTaxiRide.passengers,
            [newPassenger.id]: newPassenger
          }
        }
      };
    case getType(actions.deletePassengerAction):
      const passengers = { ...state.currentTaxiRide.passengers };
      const id = action.payload;
      const passengerIds = state.currentTaxiRide.passengerIds.filter(
        passengerId => passengerId !== id
      );
      delete passengers[id];
      return {
        ...state,
        currentTaxiRide: {
          ...state.currentTaxiRide,
          passengerIds,
          passengers
        }
      };
    case getType(actions.editPassengerNameAction):
      return {
        ...state,
        currentTaxiRide: {
          ...state.currentTaxiRide,
          passengers: {
            ...state.currentTaxiRide.passengers,
            [action.payload.id]: {
              ...state.currentTaxiRide.passengers[action.payload.id],
              name: action.payload.name
            }
          }
        }
      };
    case getType(actions.googleApiLoadedAction):
      return {
        ...state,
        google: action.payload
      };
    default:
      return state;
  }
}
