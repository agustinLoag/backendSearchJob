import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  telephone: { type: String },
  salary: { type: Number, trim: true },
  cv_Link: { type: String },
  area: { type: String, trim: true },
  keywords: [String],
  charge_level: { type: String, trim: true },
})

const ProfileModel = mongoose.model('Profile', ProfileSchema)

export default ProfileModel
