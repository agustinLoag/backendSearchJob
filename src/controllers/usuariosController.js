const UsuarioModel = require('../models/usuariosModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generarJWT = require('../helpers/generateJWT')

async function loginUser(input) {
  const { email, password } = input
  //Buscar en la base de datos si el usuario esta registrado
  const userFound = await UsuarioModel.findOne({ Mail: email.toLowerCase() })
  if (!userFound) throw new Error('Email y/o contraseña erroneos')
  const matchPassword = await bcrypt.compare(password, userFound.Contrasena)
  if (!matchPassword) throw new Error('Email y/o contraseña erroneos')

  return {
    token: generarJWT(userFound),
  }
}

async function logoutUser() {
  const { email, password } = input
  //Buscar en la base de datos si el usuario esta registrado
  const userFound = await UsuarioModel.findOne({ Mail: email.toLowerCase() })
  if (!userFound) throw new Error('Email y/o contraseña erroneos')
  const matchPassword = await bcrypt.compare(password, userFound.Contrasena)
  if (!matchPassword) throw new Error('Email y/o contraseña erroneos')
  token = undefined
  return {
    token: token,
  }
}

module.exports = { loginUser, logoutUser }
