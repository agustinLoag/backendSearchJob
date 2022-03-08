import UserModel from '../models/usersModel.js'
import bcrypt from 'bcryptjs'
import generateJWT from '../helpers/generateJWT.js'

const createUser = async input => {
  const { name, mail, password, company, role } = input
  const mailToLower = mail.toLowerCase()
  const foundMail = await UserModel.findOne({ mail: mailToLower })
  if (foundMail) throw new Error('Email already used')
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  const newUser = {
    name,
    role,
    mail: mailToLower,
    password: hashPassword,
    company,
  }
  try {
    const user = new UserModel(newUser)
    user.save()
    return user
  } catch (error) {
    throw new Error('Error! In the Request Create', error)
  }
}

const getAllUsers = async () => {
  const users = await UserModel.find()

  if (!users) throw new Error('No users have been obtained')
  if (users.length === 0) throw new Error('There are no items to display')
  try {
    return users
  } catch (error) {
    throw new Error('Error! In the Request Get All', error)
  }
}

const getUserByID = async id => {
  const user = await UserModel.findById(id)
  if (!user) throw new Error('No user has been obtained')
  try {
    return user
  } catch (error) {
    throw new Error('We did not found any User with ID', error)
  }
}

const loginUser = async input => {
  const { email, password } = input
  //Buscar en la base de datos si el usuario esta registrado
  const userFound = await UserModel.findOne({ mail: email.toLowerCase() })
  if (!userFound) throw new Error('Email and/or password wrong')
  const matchPassword = await bcrypt.compare(password, userFound.password)
  if (!matchPassword) throw new Error('Email and/or password wrong')
  return {
    token: generateJWT(userFound),
  }
}

const deleteUserByID = async id => {
  try {
    const findUser = await UserModel.findById(id)
    if (!findUser) throw new Error('We did not found any Profile with ID', id)
    const response = await UserModel.findByIdAndDelete(id)
    return true
  } catch (error) {
    throw new Error('Error! In the Request Delete', error)
  }
}

const updateUser = async (input, id) => {
  const findUser = await UserModel.findById(id)

  if (!findUser) throw new Error('We did not found any Profile with ID ', id)

  const { mail, role, company } = input
  const mailToLower = mail.toLowerCase()
  const foundMail = await UserModel.findOne({ mail: mailToLower })
  if (foundMail) throw new Error('Email already used')

  const updateUser = {
    mail: mailToLower,
    company,
    role,
  }
  const response = await UserModel.findByIdAndUpdate(id, updateUser, {
    new: true,
  })
  return response
}

export {
  loginUser,
  createUser,
  getAllUsers,
  getUserByID,
  deleteUserByID,
  updateUser,
}
