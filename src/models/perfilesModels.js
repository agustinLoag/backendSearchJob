const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PerfilesSchema = new Schema({
  telefono: { type: String },
  sueldo: { type: Number, trim: true },
  cV: { type: String },
  area: { type: String, trim: true },
  palabras_Clave: [String],
  nivel_Cargo: { type: String, trim: true },
  video: { type: String, trim: true },
})

const PerfilesModel = mongoose.model('Perfil', PerfilesSchema)

module.exports = PerfilesModel
