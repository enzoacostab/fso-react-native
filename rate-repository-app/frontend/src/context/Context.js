import React, { createContext, useState } from 'react';
import { createApolloClient } from '../utils/apolloClient';
import { ApolloProvider } from '@apollo/client';
import AuthStorage from '../utils/authStorage';
import { useDebounce } from 'use-debounce';

const authStorage = new AuthStorage();
const client = createApolloClient(authStorage);

export const context = createContext();

const ContextProvider = ({children}) => {
  const [repsListOrderBy, setRepsListOrderBy] = useState({orderBy: 'createdAt', orderDirection: 'desc'});
  const [pickerSelectedValue, setPickerSelectedValue] = useState('latest');
  const [searchbarValue, setSearchbarValue] = useState('');
  const [searchKeyword] = useDebounce(searchbarValue, 1000);
  const [repositories, setRepositories] = useState({});


  return (
    <context.Provider value={{authStorage, 
      repsListOrderBy, setRepsListOrderBy, 
      pickerSelectedValue, setPickerSelectedValue, 
      repositories, setRepositories,
      searchbarValue, setSearchbarValue, searchKeyword}}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </context.Provider>

  );
};

export default ContextProvider;