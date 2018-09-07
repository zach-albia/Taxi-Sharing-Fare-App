import React from "react";

export interface WithInitialProps<P, R> {
  getInitialProps?: (props: P) => R;
}

export type ComponentTypeWithInitialProps<P, R> = React.ComponentType<P> &
  WithInitialProps<P, R>;
