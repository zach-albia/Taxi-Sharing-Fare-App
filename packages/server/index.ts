const cors = require("cors");
import { GraphQLServer } from "graphql-yoga";
import { IResolverObject, IResolvers } from "graphql-yoga/dist/types";
import { Prisma, prisma } from "./prisma-client";

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

const Query: IResolverObject = {
  todo(root, args: { todoID: string }, context: Context) {
    return context.prisma.todo({
      id: args.todoID
    });
  },
  searchTodo(
    root,
    args: { needle: string; page?: number; length?: number },
    context: Context
  ) {
    return context.prisma.todoes({
      where: {
        title_contains: args.needle
      }
    });
  },
  completedTodos(
    root,
    args: { page?: number; length?: number },
    context: Context
  ) {
    const page = args.page || 0;
    const length = args.length || 20;
    return context.prisma.todoes({
      first: length,
      skip: page * length,
      where: {
        completed: true
      }
    });
  },
  todos(root, args: { page?: number; length?: number }, context: Context) {
    const page = args.page || 0;
    const length = args.length || 20;
    return context.prisma.todoes({
      first: length,
      skip: page * length
    });
  }
};

const resolvers: IResolvers = {
  Mutation,
  Query
};

const server = new GraphQLServer({
  context: {
    prisma
  },
  resolvers,
  typeDefs: "../../schema.graphql"
});

// tslint:disable:no-console
server
  .use(cors())
  .start(() => console.log("Server is running on http://localhost:4000"))
  .catch(console.error);
