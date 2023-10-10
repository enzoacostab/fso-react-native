import React from 'react';
import { Formik } from 'formik';
import { object, string, ref } from 'yup';
import SignUpForm from './SignUpForm';

const initialValues = {
  username: '',
  password: '',
  confPass: ''
};

const validationSchema = object().shape({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
  confPass: string().oneOf([ref('password'), null],"Passwords don't match")
  .required('Password confirm is required')
});

const SignUpContainer = ({onSubmit}) => {
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};


export default SignUpContainer;