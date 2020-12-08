const mongoose = require('mongoose')
const { ApolloServer, ApolloError } = require('apollo-server')
const typeDefs = require('./gql/schema')
const resolvers = require('./gql/resolver')
const connectDB = require('./db/connectionDB')

connectDB()

function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
  })

  serverApollo
    .listen()
    .then(({ url }) => {
      console.log(`Servidor listo en la url ${url}`)
    })
    .catch(err => console.error('Error en la bd', err))
}

server()
console.log('Hola mundo')
