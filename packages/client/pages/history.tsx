import dynamic from "next/dynamic";
import Head from "next/head";
import { withRouter } from "next/router";
import AppContent from "pangwarta-shared/dist/lib/layout/AppContent";
import withRoot from "pangwarta-shared/dist/lib/layout/withRoot";
import * as React from "react";
import pages from "../src/pages";

const RideHistory = dynamic(
  () => import("../src/components/pages/history/RideHistory"),
  { ssr: false }
);

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
