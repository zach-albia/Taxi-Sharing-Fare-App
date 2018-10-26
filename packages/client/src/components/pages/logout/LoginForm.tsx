import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FinalTextField } from "pangwarta-shared/dist/lib";
import { sleep } from "pangwarta-shared/dist/lib/utils/helpers";
import * as React from "react";
import { Field, Form, FormRenderProps } from "react-final-form";
import { FormProps } from "../../../@types/common";

const onSubmit = async values => {
  await sleep(0);
  window.alert(JSON.stringify(values));
};

export class LoginForm extends React.Component<FormProps> {
  render() {
    return (
      <Form
        onSubmit={onSubmit}
        subscription={{
          submitting: true,
          values: true
        }}
      >
        {({ handleSubmit, submitting, values }: FormRenderProps) => (
          <form className={this.props.classes.form} onSubmit={handleSubmit}>
            <FormControl margin="normal" required={true} fullWidth={true}>
              <Field
                component={FinalTextField}
                id="email"
                name="email"
                autoComplete="email"
                autoFocus={true}
                label="Email"
                required={true}
                type="text"
              />
            </FormControl>
            <FormControl margin="normal" required={true} fullWidth={true}>
              <Field
                component={FinalTextField}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                label="Password"
                required={true}
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
              disabled={submitting}
            >
              Sign in
            </Button>
            <pre>{JSON.stringify(values)}</pre>
          </form>
        )}
      </Form>
    );
  }
}
