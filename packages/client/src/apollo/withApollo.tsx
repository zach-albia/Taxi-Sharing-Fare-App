import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import Head from "next/head";
import { PageContext } from "pangwarta-shared/@types/pageContext";
import { ComponentWithInitialProps } from "pangwarta-shared/@types/types";
import React from "react";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import initApollo from "./initApollo";

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component: React.ComponentType<any>) {
  return Component.displayName || Component.name || "Unknown";
}

interface ServerState {
  apollo: { data: NormalizedCacheObject };
}

export interface InitialProps {
  serverState: ServerState;
}

interface WithApolloProps extends PageContext {
  initialProps: InitialProps;
}

export default (
  ComposedComponent: ComponentWithInitialProps<PageContext, any>
) => {
  // noinspection UnnecessaryLocalVariableJS
  const WithApollo: ComponentWithInitialProps<
    WithApolloProps,
    any
  > = class extends React.Component<WithApolloProps> {
    public static displayName = `WithApollo(${getComponentDisplayName(
      ComposedComponent
    )})`;

    public static async getInitialProps(ctx: PageContext) {
      // Initial serverState with apollo (empty)
      let serverState: ServerState = {
        apollo: {
          data: {}
        }
      };

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps: any = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const apollo: ApolloClient<NormalizedCacheObject> = initApollo();

        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponent {...composedInitialProps} />
            </ApolloProvider>,
            {
              router: {
                asPath: ctx.asPath,
                pathname: ctx.pathname,
                query: ctx.query
              }
            }
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();

        // Extract query data from the redux
        const state = {};

        // Extract query data from the Apollo redux
        serverState = {
          ...state,
          apollo: { data: apollo.cache.extract() }
        };
      }

      return {
        serverState,
        ...composedInitialProps
      };
    }

    private readonly apollo: ApolloClient<NormalizedCacheObject>;

    constructor(props) {
      super(props);
      this.apollo = initApollo(props.initialProps.serverState.apollo.data);
    }

    public render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };

  return WithApollo;
};
