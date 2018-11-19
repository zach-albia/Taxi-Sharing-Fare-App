import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import * as React from "react";

export default function RideHistory() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="subheading" color="inherit">
          Taxi-sharing | History
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
