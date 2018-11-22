import { ActionType, getType } from "typesafe-actions";
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
    default:
      return state;
  }
}
