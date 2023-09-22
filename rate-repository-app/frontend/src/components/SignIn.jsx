import React from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import useSignIn from '../hooks/useSignIn';
import SignInForm from './SignInForm';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = object().shape({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
});

const SignIn = ({navigation}) => {
  const [signIn] = useSignIn();

  const onSubmit = async ({username, password}) => {
    try {
      await signIn({ username, password });
      navigation.navigate('Repositories');
    } catch (e) {
      console.log(e);
    }

  };

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};


export default SignIn;