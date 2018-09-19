/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeTodoTitle
// ====================================================

export interface ChangeTodoTitle_changeTodoTitle {
  id: string;
  title: string;
  completed: boolean | null;
}

export interface ChangeTodoTitle {
  changeTodoTitle: ChangeTodoTitle_changeTodoTitle | null;
}

export interface ChangeTodoTitleVariables {
  id: string;
  title: string;
}
