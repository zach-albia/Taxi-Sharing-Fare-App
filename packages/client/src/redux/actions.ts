import { createAction } from "typesafe-actions";
import GoogleMapsApi from "../@types/GoogleMapsApi";
import actionTypes from "./actionTypes";

export const addPassengerAction = createAction(
  actionTypes.ADD_PASSENGER,
  resolve => (name: string) => resolve(name)
);

export const editPassengerNameAction = createAction(
  actionTypes.EDIT_PASSENGER_NAME,
  resolve => (id: string, name: string) => resolve({ id, name })
);

export const googleApiLoadedAction = createAction(
  actionTypes.GOOGLE_API_LOADED,
  resolve => (api: GoogleMapsApi) => resolve(api)
);
