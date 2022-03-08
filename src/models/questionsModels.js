import mongoose from 'mongoose'

const Schema = mongoose.Schema

const questionSchema = new Schema(
  {
    question: { type: String },
    type: { type: String, trim: true },
    answers: [String],
    vacancyID: { type: Schema.Types.ObjectId, ref: 'Vacancy', required: true },
  },
  { timestamps: true },
)

const QuestionModel = mongoose.model('Question', questionSchema)

export default QuestionModel
