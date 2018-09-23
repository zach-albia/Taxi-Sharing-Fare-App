import { RowViewProps } from "pangwarta-shared/dist/lib/crud/CrudRow";
import { EditableTableClassKey } from "pangwarta-shared/dist/lib/crud/CrudTableStyles";
import RowEditorProps from "pangwarta-shared/dist/lib/crud/RowEditorProps";
import React from "react";
import { Todos_todos_nodes } from "./@types/Todos";
import TodoCrudRow from "./TodoCrudRow";
import TodoRowEditor from "./TodoRowEditor";
import TodoRowView from "./TodoRowView";

export interface TodoRowProps<Elem> {
  classes: Record<EditableTableClassKey, string>;
  elem: Todos_todos_nodes;
  onDeleteClick: (elem: Elem) => React.ReactEventHandler;
  RowEditor: React.ComponentType<RowEditorProps<Elem>>;
  RowView: React.ComponentType<RowViewProps<Elem>>;
  showSnackbar: React.ReactEventHandler;
}

const TodoRow: React.SFC<TodoRowProps<Todos_todos_nodes>> = props => (
  <TodoCrudRow
    classes={props.classes}
    elem={props.elem}
    key={props.elem.id}
    onDeleteClick={props.onDeleteClick}
    RowEditor={TodoRowEditor}
    RowView={TodoRowView}
    showSnackbar={props.showSnackbar}
  />
);

export default TodoRow;
