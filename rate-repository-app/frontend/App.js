import React from 'react';
import Main from './src/components/Main';
import { NavigationContainer } from '@react-navigation/native';
import { createApolloClient } from './src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/context/AuthStorageContext';

const authStorage = new AuthStorage();
const client = createApolloClient(authStorage);

export default function App() {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main/>
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NavigationContainer>
  );
}