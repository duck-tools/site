import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typedefs } from './queries';
import gateway from './gateway';

export const graphqlRouter = express.Router();

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    const data = {};
    if (!!req.user) {
      const { jwt } = req.user;
      data.jwt = jwt;
    }
    return data;
  }
});

server.applyMiddleware({ app: graphqlRouter });
