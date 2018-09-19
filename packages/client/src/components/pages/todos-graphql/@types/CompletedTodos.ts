/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompletedTodos
// ====================================================

export interface CompletedTodos_completedTodos {
  id: string;
  title: string;
  completed: boolean | null;
}

export interface CompletedTodos {
  completedTodos: CompletedTodos_completedTodos[];
}

export interface CompletedTodosVariables {
  page?: number | null;
  length?: number | null;
}
