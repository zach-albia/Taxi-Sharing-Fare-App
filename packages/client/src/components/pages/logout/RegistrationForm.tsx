import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import * as React from "react";
import { FormProps } from "../../../@types/common";

export function RegistrationForm(props: FormProps) {
  return (
    <form className={props.classes.form}>
      <FormControl margin="normal" required={true} fullWidth={true}>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input id="email" name="email" autoComplete="email" autoFocus={true} />
      </FormControl>
      <FormControl margin="normal" required={true} fullWidth={true}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input name="password" type="password" id="password" />
      </FormControl>
      <FormControl margin="normal" required={true} fullWidth={true}>
        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
        <Input name="confirmPassword" type="password" id="confirmPassword" />
      </FormControl>
      <Button
        type="submit"
        fullWidth={true}
        variant="contained"
        color="primary"
        className={props.classes.submit}
      >
        Sign in
      </Button>
    </form>
  );
}
