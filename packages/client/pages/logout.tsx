import { Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import { StyleRules } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { PageContext } from "pangwarta-shared/@types/pageContext";
import withMUI from "pangwarta-shared/dist/lib/layout/withMUI";
import * as React from "react";
import { LoginForm } from "../src/components/pages/logout/LoginForm";
import { RegistrationForm } from "../src/components/pages/logout/RegistrationForm";

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

export interface LogoutState {
  value: number;
}

class Logout extends React.Component<LogoutProps> {
  public state: LogoutState = {
    value: 0
  };

  private handleChange = (_, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <AppBar position="relative" elevation={1}>
            <Tabs fullWidth={true} value={value} onChange={this.handleChange}>
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          <div className={classes.tabContent}>
            {value === 0 && <LoginForm classes={classes} />}
            {value === 1 && <RegistrationForm classes={classes} />}
          </div>
        </Paper>
      </main>
    );
  }
}

export default withMUI()(withStyles(styles)(Logout));
