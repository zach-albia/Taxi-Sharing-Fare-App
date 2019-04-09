import Head from "next/head";
import { withRouter } from "next/router";
import AppContent from "pangwarta-shared/dist/lib/layout/AppContent";
import withRoot from "pangwarta-shared/dist/lib/layout/withRoot";
import * as React from "react";
import Main from "../src/components/pages/main/Main";
import pages from "../src/pages";

const Index = () => (
  <>
    <Head>
      <title>Taxi Sharing</title>
      <meta name="description" content="Fair shares for taxi fares" />
    </Head>
    <AppContent>
      <Main />
    </AppContent>
  </>
);

export default withRoot(pages, withRouter)(Index);
