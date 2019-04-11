import { defaultFareMatrix } from "../defaults";
import { Fares } from "../types";

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
 * @param fareComponents The aspects of the ride that make up the taxi fare
 *
 * @param fareMatrix The rates to use for the fare metrics
 *
 * @return The fare in Bahraini fils.
 */
export default function orangeTaxiFare(
  fareComponents: FareMetrics,
  fareMatrix = defaultFareMatrix
): number {
  const fare: Fares = fareComponents.isDaytime
    ? fareComponents.isBooked
      ? fareMatrix.day.booked
      : fareMatrix.day.hailed
    : fareMatrix.night;
  return (
    fare.starting +
    Math.floor(fareComponents.distance / fare.rate.meters) * fare.rate.fils +
    chargeFirstExcess(fareComponents, fare) +
    chargeSecondExcess(fareComponents, fareMatrix)
  );
}

function chargeFirstExcess(fareMetrics: FareMetrics, fare: Fares) {
  const reachedFirstExcess =
    fareMetrics.distance >= 1000 || fareMetrics.minutes >= 10;
  return reachedFirstExcess ? fare.firstExcess : 0;
}

function chargeSecondExcess(fareMetrics: FareMetrics, fareMatrix) {
  const reachedSecondExcess = fareMetrics.distance >= 25000;
  return reachedSecondExcess ? fareMatrix.excess25km : 0;
}
