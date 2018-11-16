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
export interface TaxiRide {
  isBooked: boolean;
  isDay: boolean;
  meters: number;
  minutes: number;
}

/**
 * Calculates the fare for a Bahrain Orange Taxi Group taxi ride
 *
 * @param ride The details of the taxi ride
 *
 * @return The fare in Bahraini fils.
 */
export default function orangeTaxiFare(ride: TaxiRide): number {
  const fare: Fare = ride.isDay
    ? ride.isBooked
      ? fares.day.booked
      : fares.day.hailed
    : fares.night;
  return (
    fare.starting +
    Math.floor(ride.meters / fare.rate.meters) * fare.rate.fils +
    chargeFirstExcess(ride, fare) +
    chargeSecondExcess(ride)
  );
}

function chargeFirstExcess(ride: TaxiRide, fare: Fare) {
  const reachedFirstExcess = ride.meters >= 1000 || ride.minutes >= 10;
  return reachedFirstExcess ? fare.firstExcess : 0;
}

function chargeSecondExcess(ride: TaxiRide) {
  const reachedSecondExcess = ride.meters >= 25000;
  return reachedSecondExcess ? fares.excess25km : 0;
}
