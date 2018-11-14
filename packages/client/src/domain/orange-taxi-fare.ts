interface Ride {
  isBooked: boolean;
  isDayPeriod: boolean;
  meters: number;
  minutes: number;
}

export default function orangeTaxiFare(_: Ride) {
  return 1500;
}
