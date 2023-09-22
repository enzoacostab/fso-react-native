import React from 'react';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignIn';
import theme from '../theme';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
    fontFamily: theme.fonts.main
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{header: ()=><AppBar/>}} initialRouteName='Home'>
        <Stack.Screen name='Repositories' component={RepositoryList}></Stack.Screen>
        <Stack.Screen name='SignIn' component={SignIn}></Stack.Screen>
      </Stack.Navigator>
    </View>
  );
};

export default Main;