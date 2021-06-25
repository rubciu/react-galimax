import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import Pages from './pages';

const cache = new InMemoryCache(
  {
    typePolicies: {
      Query: {
        fields: {
          product(_, { args, toReference }) {
            return toReference({
              __typename: 'Product',
              id: args?.id
            })
          },
          category(_, { args, toReference }) {
            return toReference({
              __typename: 'Category',
              id: args?.id
            })
          }          
        }
      }
    }
  }
);
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById('root'),
);
