import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "https://massive-tiger-71.hasura.app/v1/graphql",
  headers: {
    "x-hasura-access-key":
      "n8fjCy12rhEytNiRkvYSx0CtUdpnXZxDYXYhViA2Wyh3r13samTZY8mMyGhYEHUv",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://massive-tiger-71.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-access-key":
          "n8fjCy12rhEytNiRkvYSx0CtUdpnXZxDYXYhViA2Wyh3r13samTZY8mMyGhYEHUv",
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
