import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import * as React from "react";
import { Form } from "react-final-form";
import { FormProps } from "../../../@types/common";

export class LoginForm extends React.Component<FormProps> {
  render() {
    return (
      <Form onSubmit={undefined}>
        {() => (
          <form className={this.props.classes.form}>
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
              className={this.props.classes.submit}
            >
              Sign in
            </Button>
          </form>
        )}
      </Form>
    );
  }
}
