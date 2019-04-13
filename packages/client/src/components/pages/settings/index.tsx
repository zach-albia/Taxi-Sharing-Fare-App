import { Theme, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { StyleRules } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { defaultFareMatrix } from "../../../defaults";
import localStorageKeys from "../../../localStorageKeys";
import { FareMatrix } from "../../../types";

type SettingsPageClassKey = "paper" | "sectionStart" | "setting";

function styles(theme: Theme): StyleRules<SettingsPageClassKey> {
  return {
    paper: {
      padding: theme.spacing.unit * 2
    },
    sectionStart: {
      marginTop: theme.spacing.unit * 2
    },
    setting: {
      display: "block"
    }
  };
}

interface Props {
  classes: Record<SettingsPageClassKey, string>;
}

function SettingsPage({ classes }: Props) {
  const fareMatrix = process.browser
    ? (JSON.parse(
        localStorage.getItem(localStorageKeys.fareMatrix)
      ) as FareMatrix)
    : defaultFareMatrix;
  return (
    <>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom={true}>
          Daytime Rates
        </Typography>
        <>
          <Typography variant="subtitle1">Booked</Typography>
          <TextField
            className={classes.setting}
            label="Starting Fare"
            type="number"
            InputProps={{ endAdornment: "Fils" }}
            defaultValue={fareMatrix.day.booked.starting}
          />
          <TextField
            className={classes.setting}
            label="First Excess"
            type="number"
            InputProps={{ endAdornment: "Fils" }}
            defaultValue={fareMatrix.day.booked.firstExcess}
          />
          <Typography variant="subtitle2" className={classes.sectionStart}>
            Rate (Fils per meters)
          </Typography>
          <TextField
            className={classes.setting}
            label="Amount"
            type="number"
            InputProps={{ endAdornment: "Fils" }}
            defaultValue={fareMatrix.day.booked.rate.fils}
          />
          <TextField
            className={classes.setting}
            label="Distance"
            type="number"
            InputProps={{ endAdornment: "m" }}
            defaultValue={fareMatrix.day.booked.rate.meters}
          />
        </>
        <>
          <Typography variant="subtitle1" className={classes.sectionStart}>
            Hailed
          </Typography>
          <TextField
            className={classes.setting}
            label="Starting Fare"
            type="number"
            InputProps={{ endAdornment: "Fils" }}
            defaultValue={fareMatrix.day.hailed.starting}
          />
          <TextField
            className={classes.setting}
            label="First Excess"
            type="number"
            InputProps={{ endAdornment: "Fils" }}
            defaultValue={fareMatrix.day.hailed.firstExcess}
          />
          <Typography variant="subtitle2" className={classes.sectionStart}>
            Rate (Fils per meters)
          </Typography>
          <TextField
            className={classes.setting}
            label="Amount"
            type="number"
            InputProps={{ endAdornment: "Fils" }}
            defaultValue={fareMatrix.day.hailed.rate.fils}
          />
          <TextField
            className={classes.setting}
            label="Distance"
            type="number"
            InputProps={{ endAdornment: "m" }}
            defaultValue={fareMatrix.day.hailed.rate.meters}
          />
        </>
        <Typography variant="h6" className={classes.sectionStart}>
          Additional Fare at 25km
        </Typography>
        <TextField
          className={classes.setting}
          label="Amount"
          type="number"
          InputProps={{ endAdornment: "Fils" }}
          defaultValue={fareMatrix.excess25km}
        />
        <>
          <Typography variant="h6" className={classes.sectionStart}>
            Night-time Rates
          </Typography>
          <TextField
            className={classes.setting}
            label="Starting Fare"
            type="number"
            InputProps={{ endAdornment: "Fils" }}
            defaultValue={fareMatrix.night.starting}
          />
          <TextField
            className={classes.setting}
            label="First Excess"
            type="number"
            InputProps={{ endAdornment: "Fils" }}
            defaultValue={fareMatrix.night.firstExcess}
          />
          <Typography variant="subtitle2" className={classes.sectionStart}>
            Rate (Fils per meters)
          </Typography>
          <TextField
            className={classes.setting}
            label="Amount"
            type="number"
            InputProps={{ endAdornment: "Fils" }}
            defaultValue={fareMatrix.night.rate.fils}
          />
          <TextField
            className={classes.setting}
            label="Distance"
            type="number"
            InputProps={{ endAdornment: "m" }}
            defaultValue={fareMatrix.night.rate.meters}
          />
        </>
      </Paper>
    </>
  );
}

export default withStyles(styles)(SettingsPage);
