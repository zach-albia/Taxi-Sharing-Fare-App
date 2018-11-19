import Head from "next/head";
import AppContent from "pangwarta-shared/dist/lib/layout/AppContent";
import withMUI from "pangwarta-shared/dist/lib/layout/withMUI";
import * as React from "react";
import RideHistory from "../src/components/pages/index/RideHistory";

const Index = () => (
  <>
    <Head>
      <title>Taxi Sharing Fares</title>
      <meta name="description" content="Fair shares for taxi fares" />
    </Head>
    <AppContent>
      <RideHistory />
    </AppContent>
  </>
);

export default withMUI()(Index);
