import { useQuery } from '@apollo/client';
import { USER } from '../graphql/queries';

const useUser = () => {
  const {data, loading, refetch } = useQuery(USER, {
    fetchPolicy: 'cache-and-network',
    onError: (err) => console.log(err)
  });

  return { data, loading, refetch };
};

export default useUser;