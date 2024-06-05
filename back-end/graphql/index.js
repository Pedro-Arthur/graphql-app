const { gql } = require("apollo-server-express");

const mockUsers = require("../mocks/users");

const typeDefs = gql`
  type Address {
    city: String!
    state: String!
    country: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
    addresses: [Address]!
  }

  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: (_) => {
      return mockUsers;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
