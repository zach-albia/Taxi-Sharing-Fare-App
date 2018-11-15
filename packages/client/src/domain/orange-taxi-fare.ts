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
  return rates.day.starting + Math.floor(ride.meters / 500) * 500;
}
