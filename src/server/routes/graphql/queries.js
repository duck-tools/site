import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Profile {
    displayName: String
    picture: String
  }

  type Query {
    hello: String
    profile: Profile
  }
`;

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    profile: (parent, args, context) => context.profile
  }
};
