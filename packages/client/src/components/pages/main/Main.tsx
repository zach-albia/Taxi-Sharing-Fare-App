import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

export default function Main() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="subheading" color="inherit">
          Taxi-sharing
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
