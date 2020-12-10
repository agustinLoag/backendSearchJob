const UsuarioModel = require('../models/usuariosModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generarJWT = require('../helpers/generateJWT')

async function registrarUsuario(input) {
  const { mail, contrasena, empresa, rol } = input
  const foundMail = await UsuarioModel.findOne({ mail })
  if (foundMail) throw new Error('Email esta en uso')
  const salt = await bcrypt.genSalt(10)
  const contrasenaEncriptada = await bcrypt.hash(contrasena, salt)
  const mailToLower = mail.toLowerCase()
  const newUser = {
    rol,
    mail: mailToLower,
    contrasena: contrasenaEncriptada,
    empresa,
  }
  try {
    const user = new UsuarioModel(newUser)
    user.save()
    return user
  } catch (error) {
    throw new Error('Error al registrar el usuario', error)
  }
}

async function getAllUsuarios() {
  const usuarios = await UsuarioModel.find()

  if (!usuarios) throw new Error('No se han obtenido usuarios')
  if (usuarios.length === 0) throw new Error('No hay elementos a mostrar')

  try {
    return usuarios
  } catch (error) {
    throw new Error('Error en la peticion de obtener usuarios', error)
  }
}

async function getUsuariosByID(id) {
  const usuario = await UsuarioModel.findById(id)
  if (!usuario) throw new Error('No se han obtenido usuario')
  if (usuario.length === 0) throw new Error('No hay elementos a mostrar')

  try {
    return usuario
  } catch (error) {
    throw new Error('Error en la peticion de obtener usuario por ID', error)
  }
}

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

async function deleteUsuarioByID(id) {
  try {
    const findUser = await UsuarioModel.findById(id)
    if (!findUser)
      throw new Error('No se encontro ningun usuario con el ID ', id)
    const respuesta = await UsuarioModel.findByIdAndDelete(id)
    return true
  } catch (error) {
    throw new Error('Error en la peticion de Eliminar usuario por ID', error)
  }
}

async function updateUsuario(input, id) {
  const findUser = await UsuarioModel.findById(id)

  if (!findUser) throw new Error('No se encontro ningun usuario con el ID ', id)

  const { mail, rol, empresa } = input
  const foundMail = await UsuarioModel.findOne({ mail })
  if (foundMail) throw new Error('Email esta en uso')
  const mailToLower = mail.toLowerCase()
  const updateUser = {
    mail: mailToLower,
    empresa,
    rol,
  }
  const respuesta = await UsuarioModel.findByIdAndUpdate(id, updateUser, {
    new: true,
  })
  return respuesta
}

module.exports = {
  loginUser,
  logoutUser,
  registrarUsuario,
  getAllUsuarios,
  getUsuariosByID,
  deleteUsuarioByID,
  updateUsuario,
}
