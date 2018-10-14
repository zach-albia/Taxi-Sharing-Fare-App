import { GraphQLResolveInfo } from "graphql";
import { WithPage } from "../resolvers/Query";

export interface ITypeMap {
  Context: any;
  QueryParent: any;
  MutationParent: any;
  TodoParent: any;
}

export namespace QueryResolvers {
  export type TodoResolver<T extends ITypeMap> = (
    parent: T["QueryParent"],
    args: TodoArgs,
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => T["TodoParent"] | null | Promise<T["TodoParent"] | null>;

  export type TodosResolver<T extends ITypeMap> = (
    parent: T["QueryParent"],
    args: PageArgs,
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => Array<T["TodoParent"]> | Promise<Array<T["TodoParent"]>>;

  export type SearchTodo<T extends ITypeMap> = (
    parent: T["QueryParent"],
    args: SearchTodoArgs,
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => Array<T["TodoParent"]> | Promise<Array<T["TodoParent"]>>;

  export type CompletedTodos<T extends ITypeMap> = (
    parent: T["QueryParent"],
    args: PageArgs,
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => Array<T["TodoParent"]> | Promise<Array<T["TodoParent"]>>;

  export interface Type<T extends ITypeMap> {
    todo: (
      parent: T["QueryParent"],
      args: TodoArgs,
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => T["TodoParent"] | null | Promise<T["TodoParent"] | null>;
    todos: (
      parent: T["QueryParent"],
      args: PageArgs,
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => WithPage<T["TodoParent"]> | Promise<WithPage<T["TodoParent"]>>;
    searchTodo: (
      parent: T["QueryParent"],
      args: SearchTodoArgs,
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => WithPage<T["TodoParent"]> | Promise<WithPage<T["TodoParent"]>>;
    completedTodos: (
      parent: T["QueryParent"],
      args: PageArgs,
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => WithPage<T["TodoParent"]> | Promise<WithPage<T["TodoParent"]>>;
  }

  export interface TodoArgs {
    todoID: string;
  }

  export interface PageArgs {
    page?: number;
    length?: number;
  }

  export interface SearchTodoArgs extends PageArgs {
    needle: string;
  }
}

export namespace MutationResolvers {
  export type SaveTodoResolver<T extends ITypeMap> = (
    parent: T["MutationParent"],
    args: SaveTodoArgs,
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => T["TodoParent"] | Promise<T["TodoParent"]>;

  export interface SaveTodoArgs {
    id?: string;
    title: string;
    completed?: boolean;
  }

  export type ToggleTodoCompletedResolver<T extends ITypeMap> = (
    parent: T["MutationParent"],
    args: TodoIDArgs,
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => T["TodoParent"] | null | Promise<T["TodoParent"] | null>;

  export type DeleteTodoResolver<T extends ITypeMap> = (
    parent: T["MutationParent"],
    args: TodoIDArgs,
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => T["TodoParent"] | null | Promise<T["TodoParent"] | null>;

  export type ClearTodosResolver<T extends ITypeMap> = (
    parent: T["MutationParent"],
    args: {},
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => number | Promise<number>;

  export interface TodoIDArgs {
    todoID: string;
  }

  export interface Type<T extends ITypeMap> {
    saveTodo: (
      parent: T["MutationParent"],
      args: SaveTodoArgs,
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => T["TodoParent"] | Promise<T["TodoParent"]>;
    toggleTodoCompleted: (
      parent: T["MutationParent"],
      args: TodoIDArgs,
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => T["TodoParent"] | null | Promise<T["TodoParent"] | null>;
    deleteTodo: (
      parent: T["MutationParent"],
      args: TodoIDArgs,
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => T["TodoParent"] | null | Promise<T["TodoParent"] | null>;
    clearTodos: (
      parent: T["MutationParent"],
      args: {},
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => number | Promise<number>;
  }
}

export namespace TodoResolvers {
  export type IdResolver<T extends ITypeMap> = (
    parent: T["TodoParent"],
    args: {},
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type TitleResolver<T extends ITypeMap> = (
    parent: T["TodoParent"],
    args: {},
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type CompletedResolver<T extends ITypeMap> = (
    parent: T["TodoParent"],
    args: {},
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => boolean | null | Promise<boolean | null>;

  export interface Type<T extends ITypeMap> {
    id: (
      parent: T["TodoParent"],
      args: {},
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => string | Promise<string>;
    title: (
      parent: T["TodoParent"],
      args: {},
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => string | Promise<string>;
    completed: (
      parent: T["TodoParent"],
      args: {},
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => boolean | null | Promise<boolean | null>;
  }
}

export interface IResolvers<T extends ITypeMap> {
  Query: QueryResolvers.Type<T>;
  Mutation: MutationResolvers.Type<T>;
  Todo: TodoResolvers.Type<T>;
}
