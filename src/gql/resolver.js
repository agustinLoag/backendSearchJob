import graphql from 'graphql-resolvers'
const { combineResolvers } = graphql
import {
  loginUser,
  createUser,
  getAllUsers,
  getUserByID,
  deleteUserByID,
  updateUser,
} from '../controllers/userCtrl.js'

import {
  getAllVacancies,
  getVacancyById,
  createVacancy,
  updateVacancy,
  deleteVacancy,
} from '../controllers/vacancyCtrl.js'
import {
  getAllProfiles,
  getProfileByID,
  createProfile,
  deleteProfile,
} from '../controllers/profileCtrl.js'
import {
  getAllCandidates,
  getCandidateByID,
  getCandidatesFromVacancy,
  createCandidate,
  deleteCandidate,
  getHistory,
} from '../controllers/candidateCtrl.js'
import { isAuthenticated, hasSauronPermission } from '../middlewares/index.js'
import sendWhatAppMessage from '../helpers/send-wsp.js'

const resolver = {
  Query: {
    //Vacantes
    //Busqueda con la autenticacion de JWT
    // getVacancies: combineResolvers(
    //   isAuthenticated,
    //   (_, { state, search }, ctx) => getAllVacancies(state, search, ctx),
    // ),
    getVacancies: (_, { state, search }) => getAllVacancies(state, search),

    getVacancyID: (_, { id }) => getVacancyById(id),
    //Usuarios
    //Get users con JWT
    // getUsers: combineResolvers(isAuthenticated, hasSauronPermission, (_, __) =>
    //   getAllUsers(),
    // ),
    getUsers: (_, __) => getAllUsers(),

    getUserID: combineResolvers(isAuthenticated, (_, { id }) =>
      getUserByID(id),
    ),
    //Perfiles
    getProfiles: combineResolvers(isAuthenticated, (_, __, ctx) =>
      getAllProfiles(),
    ),
    getProfileID: (_, { id }) => getProfileByID(id),
    //Postulantes
    getCandidates: (_, { id }) => getAllCandidates(id),
    getCandidateID: (_, { id }) => getCandidateByID(id),
    getCandidatesVacancy: (_, { id, state, search, renta }) =>
      getCandidatesFromVacancy(id, state, search, renta),
    getHistoryVacancies: (_, { name }) => getHistory(name),
  },

  Mutation: {
    //Usuarios
    login: async (_, { input }) => loginUser(input),

    registerUsers: async (_, { input }) => createUser(input),
    deleteUser: async (_, { id }) => deleteUserByID(id),
    updateUser: async (_, { input, id }) => updateUser(input, id),
    //Vacantes
    registerVacancy: async (_, { input }) => createVacancy(input),
    updateVacancy: async (_, { input, id }, ctx) => updateVacancy(input, id),
    deleteVacancy: async (_, { id }) => deleteVacancy(id),
    //Perfiles
    registerProfile: async (_, { input }, ctx) => createProfile(input, ctx),
    deleteProfile: async (_, { id }) => deleteProfile(id),
    //Postulantes
    registerCandidate: async (_, { input }, ctx) => createCandidate(input),
    deleteCandidate: async (_, { id }) => deleteCandidate(id),
    //Enviar Whats App
    sendWhatsApp: async (_, { input }) => sendWhatAppMessage(input),
  },
}

export default resolver
