import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingLeft: 20,
    backgroundColor: theme.colors.appBar,
  },
  text:{
    paddingRight: 20,
    color: theme.colors.white
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <Text style={styles.text} text="Repositories" fontSize={"subheading"} fontWeight={"bold"} color={"textSecondary"}>{"Repositories"}</Text>
        <Text style={styles.text} text="SignIn" fontSize={"subheading"} fontWeight={"bold"} color={"textSecondary"}>{"Sign in"}</Text>
      </ScrollView>
    </View>);
};

export default AppBar;