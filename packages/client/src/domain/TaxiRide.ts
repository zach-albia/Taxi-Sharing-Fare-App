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

export default interface TaxiRide {
  booked: boolean;
  daytime: boolean;
  destination?: google.maps.Place;
  origin?: google.maps.Place;
  passengerIds: string[];
  passengers: object;
}
