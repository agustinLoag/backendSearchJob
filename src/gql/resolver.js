const {
  loginUser,
  logoutUser,
  registrarUsuario,
  getAllUsuarios,
  getUsuariosByID,
  deleteUsuarioByID,
  updateUsuario,
} = require('../controllers/usuariosController')
const { usuarios, vacantes } = require('../data')
const {
  createVacante,
  updateVacante,
  getAllVacantes,
  getVacanteById,
  deleteVacante,
} = require('../controllers/vacanteCtrl')
const {
  getAllPerfiles,
  getPerfileByID,
  createPerfil,
  updatePerfil,
  deletePerfil,
} = require('../controllers/perfilCtrl')

const resolver = {
  Query: {
    //Vacantes
    getVacantes: () => getAllVacantes(),
    getVacanteID: (_, { id }) => getVacanteById(id),
    //Usuarios
    getUsuarios: _ => getAllUsuarios(),
    getUsuarioID: (_, { id }) => getUsuariosByID(id),
    //Perfiles
    getPerfiles: _ => getAllPerfiles(),
    getPerfilID: (_, { id }) => getPerfileByID(id),
  },

  Vacante: {
    //Relazionar la Vacante con el encargado
    encargado: ({ encargado }) => usuarios.find(user => user.id === encargado),
  },

  Mutation: {
    login: async (_, { input }) => loginUser(input),
    logout: async (_, { input }) => logoutUser(input),
    registroUsuarios: async (_, { input }) => registrarUsuario(input),
    eliminarUsuario: async (_, { id }) => deleteUsuarioByID(id),
    actualizarUsuario: async (_, { input, id }) => updateUsuario(input, id),
    //Vacantes
    registroVacantes: async (_, { input }) => createVacante(input),
    actualizarVacante: async (_, { input, id }) => updateVacante(input, id),
    eliminarVacante: async (_, { id }) => deleteVacante(id),
    //Perfiles
    registroPerfiles: async (_, { input }) => createPerfil(input),

    eliminarPerfil: async (_, { id }) => deletePerfil(id),
  },
}

module.exports = resolver
