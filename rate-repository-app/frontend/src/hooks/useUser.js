import { useQuery } from '@apollo/client';
import { USER } from '../graphql/queries';

const useUser = ({includeReviews}) => {
  const { data, loading, error, refetch } = useQuery(USER, {
    variables: {includeReviews},
    fetchPolicy: 'cache-and-network',
    onError: (err) => console.log(err)
  });

  return { data, loading, error, refetch };
};

export default useUser;