/* eslint-disable import/no-extraneous-dependencies */
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { faker } from '@faker-js/faker/locale/zh_CN';

const typeDefs = `#graphql
  type UserType {
   id:String!
   name:String!
   desc:String!
   account:String!
  }

  type Query {
    """使用 ID 查询用户"""
    find(id: String!): UserType!
  }

  type Mutation {
    """新增用户"""
    create(params: UserInput!): Boolean!

    """更新用户"""
    update(id: String!, params: UserInput!): Boolean!

    """删除一个用户"""
    del(id: String!): Boolean!
  }

  input UserInput {
    name: String!
    desc: String!
  }
`;

const resolvers = {
  UserType: {
    name: () => faker.name.lastName() + faker.name.firstName(),
  },
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
    preserveResolvers: true,
  }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 8888 } });

console.log(`🚀 Server listening at: ${url}`);
