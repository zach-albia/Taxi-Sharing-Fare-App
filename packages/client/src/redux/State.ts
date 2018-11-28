import TaxiRide, { LocationType, Player } from "../domain/TaxiRide";

export interface PassengerLocation {
  id: string;
  place?: google.maps.Place;
  type: LocationType;
}

export interface Result {
  id: string;
  directionsResult: google.maps.DirectionsResult;
  minutes?: number;
  result: {
    tenMinPlayers: Player[];
    zeroMinPlayers: Player[];
  };
  taxiRide: TaxiRide;
}

export default interface State {
  calculating: boolean;
  currentTaxiRide: TaxiRide;
  dialogLocation?: PassengerLocation;
  google?: typeof google;
  results: Result[];
}
