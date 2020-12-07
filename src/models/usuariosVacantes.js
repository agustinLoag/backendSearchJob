const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usuarioVacanteSchema = new Schema({
  usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  vacante_id: { type: Schema.Types.ObjectId, ref: 'Vacante', required: true },
})

const UsuarioVacanteModel = mongoose.model(
  'Usuarios_Vacante',
  usuarioVacanteSchema,
)

module.exports = UsuarioVacanteModel
