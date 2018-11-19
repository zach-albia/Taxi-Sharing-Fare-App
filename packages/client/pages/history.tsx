import Head from "next/head";
import AppContent from "pangwarta-shared/dist/lib/layout/AppContent";
import withMUI from "pangwarta-shared/dist/lib/layout/withMUI";
import * as React from "react";
import RideHistory from "../src/components/pages/history/RideHistory";

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

export default withMUI()(History);
