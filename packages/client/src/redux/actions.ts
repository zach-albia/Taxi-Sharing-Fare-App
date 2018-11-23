import { createAction } from "typesafe-actions";
import GoogleMapsApi from "../@types/GoogleMapsApi";
import actionTypes from "./actionTypes";
import { PassengerLocation } from "./State";

export const addPassengerAction = createAction(
  actionTypes.ADD_PASSENGER,
  resolve => (name: string) => resolve(name)
);

export const deletePassengerAction = createAction(
  actionTypes.DELETE_PASSENGER,
  resolve => (id: string) => resolve(id)
);

export const editPassengerNameAction = createAction(
  actionTypes.EDIT_PASSENGER_NAME,
  resolve => (id: string, name: string) => resolve({ id, name })
);

export const googleApiLoadedAction = createAction(
  actionTypes.GOOGLE_API_LOADED,
  resolve => (api: GoogleMapsApi) => resolve(api)
);

export const setDialogLocationAction = createAction(
  actionTypes.SET_DIALOG_LOCATION,
  resolve => (dialogLocation: PassengerLocation) => resolve(dialogLocation)
);

export const setPassengerLocationAction = createAction(
  actionTypes.SET_PASSENGER_LOCATION,
  resolve => (passengerLocation: PassengerLocation) =>
    resolve(passengerLocation)
);
