const { gql } = require('apollo-server')

const typeDefs = gql`
  type Usuario {
    id: ID
    Nombre: String
  }

  type Token {
    token: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getUsuarios: Usuario
  }

  type Mutation {
    login(input: LoginInput): Token
    logout(input: LoginInput): Token
  }
`

module.exports = typeDefs
