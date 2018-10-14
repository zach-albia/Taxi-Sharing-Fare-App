import { MutationResolvers } from "../generated/resolvers";
import { TypeMap } from "./types/TypeMap";

export const Mutation: MutationResolvers.Type<TypeMap> = {
  saveTodo(root, args, context) {
    const completed = args.completed || false;
    return args.id
      ? context.db.updateTodo({
          data: { completed, title: args.title },
          where: { id: args.id }
        })
      : context.db.createTodo({
          completed,
          title: args.title
        });
  },
  async toggleTodoCompleted(root, args, context) {
    const completed = await context.db.todo({ id: args.todoID }).completed();
    return context.db.updateTodo({
      data: {
        completed: !completed
      },
      where: {
        id: args.todoID
      }
    });
  },
  deleteTodo(root, args, context) {
    return context.db.deleteTodo({
      id: args.todoID
    });
  },
  async clearTodos(root, args, context) {
    const count = await context.db
      .deleteManyTodoes({
        completed: false
      })
      .count();
    return Number(count);
  }
};
