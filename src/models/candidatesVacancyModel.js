import mongoose from 'mongoose'

const Schema = mongoose.Schema

const candidateVacancySchema = new Schema({
  vacancy_Id: { type: Schema.Types.ObjectId, ref: 'Vacancy', required: true },
  state: { type: String, require: true, trim: true },
  name: { type: String, require: true },
  telephone: { type: String, trim: true },
  expected_income: { type: Number, trim: true },
  cv_Link: { type: String },
  video_Link: { type: String, trim: true },
  video_Results: [
    {
      vote: String,
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
  ],
})

const CandidateVacancyModel = mongoose.model(
  'Candidate_Vacancy',
  candidateVacancySchema,
)

export default CandidateVacancyModel
