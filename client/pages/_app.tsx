import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import App, { AppComponentProps, Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import compose from "recompose/compose";

import { Store } from "redux";
import configureStore from "../src/redux/configureStore";
import getPageContext from "../src/styles/getPageContext";

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React)
// }

type Props = Readonly<
  {
    children?: React.ReactNode;
    store: Store<{}>;
  } & AppComponentProps
>;

class MyApp extends App {
  // noinspection JSUnusedGlobalSymbols
  public static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  public pageContext = null;
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  public render() {
    const { Component, pageProps, store } = this.props as Props;
    return (
      <Container>
        <Provider store={store}>
          <Component pageContext={this.pageContext} {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

// noinspection JSUnusedGlobalSymbols
export default compose(
  withRedux(configureStore),
  withReduxSaga({ async: true })
)(MyApp);
