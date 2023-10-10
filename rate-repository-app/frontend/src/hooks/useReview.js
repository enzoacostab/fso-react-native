import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_REVIEW, DELETE_REVIEW } from "../graphql/queries";

const useReview = () => {
  const [mutateCre] = useMutation(CREATE_REVIEW, {
    onError: (err) => console.log(err)
  });

  const [mutateDel] = useMutation(DELETE_REVIEW, {
    onError: (err) => console.log(err)
  });
  const client = useApolloClient();

  const createReview = async(ownerName, name, rating, review, navigation) => {
    const {data} = await mutateCre({variables: {ownerName, name, rating, review}});
    navigation.navigate('Repository', {repository: data.createReview});
  };

  const deleteReview = async(id) => {
    await mutateDel({variables: {id}});
    client.resetStore();
  };

  return {createReview, deleteReview};
};

export default useReview;