import { createAction } from "typesafe-actions";
import GoogleMapsApi from "../@types/GoogleMapsApi";
import actionTypes from "./actionTypes";

export const googleApiLoadedAction = createAction(
  actionTypes.GOOGLE_API_LOADED,
  resolve => {
    return (api: GoogleMapsApi) => resolve(api);
  }
);
