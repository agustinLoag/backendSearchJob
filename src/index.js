import express from 'express'
import apollo from 'apollo-server-express'
const { ApolloServer } = apollo
import cors from 'cors'
import dotenv from 'dotenv'
//ARCHIVOS EXTERNOS
import typeDefs from './gql/schema.js'
import resolvers from './gql/resolver.js'
import connectDB from './db/connectionDB.js'
import verifyUser from './helpers/verifyUser.js'

//Configurar variables de entorno
dotenv.config()
//Inicializar express
const app = express()

//Middlewares
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
  context: async ({ req }) => {
    const token = req.headers.authorization || ''
    const user = await verifyUser(req)
    return {
      user,
    }
  },
})

//Visitar locahost:port/graphql para el PlayGround
apolloServer.applyMiddleware({ app, path: '/graphql' })

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server on port ${port}`)
  console.log(`Graphql Endpoint ${apolloServer.graphqlPath}`)
})
