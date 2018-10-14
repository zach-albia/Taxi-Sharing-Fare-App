import { Prisma, TodoNode, TodoWhereInput } from "../generated/prisma-client";
import { QueryResolvers } from "../generated/resolvers";
import { Context } from "./types/Context";
import { TypeMap } from "./types/TypeMap";

export interface PageInfo {
  hasNextPage: boolean;
  index: number;
  maxLength: number;
  pageCount: number;
  totalCount: number;
}

export interface WithPage<Node> {
  nodes: Node[];
  pageInfo: PageInfo;
}

export type Todos = WithPage<TodoNode>;

async function fetchTodos(
  client: Prisma,
  length?: number,
  page?: number,
  where?: TodoWhereInput
): Promise<Todos> {
  length = length || 20;
  page = page || 0;
  const args: { first: number; skip: number; where: TodoWhereInput } = {
    first: length,
    skip: page * length,
    where
  };
  const count = await client
    .todoesConnection({ where })
    .aggregate()
    .count();
  const hasNextPage = await client
    .todoesConnection(args)
    .pageInfo()
    .hasNextPage();
  const todoNodes = await client.todoes(args);
  const maxLength = length || 20;
  return {
    nodes: todoNodes,
    pageInfo: {
      hasNextPage,
      index: page,
      maxLength,
      pageCount: Math.ceil(count / maxLength),
      totalCount: count
    }
  };
}

export const Query: QueryResolvers.Type<TypeMap> = {
  todo(root, args, context: Context) {
    return context.db.todo({
      id: args.todoID
    });
  },
  async searchTodo(root, args, context: Context): Promise<Todos> {
    return fetchTodos(context.db, args.length, args.page, {
      title_contains: args.needle
    });
  },
  completedTodos(
    root,
    args: { page?: number; length?: number },
    context: Context
  ) {
    return fetchTodos(context.db, args.length, args.page, {
      completed: true
    });
  },
  todos(root, args: { page?: number; length?: number }, context: Context) {
    return fetchTodos(context.db, args.length, args.page);
  }
};
