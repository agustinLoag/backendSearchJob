const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
  Rol: { type: String },
  Mail: { type: String, trim: true, unique: true },
  Contrasena: { type: String, trim: true },
  Empresa: { type: String, trim: true },
})

const UsuarioModel = mongoose.model('Usuario', usuarioSchema)

module.exports = UsuarioModel
