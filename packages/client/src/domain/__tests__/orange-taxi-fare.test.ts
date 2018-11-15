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
    isBooked | isDay   | meters  | minutes | fare
    ${false} | ${true} | ${500}  | ${5}    | ${1500}
    ${false} | ${true} | ${200}  | ${3}    | ${1000}
    ${false} | ${true} | ${100}  | ${8}    | ${1000}
    ${false} | ${true} | ${1000} | ${10}   | ${4000}
    ${false} | ${true} | ${300}  | ${11}   | ${3000}
    ${false} | ${true} | ${1500} | ${10}   | ${4500}
  `(
    "booked=$isBooked, day=$isDay, meters=$meters, minutes=$minutes -> fare=$fare",
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
