import { render } from "@testing-library/react-native";
import React from "react";
import RepositoryListContainer from "../../components/RepositoryListContainer";

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = [
        {
          id: 'jaredpalmer.formik',
          fullName: 'jaredpalmer/formik',
          description: 'Build forms in React, without the tears',
          language: 'TypeScript',
          forksCount: 1619,
          stargazersCount: 21856,
          ratingAverage: 88,
          reviewCount: 3,
          ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4'
        },
        {
          id: 'async-library.react-async',
          fullName: 'async-library/react-async',
          description: 'Flexible promise-based React data loader',
          language: 'JavaScript',
          forksCount: 69,
          stargazersCount: 1760,
          ratingAverage: 72,
          reviewCount: 3,
          ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
        }
      ];
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      expect(getAllByTestId('fullName')).toHaveLength(2);
      repositories.forEach((obj, i) => {
        // eslint-disable-next-line no-unused-vars
        const {id, ownerAvatarUrl, ...resObj} = obj;
        for (let key in resObj){
          expect(getAllByTestId(key)[i]).
          toHaveTextContent(
            key==="stargazersCount" || key==="forksCount" ? 
            (resObj[key]/1000).toFixed(1)+"k" : 
            resObj[key]
          );
        }
      });
    });
  });
});