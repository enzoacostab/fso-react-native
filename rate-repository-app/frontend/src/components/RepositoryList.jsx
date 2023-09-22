import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryListItem from './RepositoryListItem';
import useRepositories from '../hooks/useRepository';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data } = useRepositories();
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    if (data){
      setRepositories(data.repositories);
    }
  }, [data]);
  
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryListItem item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default RepositoryList;