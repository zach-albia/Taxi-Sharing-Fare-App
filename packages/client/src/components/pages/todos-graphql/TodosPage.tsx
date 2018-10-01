import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import {
  ApolloCrudTable,
  EditableTableClassKey,
  styles
} from "pangwarta-shared/dist/lib";
import { ApolloCrudTableProps } from "pangwarta-shared/dist/lib/apollo/ApolloCrudTable";
import * as React from "react";
import { TodoNode } from "../../../../../server/prisma-client";
import { DeleteTodo, DeleteTodoVariables } from "./@types/DeleteTodo";
import DeleteTodoMutation from "./@types/DeleteTodoMutation";
import { Todos, Todos_todos_nodes, TodosVariables } from "./@types/Todos";
import queries from "./queries";
import { allTodos } from "./TodoRowEditor";
import TodosQuery from "./TodosQuery";
import TodosTableBody from "./TodosTableBody";

const TodosCrudTable: React.SFC<
  ApolloCrudTableProps<
    Todos,
    TodosVariables,
    DeleteTodo,
    DeleteTodoVariables,
    TodoNode
  >
> = props => ApolloCrudTable(props);

interface TodosPageProps {
  classes: Record<EditableTableClassKey, string>;
}

interface DeleteCaptionProps {
  elem: Todos_todos_nodes;
}

class TodoDeleteCaption extends React.Component<DeleteCaptionProps> {
  render() {
    return <Typography>{this.props.elem.title}</Typography>;
  }
}

const TodosPage: React.SFC<TodosPageProps> = ({ classes }) => (
  <TodosCrudTable
    CrudTableBody={TodosTableBody}
    DeleteCaption={TodoDeleteCaption}
    DeleteMutation={DeleteTodoMutation as any}
    PageQuery={TodosQuery as any}
    classes={classes}
    colSpan={3}
    dataToPageInfo={(data: Todos) => data.todos.pageInfo}
    deleteMessage="Todo deleted"
    deleteMutation={queries.DeleteTodo}
    elemToDeleteVars={elem => ({ variables: { id: elem.id } })}
    headers={["Title", "Actions"]}
    initialPageVars={allTodos}
    pageQuery={queries.Todos}
    saveMessage="Todo saved"
    ssr={true}
    title="Todos"
  />
);

export default withStyles(styles)(TodosPage);
