import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

export const graphqlRouter = express.Router();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app: graphqlRouter });
