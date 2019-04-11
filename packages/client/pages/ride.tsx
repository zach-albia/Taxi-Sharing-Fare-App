import Head from "next/head";
import { withRouter } from "next/router";
import AppContent from "pangwarta-shared/dist/lib/layout/AppContent";
import withRoot from "pangwarta-shared/dist/lib/layout/withRoot";
import * as React from "react";
import Ride from "../src/components/pages/ride/Ride";
import pages from "../src/pages";

class RidePage extends React.Component {
  render() {
    const parts = window.location.href.split("/");
    const id = parts[parts.length - 1];
    return (
      <>
        <Head>
          <title>Taxi Sharing | Ride </title>
          <meta name="description" content="Taxi Sharing history" />
        </Head>
        <AppContent>
          <Ride id={id} />
        </AppContent>
      </>
    );
  }
}

export default withRoot(pages, withRouter)(RidePage);
