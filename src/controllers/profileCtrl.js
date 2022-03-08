import ProfileModel from '../models/profilesModels.js'
import { awsUploadCV } from '../utils/aws-upload-cv.js'

const getAllProfiles = async () => {
  const profiles = await ProfileModel.find()

  if (!profiles) throw new Error('No profiles have been obtained')
  if (profiles.length === 0) throw new Error('There are no items to display')

  try {
    return profiles
  } catch (error) {
    throw new Error('Error! In the Request Get All', error)
  }
}

const getProfileByID = async id => {
  const profile = await ProfileModel.findById(id)
  if (!profile) throw new Error('No profile has been obtained')
  try {
    return profile
  } catch (error) {
    console.log(error)
    throw new Error('We did not found any Profile with ID', error)
  }
}

const createProfile = async (input, ctx) => {
  const { id } = ctx.user
  const { createReadStream, mimetype } = input.cv
  const extension = mimetype.split('/')[1]
  const cvName = `cv/${id}.${extension}`
  const fileData = createReadStream()
  const newProfile = input

  try {
    const resultCV = await awsUploadCV(fileData, cvName)
    const profile = new ProfileModel({ ...newProfile, cV: resultCV })
    profile.save()
    return profile
  } catch (error) {
    console.log(error)
    throw new Error('Error! In the Request Create', error)
  }
}

const updateProfile = async (input, id) => {
  try {
    const findProfile = await ProfileModel.findById(id)
    if (!findProfile)
      throw new Error('We did not found any Profile with ID ', id)
    const response = await ProfileModel.findByIdAndUpdate(id, input, {
      new: true,
    })
    return response
  } catch (error) {
    console.log(error)
    throw new Error('Error! In the Request Update', error)
  }
}

const deleteProfile = async id => {
  try {
    const findProfile = await ProfileModel.findById(id)
    if (!findProfile)
      throw new Error('We did not found any Profile with ID ', id)
    const response = await ProfileModel.findByIdAndDelete(id)
    return true
  } catch (error) {
    throw new Error('Error! In the Request Delete', error)
  }
}
export { getAllProfiles, getProfileByID, createProfile, deleteProfile }
