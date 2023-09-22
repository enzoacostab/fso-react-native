import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
    }
  }
`;

export const USER = gql`
  query {
    me {
      username
      id
    }
  }
`;

export const LOGIN = gql`
  mutation Authorize($username: String!, $password: String!) {
    authorize(username: $username, password: $password) {
      username
      token
    }
  }
`;
