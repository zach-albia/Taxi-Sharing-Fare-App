/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MarkTodoCompleted
// ====================================================

export interface MarkTodoCompleted_markTodoCompleted {
  id: string;
  title: string;
  completed: boolean | null;
}

export interface MarkTodoCompleted {
  markTodoCompleted: MarkTodoCompleted_markTodoCompleted | null;
}

export interface MarkTodoCompletedVariables {
  id: string;
}
