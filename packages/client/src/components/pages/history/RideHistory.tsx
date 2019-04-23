import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import * as React from "react";
import keys from "../../../localStorageKeys";
import { Result } from "../../../redux/State";

export default function RideHistory() {
  const rideIds = JSON.parse(localStorage.getItem(keys.rideIds)) as string[];
  const results = rideIds.map(
    id => JSON.parse(localStorage.getItem(`ride-${id}`)) as Result
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
              <Link href={`/ride?id=${result.id}`}>
                <ListItem button={true}>
                  <Typography>{result.taxiRide.timestamp}</Typography>
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
