/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Todo
// ====================================================

export interface Todo_todo {
  id: string;
  title: string;
  completed: boolean | null;
}

export interface Todo {
  todo: Todo_todo | null;
}

export interface TodoVariables {
  id: string;
}
