/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SaveTodo
// ====================================================

export interface SaveTodo_saveTodo {
  id: string;
  title: string;
  completed: boolean | null;
}

export interface SaveTodo {
  saveTodo: SaveTodo_saveTodo | null;
}

export interface SaveTodoVariables {
  id?: string | null;
  title: string;
  completed?: boolean | null;
}
