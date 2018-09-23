import { CorsOptions } from "cors";
const cors = require("cors");
import { GraphQLServer } from "graphql-yoga";
import { IResolverObject, IResolvers } from "graphql-yoga/dist/types";
import { Prisma, prisma, TodoNode, TodoWhereInput } from "./prisma-client";

interface Context {
  prisma: Prisma;
}

const Mutation: IResolverObject = {
  saveTodo(
    root,
    args: { id?: string; title: string; completed?: boolean },
    context: Context
  ) {
    const completed = args.completed || false;
    return args.id
      ? context.prisma.updateTodo({
          data: { completed, title: args.title },
          where: { id: args.id }
        })
      : context.prisma.createTodo({
          completed,
          title: args.title
        });
  },
  async toggleTodoCompleted(root, args: { todoID: string }, context: Context) {
    const completed = await context.prisma
      .todo({ id: args.todoID })
      .completed();
    return context.prisma.updateTodo({
      data: {
        completed: !completed
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
      index: page,
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

const corsOptions: CorsOptions = {
  credentials: true,
  origin: "*"
};

// tslint:disable:no-console
server
  .use(cors(corsOptions))
  .start(() => console.log("Server is running on http://localhost:4000"))
  .catch(console.error);
