/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchTodo
// ====================================================

export interface SearchTodo_searchTodo_pageInfo {
  hasNextPage: boolean;
  index: number;
  maxLength: number;
  pageCount: number;
  totalCount: number;
}

export interface SearchTodo_searchTodo_nodes {
  id: string;
  title: string;
  completed: boolean | null;
}

export interface SearchTodo_searchTodo {
  pageInfo: SearchTodo_searchTodo_pageInfo;
  nodes: SearchTodo_searchTodo_nodes[];
}

export interface SearchTodo {
  searchTodo: SearchTodo_searchTodo | null;
}

export interface SearchTodoVariables {
  needle: string;
  page?: number | null;
  length?: number | null;
}
