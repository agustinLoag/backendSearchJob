const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PerfilesSchema = new Schema({
  Telefono: { type: Number },
  Sueldo: { type: Number, trim: true },
  CV: { type: String },
  Area: { type: String, trim: true },
  Palabras_Clave: [String],
  Nivel_Cargo: { type: String, trim: true },
  Video: { type: String, trim: true },
})

const PerfilesModel = mongoose.model('Perfil', PerfilesSchema)

module.exports = PerfilesModel
