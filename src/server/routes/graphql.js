import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

export const graphqlRouter = express.Router();

const typeDefs = gql`
  type Profile {
    displayName: String
    picture: String
  }

  type Query {
    hello: String
    profile: Profile
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    profile: (parent, args, context) => context.profile
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const data = {};
    if (!!req.user) {
      const { displayName, picture } = req.user;
      data.profile = { displayName, picture };
    }
  }
});

server.applyMiddleware({ app: graphqlRouter });
