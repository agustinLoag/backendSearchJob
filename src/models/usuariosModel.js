const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
  rol: { type: String },
  mail: { type: String, trim: true },
  contrasena: { type: String, trim: true },
  empresa: { type: String, trim: true },
})

const UsuarioModel = mongoose.model('Usuario', usuarioSchema)

module.exports = UsuarioModel
