import { createMuiTheme } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import common from "@material-ui/core/colors/common";

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: common.white,
      dark: blue[600],
      light: blue[100],
      main: "#6699FF"
    },
    secondary: {
      main: "#FF3366"
    }
  }
});

export default theme;
