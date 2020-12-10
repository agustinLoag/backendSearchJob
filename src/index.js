const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
//ARCHIVOS EXTERNOS
const typeDefs = require('./gql/schema')
const resolvers = require('./gql/resolver')
const connectDB = require('./db/connectionDB')
//Configurar variables de entorno
dotenv.config()
//Inicializar express
const app = express()

//Middlewares

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

//Cors
app.use(cors())
//Body parser
app.use(express.json())
//Inicializar la conexion a la Base de datos
connectDB()
//SERVER
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

//Visitar locahost:port/graphql para el PlayGround
apolloServer.applyMiddleware({ app, path: '/graphql' })

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server on port ${port}`)
  console.log(`Graphql Endpoint ${apolloServer.graphqlPath}`)
})
