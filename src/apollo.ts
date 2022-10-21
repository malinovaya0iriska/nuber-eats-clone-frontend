import { ApolloClient, split, HttpLink, InMemoryCache, makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { WebSocketLink } from '@apollo/client/link/ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
// import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createClient } from 'graphql-ws';

import { LOCAL_STORAGE_TOKEN, TOKEN } from 'constants/index';

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
    connectionParams: {
      [TOKEN]: authTokenVar() || '',
    },
  }),
);

// const wsLink = new WebSocketLink(
//   new SubscriptionClient('ws://localhost:4000/graphql', {
//     reconnect: true,
//     connectionParams: {
//       [TOKEN]: authTokenVar() || '',
//     },
//   }),
// );

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  console.log(headers);

  return {
    headers: {
      ...headers,
      [TOKEN]: authTokenVar() || '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
