import { ApolloError } from "apollo-client";
import { EditableTableClassKey } from "pangwarta-shared/dist/lib";
import CrudTableBody from "pangwarta-shared/dist/lib/crud/CrudTableBody";
import * as React from "react";
import { Todos, Todos_todos_nodes } from "./@types/Todos";
import TodoRow from "./TodoRow";
import TodoRowEditor from "./TodoRowEditor";
import TodoRowView from "./TodoRowView";

interface TodosTableBodyProps {
  classes: Record<EditableTableClassKey, string>;
  data?: Todos;
  error?: ApolloError;
  newMode: boolean;
  onCancelClick: React.ReactEventHandler;
  onDeleteClick: (todo: Todos_todos_nodes) => React.ReactEventHandler;
  showSnackbar: React.ReactEventHandler;
}

class TodosCrudTableBody extends CrudTableBody<Todos, Todos_todos_nodes> {}

const TodoTableBody: React.SFC<TodosTableBodyProps> = props => {
  const {
    classes,
    data,
    newMode,
    onCancelClick,
    showSnackbar,
    ...rest
  } = props;
  return (
    <TodosCrudTableBody
      classes={classes}
      data={data}
      colSpan={3}
      elemsFromData={v => v.todos.nodes}
      newMode={newMode}
      onCancelClick={onCancelClick}
      Row={TodoRow}
      RowEditor={TodoRowEditor}
      RowView={TodoRowView}
      showSnackbar={showSnackbar}
      {...rest}
    />
  );
};

export default TodoTableBody;
