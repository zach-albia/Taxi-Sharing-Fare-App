import orangeTaxiFare from "../orange-taxi-fare";

/**
 * Cases:
 *
 * Day, not booked, d < 1 km or t < 10 min
 * Day, not booked, 1 km <= d < 25 km
 * Day, not booked, d >= 25 km
 * Day, booked, d < 1 km or t < 10 min
 * Day, booked, 1 km <= d < 25 km
 * Day, booked, d >= 25 km
 * Night, d < 1 km or t < 10 min
 * Night, 1 km <= d < 25 km
 * Night, d >= 25 km
 */
describe("taxi fare distance formula", () => {
  test.each`
    isBooked | isDay    | meters   | minutes | fare
    ${false} | ${true}  | ${500}   | ${5}    | ${1500}
    ${false} | ${true}  | ${250}   | ${3}    | ${1000}
    ${false} | ${true}  | ${100}   | ${8}    | ${1000}
    ${false} | ${true}  | ${1000}  | ${10}   | ${4000}
    ${false} | ${true}  | ${300}   | ${11}   | ${3000}
    ${false} | ${true}  | ${1500}  | ${10}   | ${4500}
    ${false} | ${true}  | ${1999}  | ${20}   | ${4500}
    ${false} | ${true}  | ${25000} | ${50}   | ${30000}
    ${true}  | ${true}  | ${500}   | ${5}    | ${1200}
    ${true}  | ${true}  | ${250}   | ${3}    | ${1100}
    ${true}  | ${true}  | ${100}   | ${8}    | ${1000}
    ${true}  | ${true}  | ${1000}  | ${10}   | ${3400}
    ${true}  | ${true}  | ${300}   | ${11}   | ${3100}
    ${true}  | ${true}  | ${1500}  | ${10}   | ${3600}
    ${true}  | ${true}  | ${1999}  | ${20}   | ${3700}
    ${true}  | ${true}  | ${25000} | ${50}   | ${15000}
    ${true}  | ${false} | ${500}   | ${5}    | ${1750}
    ${true}  | ${false} | ${250}   | ${3}    | ${1250}
    ${true}  | ${false} | ${100}   | ${8}    | ${1250}
    ${true}  | ${false} | ${1000}  | ${10}   | ${4750}
    ${true}  | ${false} | ${300}   | ${11}   | ${3750}
    ${true}  | ${false} | ${1500}  | ${10}   | ${5250}
    ${true}  | ${false} | ${1999}  | ${20}   | ${5250}
    ${true}  | ${false} | ${25000} | ${50}   | ${30750}
  `(
    "booked=$isBooked, day=$isDay, meters=$meters, minutes=$minutes -> " +
      "fare in fils=$fare",
    ({ isBooked, isDay, meters, minutes, fare }) => {
      expect(
        orangeTaxiFare({
          isBooked,
          isDay,
          meters,
          minutes
        })
      ).toEqual(fare);
    }
  );
});
