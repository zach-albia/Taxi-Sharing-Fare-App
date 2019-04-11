import Head from "next/head";
import { withRouter } from "next/router";
import AppContent from "pangwarta-shared/dist/lib/layout/AppContent";
import withRoot from "pangwarta-shared/dist/lib/layout/withRoot";
import * as React from "react";
import RideHistory from "../src/components/pages/history/RideHistory";
import pages from "../src/pages";

const History = () => (
  <>
    <Head>
      <title>Taxi Sharing | History</title>
      <meta name="description" content="Taxi Sharing history" />
    </Head>
    <AppContent>
      <RideHistory />
    </AppContent>
  </>
);

export default withRoot(pages, withRouter)(History);
