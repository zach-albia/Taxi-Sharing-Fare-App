import orangeTaxiFare from "../orange-taxi-fare";

/**
 * Cases:
 *
 * Day, not booked, d < 1 km or t < 10 min
 * Day, not booked, 1 <= d < 25
 * Day, not booked, d >= 25
 * Day, booked, d < 1 km or t < 10 min
 * Day, booked, 1 <= d < 25
 * Day, booked, d >= 25
 * Night, d < 1 km or t < 10 min
 * Night, 1 <= d < 25
 * Night, d >= 25
 */
describe("taxi fare distance formula", () => {
  test.each`
    isBooked | isDay   | meters | minutes | fare
    ${false} | ${true} | ${500} | ${5}    | ${1500}
    ${false} | ${true} | ${200} | ${3}    | ${1000}
    ${false} | ${true} | ${100} | ${8}    | ${1000}
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
