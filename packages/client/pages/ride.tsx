import dynamic from "next/dynamic";
import Head from "next/head";
import { withRouter } from "next/router";
import AppContent from "pangwarta-shared/dist/lib/layout/AppContent";
import withRoot from "pangwarta-shared/dist/lib/layout/withRoot";
import * as React from "react";
import pages from "../src/pages";

const Ride = dynamic(() => import("../src/components/pages/ride/Ride"), {
  ssr: false
});

class RidePage extends React.Component<any> {
  static async getInitialProps({
    ctx: {
      query: { id }
    }
  }) {
    return { id };
  }

  render() {
    const { id } = this.props.initialProps;
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
