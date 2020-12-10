const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vacanteSchema = new Schema({
  titulo: { type: String },
  estado: { type: String, trim: true },
  ubicacion: { type: String },
  renta_Maxima: { type: Number, trim: true },
  descripcion: { type: String, trim: true },
  preguntas: [{ type: String, trim: true }],
  encargado: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
})

const VacanteModel = mongoose.model('Vacante', vacanteSchema)

module.exports = VacanteModel
