export enum LocationType {
  Pickup,
  DropOff
}

export interface Passenger {
  dropOffLocation?: google.maps.Place;
  id: string;
  name: string;
  pickUpLocation?: google.maps.Place;
}

export type Player = Passenger & {
  distance?: number;
  fare?: number; // in fils
  legs?: google.maps.DirectionsLeg[];
};

export default interface TaxiRide {
  destination?: google.maps.Place;
  isBooked: boolean;
  isDaytime: boolean;
  origin?: google.maps.Place;
  passengerIds: string[];
  passengers: object;
}
