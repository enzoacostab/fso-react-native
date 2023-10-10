import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORY } from '../graphql/queries';

const useRepositories = ({orderBy, orderDirection}, searchKeyword, {first}) => {
  const {data, loading, fetchMore} = useQuery(GET_REPOSITORIES, {
    variables: {orderBy, orderDirection, searchKeyword, first},
    fetchPolicy: 'cache-and-network',
    onError: (err) => console.log(err)
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.startCursor,
        orderBy, orderDirection, searchKeyword, first
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };
  
  return {
    data,
    fetchMore: handleFetchMore,
    loading,
  };
};  

export const useRepository = (id, {first}) => {
  const {data, refetch, loading, fetchMore} = useQuery(GET_REPOSITORY, {
    variables: {id, first},
    fetchPolicy: 'cache-and-network',
    onError: (err) => console.log(err)
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.startCursor, 
        id, first
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...previousResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            }
          },
        };

        return nextResult;
      },
    });
  };

  return { data, fetchMore: handleFetchMore, loading, refetch };
};  

export default useRepositories;