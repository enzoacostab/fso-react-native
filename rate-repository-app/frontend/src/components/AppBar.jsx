import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import theme from '../theme';
import Text from './Text';
import SignOut from './SignOut';
import useUser from '../hooks/useUser';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: theme.colors.appBar,
  },
  text:{
    color: theme.colors.white
  },
  scrollView:{
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    width: '100%'
  }
});

const AppBar = () => {
  const {data} = useUser();

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <Text style={styles.text} text="Repositories" fontSize={"subheading"} fontWeight={"bold"} color={"textSecondary"}>{"Repositories"}</Text>
        {data && !data.me ? 
        <Text style={styles.text} text="SignIn" fontSize={"subheading"} fontWeight={"bold"} color={"textSecondary"}>{"Sign in"}</Text> 
        : 
        <SignOut styles={styles}/>}
      </ScrollView>
    </View>);
};

export default AppBar;