import gql from "graphql-tag";

const Todo = gql`
  query Todo($id: ID!) {
    todo(todoID: $id) {
      id
      title
      completed
    }
  }
`;

const Todos = gql`
  query Todos($page: Int, $length: Int) {
    todos(page: $page, length: $length) {
      pageInfo {
        hasNextPage
        index
        maxLength
        pageCount
        totalCount
      }
      nodes {
        id
        title
        completed
      }
    }
  }
`;

const SearchTodo = gql`
  query SearchTodo($needle: String!, $page: Int, $length: Int) {
    searchTodo(needle: $needle, page: $page, length: $length) {
      pageInfo {
        hasNextPage
        index
        maxLength
        pageCount
        totalCount
      }
      nodes {
        id
        title
        completed
      }
    }
  }
`;

const CompletedTodos = gql`
  query CompletedTodos($page: Int, $length: Int) {
    completedTodos(page: $page, length: $length) {
      pageInfo {
        hasNextPage
        index
        maxLength
        pageCount
        totalCount
      }
      nodes {
        id
        title
        completed
      }
    }
  }
`;

const SaveTodo = gql`
  mutation SaveTodo($id: ID, $title: String!, $completed: Boolean) {
    saveTodo(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

const ToggleTodoCompleted = gql`
  mutation ToggleTodoCompleted($id: ID!) {
    toggleTodoCompleted(todoID: $id) {
      id
      title
      completed
    }
  }
`;

const DeleteTodo = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(todoID: $id) {
      id
    }
  }
`;

const ClearTodos = gql`
  mutation ClearTodos {
    clearTodos
  }
`;

export default {
  ClearTodos,
  CompletedTodos,
  DeleteTodo,
  SaveTodo,
  SearchTodo,
  Todo,
  Todos,
  ToggleTodoCompleted
};
