import Head from "next/head";
import withMUI from "pangwarta-shared/dist/lib/layout/withMUI";
import * as React from "react";
import Ride from "../src/components/pages/ride/Ride";

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
        <div
          style={{
            paddingBottom: 64,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 56
          }}
        >
          <Ride id={id} />
        </div>
      </>
    );
  }
}

export default withMUI()(RidePage);
