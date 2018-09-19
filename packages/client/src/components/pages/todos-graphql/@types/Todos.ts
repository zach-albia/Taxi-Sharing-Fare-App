/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Todos
// ====================================================

export interface Todos_todos {
  id: string;
  title: string;
  completed: boolean | null;
}

export interface Todos {
  todos: Todos_todos[];
}

export interface TodosVariables {
  page?: number | null;
  length?: number | null;
}
