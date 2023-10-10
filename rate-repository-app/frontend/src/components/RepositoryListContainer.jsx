import { FlatList, View, StyleSheet } from "react-native";
import RepositoryListItem from "./RepositoryListItem";
import { Picker } from "@react-native-picker/picker";
import React, { useContext } from "react";
import { context } from "../context/Context";
import { Searchbar } from "react-native-paper";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {setRepsListOrderBy} = useContext(context);
    const {pickerSelectedValue, setPickerSelectedValue} = useContext(context);
    const {searchbarValue, setSearchbarValue} = useContext(context);
    
    const onChangeSearch = query => setSearchbarValue(query);

    return (
      <>
        <Searchbar value={searchbarValue} onChangeText={onChangeSearch} style={{backgroundColor:'white', marginHorizontal: 10, marginTop: 10}}/>
        <Picker
          selectedValue={pickerSelectedValue}
          onValueChange={(itemValue) => { 
              if(itemValue==='latest') setRepsListOrderBy({orderBy: 'createdAt', orderDirection: 'desc'});
              if(itemValue==='highestRated') setRepsListOrderBy({orderBy: 'ratingAverage', orderDirection: 'desc'});
              if(itemValue==='lowestRated') setRepsListOrderBy({orderBy: 'ratingAverage', orderDirection: 'asc'});
              setPickerSelectedValue(itemValue);
            }
          }>
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highestRated" />
          <Picker.Item label="Lowest rated repositories" value="lowestRated" />
        </Picker>
      </>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.repositories.edges}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <RepositoryListItem item={item.node}/>}
        keyExtractor={(item, i) => item.node.id+i}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

export default RepositoryListContainer;
