import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import App, { Container } from "next/app";
import Link from "next/link";
import LayoutContext from "pangwarta-shared/dist/lib/layout/LayoutContext";
import React from "react";
import { Provider } from "react-redux";
import compose from "recompose/compose";
import configureStore from "../src/redux/configureStore";
import strings from "../src/strings";
import getPageContext from "../src/styles/getPageContext";

class TaxiSharingApp extends App {
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
    const { Component, pageProps, store }: any = this.props;
    return (
      <Container>
        <Provider store={store}>
          <LayoutContext.Provider
            value={{
              Link,
              title: strings.organization
            }}
          >
            <Component pageContext={this.pageContext} {...pageProps} />
          </LayoutContext.Provider>
        </Provider>
      </Container>
    );
  }
}

// noinspection JSUnusedGlobalSymbols
export default compose(
  withRedux(configureStore),
  withReduxSaga({ async: true })
)(TaxiSharingApp);
