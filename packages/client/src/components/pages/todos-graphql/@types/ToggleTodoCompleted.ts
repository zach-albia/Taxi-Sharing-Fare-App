/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleTodoCompleted
// ====================================================

export interface ToggleTodoCompleted_toggleTodoCompleted {
  id: string;
  title: string;
  completed: boolean | null;
}

export interface ToggleTodoCompleted {
  toggleTodoCompleted: ToggleTodoCompleted_toggleTodoCompleted | null;
}

export interface ToggleTodoCompletedVariables {
  id: string;
}
