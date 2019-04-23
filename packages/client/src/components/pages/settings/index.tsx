import { Theme, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import localStorageKeys from "../../../localStorageKeys";
import { FareMatrix } from "../../../types";

type SettingsPageClassKey = "paper" | "sectionStart" | "setting";

function styles(theme: Theme): StyleRules<SettingsPageClassKey> {
  return {
    paper: {
      marginBottom: theme.spacing.unit * 2
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

const drillDown = (obj: object, keys: string[], newValue: number) => {
  if (keys.length > 1) {
    drillDown(obj[keys[0]], keys.slice(1), newValue);
  } else if (keys.length === 1) {
    obj[keys[0]] = newValue;
  }
};

const changeSetting = (...keys: string[]) => (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const fareMatrix = JSON.parse(
    localStorage.getItem(localStorageKeys.fareMatrix)
  ) as FareMatrix;
  drillDown(fareMatrix, keys, event.target.valueAsNumber);
  localStorage.setItem(localStorageKeys.fareMatrix, JSON.stringify(fareMatrix));
};

function SettingsPage({ classes }: Props) {
  const fareMatrix = JSON.parse(
    localStorage.getItem(localStorageKeys.fareMatrix)
  ) as FareMatrix;
  return (
    <div className={classes.paper}>
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
          onChange={changeSetting("day", "booked", "starting")}
        />
        <TextField
          className={classes.setting}
          label="First Excess"
          type="number"
          InputProps={{ endAdornment: "Fils" }}
          defaultValue={fareMatrix.day.booked.firstExcess}
          onChange={changeSetting("day", "booked", "firstExcess")}
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
          onChange={changeSetting("day", "booked", "rate", "fils")}
        />
        <TextField
          className={classes.setting}
          label="Distance"
          type="number"
          InputProps={{ endAdornment: "m" }}
          defaultValue={fareMatrix.day.booked.rate.meters}
          onChange={changeSetting("day", "booked", "rate", "meters")}
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
          onChange={changeSetting("day", "hailed", "starting")}
        />
        <TextField
          className={classes.setting}
          label="First Excess"
          type="number"
          InputProps={{ endAdornment: "Fils" }}
          defaultValue={fareMatrix.day.hailed.firstExcess}
          onChange={changeSetting("day", "hailed", "firstExcess")}
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
          onChange={changeSetting("day", "hailed", "rate", "fils")}
        />
        <TextField
          className={classes.setting}
          label="Distance"
          type="number"
          InputProps={{ endAdornment: "m" }}
          defaultValue={fareMatrix.day.hailed.rate.meters}
          onChange={changeSetting("day", "hailed", "rate", "meters")}
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
        onChange={changeSetting("excess25km")}
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
          onChange={changeSetting("night", "starting")}
        />
        <TextField
          className={classes.setting}
          label="First Excess"
          type="number"
          InputProps={{ endAdornment: "Fils" }}
          defaultValue={fareMatrix.night.firstExcess}
          onChange={changeSetting("night", "firstExcess")}
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
          onChange={changeSetting("night", "rate", "fils")}
        />
        <TextField
          className={classes.setting}
          label="Distance"
          type="number"
          InputProps={{ endAdornment: "m" }}
          defaultValue={fareMatrix.night.rate.meters}
          onChange={changeSetting("night", "rate", "meters")}
        />
      </>
    </div>
  );
}

export default withStyles(styles)(SettingsPage);
