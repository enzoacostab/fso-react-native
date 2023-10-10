import React from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import SignInForm from './SignInForm';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = object().shape({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
});

const SignInContainer = ({onSubmit}) => {
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};


export default SignInContainer;