const { loginUser, logoutUser } = require('../controllers/usuariosController')

const resolver = {
  Query: {
    //Viene de los Schemas de tipo GetUsuarios
    getUsuarios: () => {
      console.log('Obteniendo Usuarios')
      return null
    },
  },

  Mutation: {
    login: (_, { input }) => loginUser(input),
    logout: (_, { input }) => logoutUser(input),
  },
}

module.exports = resolver
