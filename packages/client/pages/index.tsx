import Head from "next/head";
import AppContent from "pangwarta-shared/dist/lib/layout/AppContent";
import * as React from "react";
import withApollo from "../src/apollo/withApollo";
import TodosPage from "../src/components/pages/todos-graphql/TodosPage";
import withPages from "../src/withPages";

const Index = () => (
  <>
    <Head>
      <title>Todos (GraphQL) - RAD Template</title>
      <meta name="description" content="Todos template" />
    </Head>
    <AppContent>
      <TodosPage />
    </AppContent>
  </>
);

export default withPages(withApollo(Index));
