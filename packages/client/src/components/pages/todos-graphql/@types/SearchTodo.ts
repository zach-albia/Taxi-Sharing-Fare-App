/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchTodo
// ====================================================

export interface SearchTodo_searchTodo {
  id: string;
  title: string;
  completed: boolean | null;
}

export interface SearchTodo {
  searchTodo: SearchTodo_searchTodo[];
}

export interface SearchTodoVariables {
  needle: string;
  page?: number | null;
  length?: number | null;
}
