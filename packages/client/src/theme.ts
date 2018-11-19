import common from "@material-ui/core/colors/common";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: common.white,
      dark: deepOrange[900],
      light: deepOrange[100],
      main: deepOrange[600]
    },
    secondary: {
      main: common.black
    }
  }
});

export default theme;
