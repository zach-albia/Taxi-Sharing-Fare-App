import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const { publicRuntimeConfig: config } = getConfig();

function create(initialState: NormalizedCacheObject) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const httpLink = new HttpLink({
    credentials: "same-origin", // Additional fetch() options like
    // `credentials` or `headers`,
    uri: config.graphql.endpoint // Server URL (must be absolute)
  });
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState),
    connectToDevTools: process.browser,
    defaultOptions: {
      query: {
        fetchPolicy: "network-only"
      }
    },
    link: httpLink,
    ssrMode: !process.browser // Disables forceFetch on the server (so queries are only run once)
  });
}

export default function initApollo(initialState: NormalizedCacheObject = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
