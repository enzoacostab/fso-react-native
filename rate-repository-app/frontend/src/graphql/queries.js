import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GET_REPOSITORIES($orderBy: String, $orderDirection: String, $searchKeyword: String, $first: Int, $after: String){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
          description
          forksCount
          fullName
          id
          language
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GET_REPOSITORY($id: String!, $first: Int, $after: String){
    repository(id: $id, first: $first, after: $after) {
      id
      fullName
      url
      reviews {
        edges {
          node {
            createdAt
            repositoryId
            _id
            rating
            text
            user{
              _id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const USER = gql`
  query USER($includeReviews: Boolean = false) {
    me {
      username
      _id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            _id
            repositoryId
            text
            rating
            createdAt
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation LOGIN($username: String!, $password: String!) {
    authorize(username: $username, password: $password) {
      username
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation CREATE_USER($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
      _id
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CREATE_REVIEW($ownerName: String!, $name: String!, $rating: String!, $review: String) {
    createReview(ownerName: $ownerName, name: $name, rating: $rating, review: $review) {
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

export const DELETE_REVIEW = gql`
  mutation DELETE_REVIEW($id: ID!) {
    deleteReview(id: $id)
  }
`;
