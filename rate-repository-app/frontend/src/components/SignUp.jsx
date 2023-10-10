import React from 'react';
import SignUpContainer from './SignUpContainer';
import useSignInUp from '../hooks/useSignInUp';

const SignUp = ({navigation}) => {
  const {signUp} = useSignInUp();

  const onSubmit = async ({username, password}) => {
    try {
      await signUp(username, password);
      navigation.navigate('Repositories');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit}/>
  );
};

export default SignUp;