import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  role: { type: String },
  name: { type: String, trim: true },
  mail: { type: String, trim: true },
  password: { type: String, trim: true },
  company: { type: String, trim: true },
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
