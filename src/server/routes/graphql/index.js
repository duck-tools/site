import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typedefs } from './queries';

export const graphqlRouter = express.Router();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const data = { req };
    if (!!req.user) {
      const { displayName, picture } = req.user;
      data.profile = { displayName, picture };
    }
    return data;
  }
});

server.applyMiddleware({ app: graphqlRouter });
