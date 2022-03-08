import mongoose from 'mongoose'

const Schema = mongoose.Schema

const VacancySchema = new Schema(
  {
    title: { type: String },
    state: { type: String, trim: true },
    location: { type: String },
    maximun_rent: { type: Number, trim: true },
    description: { type: String, trim: true },
    supervisor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
)

const VacancyModel = mongoose.model('Vacancy', VacancySchema)

export default VacancyModel
