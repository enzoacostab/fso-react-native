import React from 'react';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import theme from '../theme';
import {object, string } from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  text:{
      margin: 10,
      borderRadius: 5,
      textAlign: "center",
      padding: 15,
      borderColor: theme.colors.textSecondary
  }
});

const SignInForm = ({onSubmit}) => {
    return (
      <View>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" pass placeholder="Password" />
        <TouchableWithoutFeedback onPress={onSubmit}>
          <Text bg="primary" style={styles.text} fontWeight={"bold"} color="white">Sign in</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const validationSchema = object().shape({
    username: string().required("Username is required"),
    password: string().required("Password is required"),
  });

  const SignIn = () => {
    const onSubmit = values => {
      console.log({
        username: values.username, 
        password: values.password
      });
    };
  
    return (
      <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    );
  };


export default SignIn;