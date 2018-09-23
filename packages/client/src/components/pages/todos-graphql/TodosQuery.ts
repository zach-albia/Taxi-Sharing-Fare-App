import { Query } from "react-apollo";
import { Todos, TodosVariables } from "./@types/Todos";

export default class TodosQuery extends Query<Todos, TodosVariables> {}
