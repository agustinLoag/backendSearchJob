const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postulantesVacanteSchema = new Schema({
  Vacante_Id: { type: Schema.Types.ObjectId, ref: 'Vacante', required: true },
  Estado: { type: String, require: true, trim: true, unique: true },
  Nombre: { type: String, require: true, unique: true },
  Numero: { type: String, trim: true },
  Renta_Esperada: { type: String, trim: true },
  Respuestas: { type: String, trim: true },
  CV: { type: String },
  Video: { type: String, trim: true },
  Notas: [
    {
      mensaje: { type: String, trim: true },
      user: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
      hora: { type: Date, default: Date.now },
    },
  ],
  Video_Results: [
    {
      vote: Boolean,
      user: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    },
  ],
})

const PostulantesVacanteModel = mongoose.model(
  'Postulantes_Vacante',
  postulantesVacanteSchema,
)

module.exports = PostulantesVacanteModel
