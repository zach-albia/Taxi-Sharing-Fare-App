import Document, {
  DocumentProps,
  Head,
  Main,
  NextDocumentContext,
  NextScript,
  PageProps
} from "next/document";
import { PageContext } from "pangwarta-shared/dist/lib/@types/pageContext";
import React from "react";
import flush from "styled-jsx/server";
import theme from "../src/theme";

interface WrappedComponentProps extends PageProps {
  pageContext: PageContext;
}

class MyDocument extends Document {
  // noinspection JSUnusedGlobalSymbols
  public static getInitialProps(ctx: NextDocumentContext): DocumentProps {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    let pageContext: PageContext;
    const page = ctx.renderPage(Component => (props: WrappedComponentProps) => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    });

    // noinspection JSUnusedAssignment
    return {
      ...page,
      pageContext,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        <React.Fragment key="jss-server-side">
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry.toString()
            }}
          />
          {flush() || null}
        </React.Fragment>
      ]
    };
  }

  public render() {
    const { canonical } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <title>Pangwarta</title>
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content={
              "user-scalable=0, initial-scale=1, " +
              "minimum-scale=1, width=device-width, height=device-height"
            }
          />
          <link rel="manifest" href="/static/manifest.json" />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="canonical" href={canonical} />
          {/* DNS Prefetch */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

// noinspection JSUnusedGlobalSymbols
export default MyDocument;
