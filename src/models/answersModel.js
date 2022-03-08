import mongoose from 'mongoose'

const Schema = mongoose.Schema

const answerSchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    questionID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    answer: { type: String },
  },
  {
    timestamps: true,
  },
)

const AnswerModel = mongoose.model('Answer', answerSchema)

export default AnswerModel
