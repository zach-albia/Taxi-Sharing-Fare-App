module.exports = {
  typeDefs: /* GraphQL */ `
    type AggregateTodo {
      count: Int!
    }

    type BatchPayload {
      count: Long!
    }

    scalar Long

    type Mutation {
      createTodo(data: TodoCreateInput!): Todo!
      updateTodo(data: TodoUpdateInput!, where: TodoWhereUniqueInput!): Todo
      updateManyTodoes(
        data: TodoUpdateInput!
        where: TodoWhereInput
      ): BatchPayload!
      upsertTodo(
        where: TodoWhereUniqueInput!
        create: TodoCreateInput!
        update: TodoUpdateInput!
      ): Todo!
      deleteTodo(where: TodoWhereUniqueInput!): Todo
      deleteManyTodoes(where: TodoWhereInput): BatchPayload!
    }

    enum MutationType {
      CREATED
      UPDATED
      DELETED
    }

    interface Node {
      id: ID!
    }

    type PageInfo {
      hasNextPage: Boolean!
      hasPreviousPage: Boolean!
      startCursor: String
      endCursor: String
    }

    type Query {
      todo(where: TodoWhereUniqueInput!): Todo
      todoes(
        where: TodoWhereInput
        orderBy: TodoOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [Todo]!
      todoesConnection(
        where: TodoWhereInput
        orderBy: TodoOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): TodoConnection!
      node(id: ID!): Node
    }

    type Subscription {
      todo(where: TodoSubscriptionWhereInput): TodoSubscriptionPayload
    }

    type Todo {
      id: ID!
      title: String!
      completed: Boolean
    }

    type TodoConnection {
      pageInfo: PageInfo!
      edges: [TodoEdge]!
      aggregate: AggregateTodo!
    }

    input TodoCreateInput {
      title: String!
      completed: Boolean
    }

    type TodoEdge {
      node: Todo!
      cursor: String!
    }

    enum TodoOrderByInput {
      id_ASC
      id_DESC
      title_ASC
      title_DESC
      completed_ASC
      completed_DESC
      createdAt_ASC
      createdAt_DESC
      updatedAt_ASC
      updatedAt_DESC
    }

    type TodoPreviousValues {
      id: ID!
      title: String!
      completed: Boolean
    }

    type TodoSubscriptionPayload {
      mutation: MutationType!
      node: Todo
      updatedFields: [String!]
      previousValues: TodoPreviousValues
    }

    input TodoSubscriptionWhereInput {
      mutation_in: [MutationType!]
      updatedFields_contains: String
      updatedFields_contains_every: [String!]
      updatedFields_contains_some: [String!]
      node: TodoWhereInput
      AND: [TodoSubscriptionWhereInput!]
      OR: [TodoSubscriptionWhereInput!]
      NOT: [TodoSubscriptionWhereInput!]
    }

    input TodoUpdateInput {
      title: String
      completed: Boolean
    }

    input TodoWhereInput {
      id: ID
      id_not: ID
      id_in: [ID!]
      id_not_in: [ID!]
      id_lt: ID
      id_lte: ID
      id_gt: ID
      id_gte: ID
      id_contains: ID
      id_not_contains: ID
      id_starts_with: ID
      id_not_starts_with: ID
      id_ends_with: ID
      id_not_ends_with: ID
      title: String
      title_not: String
      title_in: [String!]
      title_not_in: [String!]
      title_lt: String
      title_lte: String
      title_gt: String
      title_gte: String
      title_contains: String
      title_not_contains: String
      title_starts_with: String
      title_not_starts_with: String
      title_ends_with: String
      title_not_ends_with: String
      completed: Boolean
      completed_not: Boolean
      AND: [TodoWhereInput!]
      OR: [TodoWhereInput!]
      NOT: [TodoWhereInput!]
    }

    input TodoWhereUniqueInput {
      id: ID
    }
  `
};
