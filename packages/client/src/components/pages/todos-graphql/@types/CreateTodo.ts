/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTodo
// ====================================================

export interface CreateTodo_createTodo {
  id: string;
  title: string;
  completed: boolean | null;
}

export interface CreateTodo {
  createTodo: CreateTodo_createTodo | null;
}

export interface CreateTodoVariables {
  title: string;
}
