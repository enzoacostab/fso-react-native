import React, { useContext } from 'react';
import Text from './Text';
import { useApolloClient } from '@apollo/client';
import { Pressable, Alert } from 'react-native';
import { context } from '../context/Context';
import { useNavigation } from '@react-navigation/native';

const SignOut = ({styles}) => {
  const { authStorage } = useContext(context);
  const client = useApolloClient();
  const navigation = useNavigation();

  const signOut = async() => {
    Alert.alert('Signing Out', 'Are you sure you want to sign out?',
    [{
      text: 'Cancel',
    },
    {
      text: 'Yes',
      onPress: async() => {
        await authStorage.removeAccessToken();
        client.resetStore();
        navigation.navigate('Repositories');
      }
    }]);
  };

  return(
    <Pressable onPress={async() => await signOut()}>
      <Text style={styles.text} fontSize={"subheading"} fontWeight={"bold"} color={"textSecondary"}>{"Sign out"}</Text>
    </Pressable>
  );
};

export default SignOut;