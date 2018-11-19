import common from "@material-ui/core/colors/common";
import deepOrange from "@material-ui/core/colors/deepOrange";
import grey from "@material-ui/core/colors/grey";
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
      main: grey[900]
    }
  }
});

export default theme;
