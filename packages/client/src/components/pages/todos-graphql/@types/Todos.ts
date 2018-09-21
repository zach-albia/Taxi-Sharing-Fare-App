/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Todos
// ====================================================

export interface Todos_todos_pageInfo {
  hasNextPage: boolean;
  index: number;
  maxLength: number;
  pageCount: number;
  totalCount: number;
}

export interface Todos_todos_nodes {
  id: string;
  title: string;
  completed: boolean | null;
}

export interface Todos_todos {
  pageInfo: Todos_todos_pageInfo;
  nodes: Todos_todos_nodes[];
}

export interface Todos {
  todos: Todos_todos | null;
}

export interface TodosVariables {
  page?: number | null;
  length?: number | null;
}
