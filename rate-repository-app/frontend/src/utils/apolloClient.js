import { ApolloClient, InMemoryCache, concat, HttpLink, ApolloLink } from '@apollo/client';
import {BASE_URL} from '@env';

export const createApolloClient = (authStorage) => {
  const httpLink = new HttpLink({ uri: `${BASE_URL}` });

  const authMiddleware = new ApolloLink(async (operation, forward) => {
    const accessToken = await authStorage.getAccessToken();
    operation.setContext(({ headers = {} }) => ({
      headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ''
      }
    }));

    return forward(operation);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });
};
