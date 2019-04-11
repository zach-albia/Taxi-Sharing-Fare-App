import React from "react";

export interface WithInitialProps<P, R> {
  getInitialProps?: (props: P) => R;
}

export type ComponentTypeWithInitialProps<P, R> = React.ComponentType<P> &
  WithInitialProps<P, R>;

export interface Fares {
  firstExcess: number;
  rate: { fils: number; meters: number };
  starting: number;
}

export interface FareMatrix {
  day: {
    booked: Fares;
    hailed: Fares;
  };
  excess25km: number;
  night: Fares;
}
