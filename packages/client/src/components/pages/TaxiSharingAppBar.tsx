import { StandardProps } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { StyleRules, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import * as React from "react";

type ClassKey = "grow" | "menuButton";

const styles: StyleRules<ClassKey> = {
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

export interface Props
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ClassKey> {
  classes: Record<ClassKey, string>;
}

function TaxiSharingAppBar({ classes }: Props) {
  return (
    <AppBar>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <Typography
            variant="subheading"
            color="inherit"
            className={classes.grow}
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

export default withStyles(styles)(TaxiSharingAppBar);
