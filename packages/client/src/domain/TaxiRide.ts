export interface Passenger {
  dropOffLocation?: google.maps.Place;
  id: string;
  name: string;
  pickUpLocation?: google.maps.Place;
}

export default interface TaxiRide {
  destination?: google.maps.Place;
  origin?: google.maps.Place;
  passengerIds: string[];
  passengers: object;
}
