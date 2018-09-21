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

const CreateTodo = gql`
  mutation CreateTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

const MarkTodoCompleted = gql`
  mutation MarkTodoCompleted($id: ID!) {
    markTodoCompleted(todoID: $id) {
      id
      title
      completed
    }
  }
`;

const ChangeTodoTitle = gql`
  mutation ChangeTodoTitle($id: ID!, $title: String!) {
    changeTodoTitle(todoID: $id, title: $title) {
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
  ChangeTodoTitle,
  ClearTodos,
  CompletedTodos,
  CreateTodo,
  DeleteTodo,
  MarkTodoCompleted,
  SearchTodo,
  Todo,
  Todos
};
