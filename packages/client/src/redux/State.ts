import TaxiRide from "../domain/TaxiRide";

export default interface State {
  google?: typeof google;
  currentTaxiRide: TaxiRide;
}
