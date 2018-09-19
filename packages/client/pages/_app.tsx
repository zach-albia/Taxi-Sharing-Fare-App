import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import Routes from "next-routes";
import App, { AppComponentProps, Container } from "next/app";
import LayoutContext from "pangwarta-shared/dist/lib/layout/LayoutContext";
import React from "react";
import { Provider } from "react-redux";
import compose from "recompose/compose";
import { Store } from "redux";
import AppRoutes from "../routes";
import configureStore from "../src/redux/configureStore";
import strings from "../src/strings";
import getPageContext from "../src/styles/getPageContext";

const { Link } = AppRoutes as Routes;

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
)(MyApp);
