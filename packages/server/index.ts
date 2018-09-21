const cors = require("cors");
import { GraphQLServer } from "graphql-yoga";
import { IResolverObject, IResolvers } from "graphql-yoga/dist/types";
import { Prisma, prisma, TodoNode, TodoWhereInput } from "./prisma-client";

interface Context {
  prisma: Prisma;
}

const Mutation: IResolverObject = {
  createTodo(root, args: { title: string }, context: Context) {
    return context.prisma.createTodo({
      completed: false,
      title: args.title
    });
  },
  markTodoCompleted(root, args: { todoID: string }, context: Context) {
    return context.prisma.updateTodo({
      data: {
        completed: true
      },
      where: {
        id: args.todoID
      }
    });
  },
  changeTodoTitle(
    root,
    args: { todoID: string; title: string },
    context: Context
  ) {
    return context.prisma.updateTodo({
      data: {
        title: args.title
      },
      where: {
        id: args.todoID
      }
    });
  },
  deleteTodo(root, args: { todoID: string }, context: Context) {
    return context.prisma.deleteTodo({
      id: args.todoID
    });
  },
  clearTodos(root, args, context: Context) {
    return context.prisma
      .deleteManyTodoes({
        completed: false
      })
      .count();
  }
};

interface PageInfo {
  hasNextPage: boolean;
  index: number;
  maxLength: number;
  pageCount: number;
  totalCount: number;
}

interface WithPage<Node> {
  nodes: Node[];
  pageInfo: PageInfo;
}

type Todos = WithPage<TodoNode>;

async function fetchTodos(
  client: Prisma,
  length: number,
  page: number,
  where?: TodoWhereInput
): Promise<Todos> {
  const args: { first: number; skip: number; where: TodoWhereInput } = {
    first: length,
    skip: page * length,
    where
  };
  const count = await client
    .todoesConnection(args)
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
      index: page || 0,
      maxLength,
      pageCount: Math.ceil(count / maxLength),
      totalCount: count
    }
  };
}

const Query: IResolverObject = {
  todo(root, args: { todoID: string }, context: Context) {
    return context.prisma.todo({
      id: args.todoID
    });
  },
  async searchTodo(
    root,
    args: { needle: string; page?: number; length?: number },
    context: Context
  ): Promise<Todos> {
    return fetchTodos(context.prisma, args.length, args.page, {
      title_contains: args.needle
    });
  },
  completedTodos(
    root,
    args: { page?: number; length?: number },
    context: Context
  ) {
    return fetchTodos(context.prisma, args.length, args.page, {
      completed: true
    });
  },
  todos(root, args: { page?: number; length?: number }, context: Context) {
    const page = args.page || 0;
    const length = args.length || 20;
    return fetchTodos(context.prisma, args.length, args.page);
  }
};

const resolvers: IResolvers = {
  Mutation,
  Query
};

const server = new GraphQLServer({
  context: { prisma },
  resolvers,
  typeDefs: "../../schema.graphql"
});

// tslint:disable:no-console
server
  .use(cors())
  .start(() => console.log("Server is running on http://localhost:4000"))
  .catch(console.error);
