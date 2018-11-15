/**
 * Details of a taxi ride used for the calculation in orangeTaxiFare.
 */
interface TaxiRide {
  /**
   * Whether a taxi ride is book
   */
  isBooked: boolean;
  isDay: boolean;
  meters: number;
  minutes: number;
}

/**
 * Rates in Bahraini fils
 */
const rates = {
  day: {
    perDistance: { fils: 500, meters: 500 },
    starting: 1000
  }
};

/**
 * Calculates the fare for a Bahrain Orange Taxi Group taxi ride
 *
 * @param ride The details of the taxi ride
 *
 * @return The fare in Bahraini fils.
 */
export default function orangeTaxiFare(ride: TaxiRide): number {
  return (
    rates.day.starting +
    Math.floor(ride.meters / rates.day.perDistance.meters) *
      rates.day.perDistance.fils +
    firstExcessCharge(ride)
  );
}

function firstExcessCharge(ride: TaxiRide) {
  return ride.meters >= 1000 || ride.minutes >= 10 ? 2000 : 0;
}
