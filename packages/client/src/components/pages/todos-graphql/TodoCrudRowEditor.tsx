import { ApolloCrudRowEditor } from "pangwarta-shared/dist/lib";
import { SaveTodo, SaveTodoVariables } from "./@types/SaveTodo";
import { Todos_todos_nodes, TodosVariables } from "./@types/Todos";

export class TodoCrudRowEditor extends ApolloCrudRowEditor<
  Todos_todos_nodes,
  SaveTodo,
  SaveTodoVariables,
  TodosVariables
> {}
