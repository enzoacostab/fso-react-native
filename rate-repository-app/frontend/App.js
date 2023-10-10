import React from 'react';
import Main from './src/components/Main';
import { NavigationContainer } from '@react-navigation/native';
import ContextProvider from './src/context/Context';

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Main/>
      </NavigationContainer>
    </ContextProvider>
  );
}