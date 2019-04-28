import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Link from "next/link";
import * as React from "react";
import keys from "../../../localStorageKeys";
import { Result } from "../../../redux/State";

export default function RideHistory() {
  const rideIds = JSON.parse(localStorage.getItem(keys.rideIds)) as string[];
  const results = rideIds
    .map(id => JSON.parse(localStorage.getItem(`ride-${id}`)) as Result)
    .sort(
      (a, b) =>
        new Date(b.taxiRide.timestamp).getTime() -
        new Date(a.taxiRide.timestamp).getTime()
    );
  return (
    <>
      <Typography variant="subheading" gutterBottom={true}>
        Rides
      </Typography>
      {results.length > 0 ? (
        <Paper>
          <List>
            {results.map(result => (
              <Link href={`/ride?id=${result.id}`} key={result.id}>
                <ListItem button={true}>
                  <Typography>
                    {moment(result.taxiRide.timestamp).format("llll")} (
                    {moment(result.taxiRide.timestamp).fromNow()})
                  </Typography>
                </ListItem>
              </Link>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography>
          Your ride history is empty. Get started by entering some rides in the{" "}
          <Link href="/">Taxi Sharing Page</Link>.
        </Typography>
      )}
    </>
  );
}
