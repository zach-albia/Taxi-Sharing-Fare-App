import Head from "next/head";
import AppContent from "pangwarta-shared/dist/lib/layout/AppContent";
import * as React from "react";
import TodoPage from "../src/components/pages/todos-graphql/TodoPage";
import withPages from "../src/withPages";

const Index = () => (
  <>
    <Head>
      <title>Todos (GraphQL) - RAD Template</title>
      <meta name="description" content="Todos template" />
    </Head>
    <AppContent>
      <TodoPage />
    </AppContent>
  </>
);

export default withPages(Index);
