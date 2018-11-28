interface Fare {
  firstExcess: number;
  rate: { fils: number; meters: number };
  starting: number;
}

/**
 * Taxi fares in Bahraini fils
 */
const fares = {
  day: {
    booked: {
      firstExcess: 2000,
      rate: { fils: 100, meters: 250 },
      starting: 1000
    },
    hailed: {
      firstExcess: 2000,
      rate: { fils: 500, meters: 500 },
      starting: 1000
    }
  },
  excess25km: 2000,
  night: {
    firstExcess: 2500,
    rate: { fils: 500, meters: 500 },
    starting: 1250
  }
};

/**
 * Details of a taxi ride used for the calculation in orangeTaxiFare.
 */
export interface FareMetrics {
  isBooked: boolean;
  isDaytime: boolean;
  distance: number; // in meters
  minutes: number;
}

/**
 * Calculates the fare for a Bahrain Orange Taxi Group taxi fare
 *
 * @param fareMetrics The details of the taxi fare
 *
 * @return The fare in Bahraini fils.
 */
export default function orangeTaxiFare(fareMetrics: FareMetrics): number {
  const fare: Fare = fareMetrics.isDaytime
    ? fareMetrics.isBooked
      ? fares.day.booked
      : fares.day.hailed
    : fares.night;
  return (
    fare.starting +
    Math.floor(fareMetrics.distance / fare.rate.meters) * fare.rate.fils +
    chargeFirstExcess(fareMetrics, fare) +
    chargeSecondExcess(fareMetrics)
  );
}

function chargeFirstExcess(fareMetrics: FareMetrics, fare: Fare) {
  const reachedFirstExcess =
    fareMetrics.distance >= 1000 || fareMetrics.minutes >= 10;
  return reachedFirstExcess ? fare.firstExcess : 0;
}

function chargeSecondExcess(fareMetrics: FareMetrics) {
  const reachedSecondExcess = fareMetrics.distance >= 25000;
  return reachedSecondExcess ? fares.excess25km : 0;
}
