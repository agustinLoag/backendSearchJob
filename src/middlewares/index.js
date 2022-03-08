import gph from 'graphql-resolvers'
import { SAURON } from '../utils/const.js'
const { skip } = gph

const isAuthenticated = async (_, __, { user }) => {
  console.log('epale', user)
  if (!user.mail) {
    throw new Error('Authentication! Please login to continue')
  }
  return skip
}

const hasSauronPermission = async (_, __, { user }) => {
  if (!user.mail) {
    throw new Error('Authentication! Please login to continue')
  }
  if (user.role !== SAURON) {
    throw new Error('You do not have the permissions to make this request')
  }
  return skip
}

export { isAuthenticated, hasSauronPermission }
