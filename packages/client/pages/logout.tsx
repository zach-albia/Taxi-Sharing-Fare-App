import { Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Input from "@material-ui/core/Input/Input";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Paper from "@material-ui/core/Paper/Paper";
import { StyleRules } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { PageContext } from "pangwarta-shared/@types/pageContext";
import withMUI from "pangwarta-shared/dist/lib/layout/withMUI";
import * as React from "react";

export type LogoutClassKey =
  | "avatar"
  | "form"
  | "layout"
  | "paper"
  | "tabContent"
  | "submit";

function styles(theme: Theme): StyleRules<LogoutClassKey> {
  return {
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing.unit
    },
    form: {
      marginTop: theme.spacing.unit,
      width: "100%" // Fix IE11 issue.LProps
    },
    layout: {
      display: "block", // Fix IE11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      width: "auto",
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        marginLeft: "auto",
        marginRight: "auto",
        width: 400
      }
    },
    paper: {
      marginTop: theme.spacing.unit * 8
    },
    submit: {
      marginTop: theme.spacing.unit * 3
    },
    tabContent: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`,
      paddingTop: 0
    }
  };
}

export interface LogoutProps {
  classes: Record<LogoutClassKey, string>;
  pageContext: PageContext;
}

const Logout: React.SFC<LogoutProps> = props => {
  const { classes } = props;
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Tabs fullWidth={true} value={0}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <div className={classes.tabContent}>
          <form className={classes.form}>
            <FormControl margin="normal" required={true} fullWidth={true}>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus={true}
              />
            </FormControl>
            <FormControl margin="normal" required={true} fullWidth={true}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth={true}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </div>
      </Paper>
    </main>
  );
};

export default withMUI()(withStyles(styles)(Logout));
