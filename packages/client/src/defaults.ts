import { FareMatrix } from "./types";

/**
 * Taxi defaultFareMatrix in Bahraini fils
 */
export const defaultFareMatrix: FareMatrix = {
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
