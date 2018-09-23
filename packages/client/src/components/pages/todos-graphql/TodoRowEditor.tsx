import TableCell from "@material-ui/core/TableCell";
import ApolloClient from "apollo-client/ApolloClient";
import { RowEditorProps } from "pangwarta-shared/dist/lib";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { Field } from "react-final-form";
import FinalCheckbox from "../../final-form/FinalCheckbox";
import { SaveTodoMutation } from "./@types/SaveTodoMutation";
import { Todos_todos_nodes, TodosVariables } from "./@types/Todos";
import queries from "./queries";
import { TodoCrudRowEditor } from "./TodoCrudRowEditor";

export type TodoRowEditorProps = RowEditorProps<Todos_todos_nodes>;

interface TodoRowEditorState {
  completed: boolean;
}

export const allTodos: TodosVariables = { length: 999999, page: 0 };

export default class TodoRowEditor extends React.Component<
  TodoRowEditorProps,
  TodoRowEditorState
> {
  state: TodoRowEditorState = {
    completed: this.props.elem.completed
  };

  private toggleCompleted = async (client: ApolloClient<any>) => {
    await client.query({
      query: queries.ToggleTodoCompleted,
      variables: {
        id: this.props.elem.id
      }
    });
    this.setState({ completed: !this.props.elem.completed });
  };

  render() {
    const { classes, elem: todo, onCancel, onSubmit } = this.props;
    return (
      <TodoCrudRowEditor
        classes={classes}
        initialValues={todo}
        onCancel={onCancel}
        onSubmit={onSubmit}
        pageQuery={queries.Todos}
        pageVars={allTodos}
        saveMutation={queries.SaveTodo}
        SaveMutation={SaveTodoMutation as any}
      >
        {renderProps => {
          const {
            formRenderProps: { submitting, validating }
          } = renderProps;
          return (
            <ApolloConsumer>
              {client => (
                <>
                  <TableCell className={classes.secondColumn}>
                    <Field
                      allowNull={false}
                      component={FinalCheckbox}
                      disabled={submitting || validating}
                      name="completed"
                      onClick={this.toggleCompleted(client)}
                      required={true}
                    />
                  </TableCell>
                </>
              )}
            </ApolloConsumer>
          );
        }}
      </TodoCrudRowEditor>
    );
  }
}
