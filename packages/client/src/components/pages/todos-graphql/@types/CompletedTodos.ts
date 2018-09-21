/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompletedTodos
// ====================================================

export interface CompletedTodos_completedTodos_pageInfo {
  hasNextPage: boolean;
  index: number;
  maxLength: number;
  pageCount: number;
  totalCount: number;
}

export interface CompletedTodos_completedTodos_nodes {
  id: string;
  title: string;
  completed: boolean | null;
}

export interface CompletedTodos_completedTodos {
  pageInfo: CompletedTodos_completedTodos_pageInfo;
  nodes: CompletedTodos_completedTodos_nodes[];
}

export interface CompletedTodos {
  completedTodos: CompletedTodos_completedTodos | null;
}

export interface CompletedTodosVariables {
  page?: number | null;
  length?: number | null;
}
