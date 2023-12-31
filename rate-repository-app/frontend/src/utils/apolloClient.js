import { ApolloClient, InMemoryCache, concat, HttpLink, ApolloLink } from '@apollo/client';
import Constants from 'expo-constants';

export const createApolloClient = (authStorage) => {
  const httpLink = new HttpLink({ uri: `http://${Constants.expoConfig.hostUri.slice(0,-5)}:5000` });

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
