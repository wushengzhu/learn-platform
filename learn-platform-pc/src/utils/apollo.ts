import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  // uri: `http://${window.location.hostname}:3000/graphql`,
  uri: 'http://localhost:3002/graphql',
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
