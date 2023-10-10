import React from 'react';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignIn';
import theme from '../theme';
import Repository from './Repository';
import CreateReview from './CreateReview.jsx';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

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
      <Stack.Navigator screenOptions={{header: () => <AppBar/>}}>
        <Stack.Screen name='Repositories' component={RepositoryList}></Stack.Screen>
        <Stack.Screen name='SignIn' component={SignIn}></Stack.Screen>
        <Stack.Screen name='SignUp' component={SignUp}></Stack.Screen>
        <Stack.Screen name='MyReviews' component={MyReviews}></Stack.Screen>
        <Stack.Screen name='Repository' component={Repository}></Stack.Screen>
        <Stack.Screen name='CreateReview' component={CreateReview}></Stack.Screen>
      </Stack.Navigator>
    </View>
  );
};

export default Main;