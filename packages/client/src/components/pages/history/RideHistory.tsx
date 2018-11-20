import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import * as React from "react";

export default function RideHistory() {
  return (
    <AppBar>
      <Toolbar>
        <Link href="/">
          <Typography
            variant="subheading"
            color="inherit"
            style={{ flexGrow: 1 }}
          >
            Taxi Sharing
          </Typography>
        </Link>
        <Link href="/history">
          <Button color="inherit">Ride History</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
