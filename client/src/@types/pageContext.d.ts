import { Theme } from "@material-ui/core/styles";
import { GenerateClassName, SheetsRegistry } from "jss";
import { NextContext } from "next";

export interface StylesContext {
  jss?: any;
  theme: Theme;
  sheetsManager: Map<any, any>;
  sheetsRegistry: SheetsRegistry;
  generateClassName: GenerateClassName;
}

export type PageContext = NextContext & StylesContext;
