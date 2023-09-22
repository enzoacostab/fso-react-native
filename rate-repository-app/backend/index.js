import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config'
import { v1 as uuid } from 'uuid';

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

const users = [];

const typeDefs = `
  type AuthorizeInput {
    username: String!
    password: String!
  }

  type Token {
    token: String!
    username: String!
  }

  type User {
    id: ID!
    username: String!
  }

  type Repository {
    id: String
    fullName: String
    description: String
    language: String
    forksCount: Int
    stargazersCount: Int
    ratingAverage: Int
    reviewCount: Int
    ownerAvatarUrl: String
  }

  type Query {
    repositories: [Repository]
    me: User
  }

  type Mutation {
    authorize(username: String!, password: String!): Token!
  }
`;

const resolvers = {
  Query: {
    repositories: () => repositories,
    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    authorize: (root, args) => {
      if (!args.username || !args.password){
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      let user = users.find(e => e.username === args.username)

      if (!user){
        const newUser = {
          username: args.username,
          id: uuid()
        }
        user = newUser;
        users.push(newUser);
      }

      const userForToken = {
        username: args.username,
        id: user.id
      }

      return {username: args.username, token: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

});

const { url } = await startStandaloneServer(server, {
  context: ({ req }) => {
    const auth = req ? req.headers.authorization : null
      if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = decodedToken
        return { currentUser }
      }
  },
  listen: { port: 5000 },
});

console.log(`Server ready at: ${url}`);