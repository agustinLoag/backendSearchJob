import candidateVacancyModel from '../models/candidatesVacancyModel.js'
import validator from 'validator'
const getAllCandidates = async (id, state, search, renta) => {
  let candidates

  try {
    candidates = await candidateVacancyModel.findById(id)

    return candidates

    // const regExpression = new RegExp(search, 'i')
    // //Filtrar por Todas con/sin search
    // if (state === 'Ver Todas' && search !== undefined) {
    //   console.log('A')
    //   candidates = await candidateVacancyModel
    //     .find({
    //       $or: [{ name: regExpression }],
    //       and:
    //     })
    //     .sort({ state: 1 })

    //   if (!candidates) throw new Error('No vancancies have been obtained')
    //   if (candidates.length === 0)
    //     throw new Error('There are no items to display')
    //   return candidates
    // }

    // //Filtrar por el Estado y/o con Search
    // if (state !== 'Ver Todas') {
    //   console.log('entre en 3')

    //   candidates = await candidateVacancyModel
    //     .find({
    //       $or: [{ name: regExpression }, { expected_income: { gte: renta } }],
    //       $and: [{ state: state }],
    //     })
    //     .sort({ createdAt: -1 })

    //   if (!candidates) throw new Error('No vancancies have been obtained')
    //   if (candidates.length === 0)
    //     throw new Error('There are no items to display')
    //   return candidates
    // }
  } catch (error) {
    throw new Error('Error! In the Request Get All', error)
  }
}

const getCandidateByID = async id => {
  const candidate = await candidateVacancyModel.findById(id)
  if (!candidate) throw new Error('No candidate has been obtained')
  try {
    return candidate
  } catch (error) {
    throw new Error('We did not found any Candidate with ID', error)
  }
}

const getCandidatesFromVacancy = async (id, state, search, renta) => {
  const isEmptySearch = validator.isEmpty(search)
  // const candidates = await candidateVacancyModel.find({ vacancy_Id: id })
  let candidates
  const regExpression = new RegExp(search, 'i')

  if (state !== 'Ver Todas') {
    const vacancies = await candidateVacancyModel.find({
      vacancy_Id: id,
      $or: [{ name: regExpression }],
      $and: [{ state: state }, { expected_income: { $gte: renta } }],
    })

    if (!vacancies) throw new Error('No vancancies have been obtained')
    if (vacancies.length === 0) throw new Error('There are no items to display')
    return vacancies
  }

  if (
    state === 'Ver Todas' ||
    renta !== undefined ||
    regExpression === undefined
  ) {
    console.log('Entre aqui')
    candidates = await candidateVacancyModel.find({
      vacancy_Id: id,
      $or: [{ name: regExpression }],
      $and: [{ expected_income: { $gte: renta } }],
    })
    if (!candidates) throw new Error('No vancancies have been obtained')
    if (candidates.length === 0)
      throw new Error('There are no items to display')
    return candidates
  }

  if (state === 'Ver Todas') {
    candidates = await candidateVacancyModel.find({
      vacancy_Id: id,
      $or: [{ name: regExpression }],
    })
    if (!candidates) throw new Error('No vancancies have been obtained')
    if (candidates.length === 0)
      throw new Error('There are no items to display')
    return candidates
  }

  //Filtrar por Todas con/sin search
}

const createCandidate = async (input, ctx) => {
  // const { id } = ctx.user
  // const { createReadStream, mimetype } = input.cv_Link
  // const extension = mimetype.split('/')[1]
  // const cvName = `cv/${id}.${extension}`
  // const fileData = createReadStream()
  const newCandidate = input
  try {
    // const resultCV = await awsUploadCV(fileData, cvName)
    const candidate = new candidateVacancyModel(newCandidate)
    candidate.save()
    return candidate
  } catch (error) {
    console.log(error)
    throw new Error('Error! In the Request Create', error)
  }
}

const updateCandidate = async (input, id) => {
  try {
    const findCandidate = await candidateVacancyModel.findById(id)
    if (!findCandidate)
      throw new Error('We did not found any Candidate with ID ', id)
    const response = await candidateVacancyModel.findByIdAndUpdate(id, input, {
      new: true,
    })
    return response
  } catch (error) {
    console.log(error)
    throw new Error('Error! In the Request Update', error)
  }
}

const deleteCandidate = async id => {
  try {
    const findCandidate = await candidateVacancyModel.findById(id)
    if (!findCandidate)
      throw new Error('We did not found any Candidate with ID ', id)
    const response = await candidateVacancyModel.findByIdAndDelete(id)
    return true
  } catch (error) {
    throw new Error('Error! In the Request Delete', error)
  }
}

const getHistory = async nameCandidate => {
  try {
    const findHistory = await candidateVacancyModel
      .find({
        name: nameCandidate,
      })
      .populate('vacancy_Id')
    if (!findHistory) throw new Error('No History has been obtained')
    return findHistory
  } catch (error) {
    console.log(error)
    throw new Error('Error! In the Request Update', error)
  }
}

export {
  getAllCandidates,
  getCandidateByID,
  getCandidatesFromVacancy,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getHistory,
}
