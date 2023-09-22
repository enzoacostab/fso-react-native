import React, { useContext } from 'react';
import Text from './Text';
import { Pressable, Alert } from 'react-native';
import AuthStorageContext from '../context/AuthStorageContext';
import { useApolloClient } from '@apollo/client';

const SignOut = ({styles}) => {
  const authStorage = useContext(AuthStorageContext);
  const client = useApolloClient();

  const signOut = async () => {
    Alert.alert('Signing Out', 'Are you sure you want to sign out?',
    [{
      text: 'Cancel',
      style: 'cancel'
    },
    {
      text: 'Yes',
      onPress: async() => {
        await authStorage.removeAccessToken();
        client.resetStore();
      }
    }], {cancelable: true});
  };

  return(
    <Pressable onPress={signOut}>
      <Text style={styles.text} fontSize={"subheading"} fontWeight={"bold"} color={"textSecondary"}>{"Sign out"}</Text>
    </Pressable>
  );
};

export default SignOut;