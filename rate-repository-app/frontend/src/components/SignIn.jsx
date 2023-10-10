import React from 'react';
import useSignInUp from '../hooks/useSignInUp';
import SignInContainer from './SignInContainer';

const SignIn = ({navigation}) => {
  const {signIn} = useSignInUp();

  const onSubmit = async ({username, password}) => {
    try {
      await signIn(username, password);
      navigation.navigate('Repositories');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit}/>
  );
};

export default SignIn;