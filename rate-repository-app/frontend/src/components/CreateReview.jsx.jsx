import React from 'react';
import { Formik } from 'formik';
import { object, string, number } from 'yup';
import useReview from '../hooks/useReview';
import CreateReviewForm from './CreateReviewForm';

const initialValues = {
  ownerName: '',
  name: '',
  rating: '',
  review: null
};

const validationSchema = object().shape({
  ownerName: string().required("Repository owner name is required"),
  name: string().required("Repository name is required"),
  rating: number().required("Rating is required").typeError('Rating must be a number').min(0).max(100),
});

const CreateReview = ({navigation}) => {
  const {createReview} = useReview();

  const onSubmit = async ({ownerName, name, rating, review}) => {
    try{
      await createReview(ownerName, name, rating, review, navigation);
    }
    catch(err) {
      console.log(err);
    }
  };
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};


export default CreateReview;