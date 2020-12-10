const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postulantesVacanteSchema = new Schema({
  vacante_Id: { type: Schema.Types.ObjectId, ref: 'Vacante', required: true },
  estado: { type: String, require: true, trim: true, unique: true },
  nombre: { type: String, require: true, unique: true },
  numero: { type: String, trim: true },
  renta_Esperada: { type: String, trim: true },
  respuestas: { type: String, trim: true },
  cv: { type: String },
  video: { type: String, trim: true },
  notas: [
    {
      mensaje: { type: String, trim: true },
      user: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
      hora: { type: Date, default: Date.now },
    },
  ],
  video_Results: [
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
