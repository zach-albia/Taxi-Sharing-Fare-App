import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { PageContext } from "pangwarta-shared/@types/pageContext";
import { ComponentWithInitialProps } from "pangwarta-shared/@types/types";
import PropTypes from "prop-types";
import * as React from "react";
import JssProvider from "react-jss/lib/JssProvider";

interface WithMUIProps {
  pageContext: PageContext;
}

export default function withMUI() {
  return (Component: ComponentWithInitialProps<any, any>) => {
    class WithMUI extends React.Component<WithMUIProps> {
      public static childContextTypes: React.ValidationMap<any> = {
        activePage: PropTypes.object,
        pages: PropTypes.array
      };

      public static async getInitialProps(ctx: PageContext) {
        let initialProps = {};

        if (Component.getInitialProps) {
          const componentInitialProps = await Component.getInitialProps({
            ...ctx
          });
          initialProps = {
            ...componentInitialProps,
            ...initialProps
          };
        }
        return initialProps;
      }

      public componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles && jssStyles.parentNode) {
          jssStyles.parentNode.removeChild(jssStyles);
        }
      }

      public render() {
        const { pageContext, ...other } = this.props;
        return (
          <JssProvider
            jss={pageContext.jss}
            registry={pageContext.sheetsRegistry}
            generateClassName={pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={pageContext.theme}
              sheetsManager={pageContext.sheetsManager}
            >
              <CssBaseline />
              <Component initialProps={other} />
            </MuiThemeProvider>
          </JssProvider>
        );
      }
    }

    return WithMUI;
  };
}
