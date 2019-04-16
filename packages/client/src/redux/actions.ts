import { createAction } from "typesafe-actions";
import GoogleMapsApi from "../@types/GoogleMapsApi";
import actionTypes from "./actionTypes";
import { PassengerLocation } from "./State";

export const addPassengerAction = createAction(
  actionTypes.ADD_PASSENGER,
  resolve => (name: string) => resolve(name)
);

export const chooseDestinationAction = createAction(
  actionTypes.CHOOSE_DESTINATION,
  resolve => (destination: google.maps.Place) => resolve(destination)
);

export const chooseOriginAction = createAction(
  actionTypes.CHOOSE_ORIGIN,
  resolve => (origin: google.maps.Place) => resolve(origin)
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

export const splitFareAction = createAction(actionTypes.SPLIT_FARE);

export const toggleBookedAction = createAction(actionTypes.TOGGLE_BOOKED);

export const toggleDaytimeAction = createAction(actionTypes.TOGGLE_DAYTIME);
