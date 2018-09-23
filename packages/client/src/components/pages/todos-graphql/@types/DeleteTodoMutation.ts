import { Mutation } from "react-apollo";
import { DeleteTodo, DeleteTodoVariables } from "./DeleteTodo";

export default class DeleteTodoMutation extends Mutation<
  DeleteTodo,
  DeleteTodoVariables
> {}
