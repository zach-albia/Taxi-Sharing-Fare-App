import Head from "next/head";
import { withRouter } from "next/router";
import AppContent from "pangwarta-shared/dist/lib/layout/AppContent";
import withRoot from "pangwarta-shared/dist/lib/layout/withRoot";
import * as React from "react";
import SettingsPage from "../src/components/pages/settings";
import pages from "../src/pages";

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
