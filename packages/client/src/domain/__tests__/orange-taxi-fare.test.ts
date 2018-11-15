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
  test("Day, not booked, d = 500 m, t = 5 min => BD 1.5", () => {
    expect(
      orangeTaxiFare({
        isBooked: false,
        isDayPeriod: true,
        meters: 500,
        minutes: 5
      })
    ).toBe(1500);
  });

  test("Day, not booked, d = 200 m, t = 3 min => BD 1", () => {
    expect(
      orangeTaxiFare({
        isBooked: false,
        isDayPeriod: true,
        meters: 200,
        minutes: 3
      })
    ).toBe(1000);
  });

  test("Day, not booked, d = 100m, t = 8 min => BD 1", () => {
    expect(
      orangeTaxiFare({
        isBooked: false,
        isDayPeriod: true,
        meters: 100,
        minutes: 8
      })
    ).toBe(1000);
  });
});
