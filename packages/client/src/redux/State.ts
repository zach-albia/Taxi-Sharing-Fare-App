import TaxiRide, { LocationType } from "../domain/TaxiRide";

export interface PassengerLocation {
  id: string;
  place?: google.maps.Place;
  type: LocationType;
}

export default interface State {
  dialogLocation?: PassengerLocation;
  currentTaxiRide: TaxiRide;
  google?: typeof google;
}
