import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {faker} from '@faker-js/faker/locale/zh_CN'

const typeDefs = `#graphql
  type Query {
    hello: String
    resolved: String
  }
`;

const resolvers = {
  UserType:{
    name:()=>faker.name.fullName()
  }
};


const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'adad',
};


const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers:true
  }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 8888 } });

console.log(`🚀 Server listening at: ${url}`);
