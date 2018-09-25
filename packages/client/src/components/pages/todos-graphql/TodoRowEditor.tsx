import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import ApolloClient from "apollo-client/ApolloClient";
import { RowEditorProps } from "pangwarta-shared/dist/lib";
import FinalTextField from "pangwarta-shared/dist/lib/final-form/FinalTextField";
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
    completed: this.props.elem ? this.props.elem.completed : false
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
            canSubmit,
            formRenderProps: { submitting, validating },
            onCancelClick,
            onSaveClick
          } = renderProps;
          return (
            <ApolloConsumer>
              {client => (
                <>
                  <TableCell className={classes.firstColumn}>
                    <Field
                      allowNull={false}
                      component={FinalCheckbox}
                      disabled={submitting || validating}
                      name="completed"
                      onClick={this.toggleCompleted(client)}
                      required={true}
                    />
                  </TableCell>
                  <TableCell className={classes.secondColumn}>
                    <Field
                      allowNull={false}
                      component={FinalTextField}
                      debounce={0}
                      disabled={submitting}
                      initialValue={todo ? todo.title : undefined}
                      name="title"
                      required={true}
                      type="text"
                    />
                  </TableCell>
                  <TableCell className={classes.firstColumn}>
                    <div style={{ display: "inline-flex" }}>
                      <IconButton
                        disabled={!canSubmit}
                        onClick={onSaveClick}
                        type="submit"
                      >
                        {submitting ? (
                          <CircularProgress thickness={5} size={26} />
                        ) : (
                          <SaveIcon />
                        )}
                      </IconButton>
                      <IconButton disabled={submitting} onClick={onCancelClick}>
                        <CancelIcon />
                      </IconButton>
                    </div>
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
