import dynamic from "next/dynamic";
import Head from "next/head";
import { withRouter } from "next/router";
import AppContent from "pangwarta-shared/dist/lib/layout/AppContent";
import withRoot from "pangwarta-shared/dist/lib/layout/withRoot";
import * as React from "react";
import pages from "../src/pages";

const SettingsPage = dynamic(
  // TODO: is the "as any" hack to please TS really necessary?
  () => import("../src/components/pages/settings") as any,
  { ssr: false }
);

const Settings = () => (
  <>
    <Head>
      <title>Taxi Sharing | Settings</title>
      <meta name="description" content="Taxi Sharing settings" />
    </Head>
    <AppContent>
      <SettingsPage />
    </AppContent>
  </>
);

export default withRoot(pages, withRouter)(Settings);
