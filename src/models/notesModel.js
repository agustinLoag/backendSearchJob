import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema = new Schema(
  {
    note: { type: String },
    candidate: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vacancyId: { type: Schema.Types.ObjectId, ref: 'Vacancy', required: true },
  },
  {
    timestamps: true,
  },
)

const NotesModel = mongoose.model('Note', noteSchema)
export default NotesModel
