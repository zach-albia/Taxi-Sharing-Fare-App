import { createGenerateClassName } from "@material-ui/core/styles";
import { SheetsRegistry } from "jss";

import { StylesContext } from "../@types/pageContext";
import theme from "../theme";

function createPageContext(): StylesContext {
  return {
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    theme
  };
}

export default function getPageContext(): StylesContext {
  // Make sure to create a new context for every server-side request so data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
