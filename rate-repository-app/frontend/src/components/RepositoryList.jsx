import React, {useEffect, useContext} from 'react';
import useRepositories from '../hooks/useRepository';
import RepositoryListContainer from './RepositoryListContainer';
import { context } from '../context/Context';

const RepositoryList = () => {
  const {repsListOrderBy, searchKeyword, repositories, setRepositories} = useContext(context);
  const { data, loading, fetchMore } = useRepositories(repsListOrderBy, searchKeyword, {first:4});

  useEffect(() => {
    if (data){
      setRepositories(data.repositories);
    }

  }, [data]);
  
  const onEndReach = () => {
    fetchMore();
  };

  return loading ? null : <RepositoryListContainer repositories={repositories} onEndReach={onEndReach} />;
};

export default RepositoryList;