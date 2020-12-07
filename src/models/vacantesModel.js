const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vacanteSchema = new Schema({
  Titulo: { type: String },
  Estado: { type: String, trim: true },
  Ubicacion: { type: String },
  Renta_Maxima: { type: String, trim: true },
  Descripcion: { type: String, trim: true },

  Preguntas: [
    {
      pregunta: String,
      Tipo: String,
      Respuesta: [String],
    },
  ],
  Encargado: { type: String, trim: true },
})

const VacanteModel = mongoose.model('Vacante', vacanteSchema)

module.exports = VacanteModel
