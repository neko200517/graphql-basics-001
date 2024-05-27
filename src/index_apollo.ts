// Query, Mutate対応

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import path from 'path';
import { gql } from 'graphql-tag';
import { resolvers } from './resolvers';
import { PrismaClient } from '@prisma/client';
import { getUserId } from './utils';

const prisma = new PrismaClient();

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, './schema.graphql'), {
    encoding: 'utf-8',
  })
);

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      return {
        ...req,
        prisma,
        userId: req && req.headers.authorization ? getUserId(req) : null,
      };
    },
  });
  console.log(`
    Server is runnnig!
    Query at ${url}
  `);
}

startApolloServer();
