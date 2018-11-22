export interface Passenger {
  dropOffLocation: google.maps.Place;
  name: string;
  pickUpLocation: google.maps.Place;
}

export default interface TaxiRide {
  destination: google.maps.Place;
  origin: google.maps.Place;
  passengers: Passenger[];
}
