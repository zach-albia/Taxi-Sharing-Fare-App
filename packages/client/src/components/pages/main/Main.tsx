import { Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import red from "@material-ui/core/colors/red";
import { StandardProps } from "@material-ui/core/es";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import { StyleRules } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MapMarkerIcon from "mdi-material-ui/MapMarker";
import * as React from "react";
import TaxiSharingAppBar from "../TaxiSharingAppBar";
import ChooseLocationDialog from "./ChooseLocationDialog";
import Passengers from "./Passengers";

export type MainClassKey =
  | "aPersonIcon"
  | "button"
  | "fab"
  | "grow"
  | "listItem"
  | "markerIcon";

function styles(theme: Theme): StyleRules<MainClassKey> {
  return {
    aPersonIcon: {
      color: "rgba(0, 0, 0, 0.54)",
      flexShrink: 0,
      marginRight: theme.spacing.unit * 2
    },
    button: {
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit
    },
    fab: {
      bottom: theme.spacing.unit * 2,
      position: "fixed",
      right: theme.spacing.unit * 2
    },
    grow: {
      flexGrow: 1
    },
    listItem: {
      paddingLeft: 0
    },
    markerIcon: {
      color: red["500"]
    }
  };
}

export type MainProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  MainClassKey
>;

type Props = MainProps & { classes: Record<MainClassKey, string> };

interface MainState {
  dialogOpen: boolean;
}

class Main extends React.Component<Props, MainState> {
  state: MainState = {
    dialogOpen: false
  };

  private openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  private closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { dialogOpen } = this.state;
    return (
      <>
        <TaxiSharingAppBar />
        <Typography variant="subheading" gutterBottom={true}>
          Ride Details
        </Typography>
        <Passengers classes={classes} onClick={this.openDialog} />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={classes.markerIcon}>
                <MapMarkerIcon />
              </InputAdornment>
            )
          }}
          label="Ride Origin"
          select={true}
          variant="outlined"
          fullWidth={true}
          value={0}
          margin="normal"
        >
          <MenuItem value={0}>University of Bahrain</MenuItem>
          <MenuItem value={1}>Arabian Gulf University</MenuItem>
        </TextField>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={classes.markerIcon}>
                <MapMarkerIcon />
              </InputAdornment>
            )
          }}
          label="Ride Destination"
          select={true}
          variant="outlined"
          fullWidth={true}
          value={1}
          margin="normal"
        >
          <MenuItem value={0}>Al Kindi Specialized Hospital</MenuItem>
          <MenuItem value={1}>Al Abraaj</MenuItem>
        </TextField>
        <Button
          fullWidth={true}
          variant="contained"
          className={classes.button}
          color="primary"
        >
          Split the Fare
        </Button>
        <ChooseLocationDialog open={dialogOpen} onClose={this.closeDialog} />
      </>
    );
  }
}

export default withStyles(styles)(Main);
