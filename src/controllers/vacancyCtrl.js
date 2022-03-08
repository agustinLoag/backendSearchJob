import VacancyModel from '../models/vacancyModel.js'
import QuestionModel from '../models/questionsModels.js'
import {
  SAURON,
  CONSULTANT,
  MASTER_CLIENT,
  ZERO_CLIENT,
} from '../utils/const.js'
import {
  getVacanciesBySauron,
  getVacanciesByConsultor,
  getVacanciesByCM,
  getVacanciesByCZ,
} from '../helpers/vancancyGetAll.js'

const getAllVacancies = async (state, search, ctx) => {
  let vacancies
  const regExpression = new RegExp(search, 'i')
  //Filtrar por Todas con/sin search
  if (state === 'Ver Todas' && search !== undefined) {
    vacancies = await VacancyModel.find({
      $or: [{ title: regExpression }, { location: regExpression }],
    }).sort({ state: 1, createdAt: -1 })

    if (!vacancies) throw new Error('No vancancies have been obtained')
    if (vacancies.length === 0) throw new Error('There are no items to display')
    return vacancies
  }

  //Filtrar por Todas
  if (state === 'Ver Todas') {
    vacancies = await VacancyModel.find().sort({ createdAt: -1 })
    if (!vacancies) throw new Error('No vancancies have been obtained')
    if (vacancies.length === 0) throw new Error('There are no items to display')
    return vacancies
  }

  //Filtrar por Activo o Desvinculado y Search
  if (state !== 'Ver Todas') {
    const vacancies = await VacancyModel.find({
      $or: [{ title: regExpression }, { location: regExpression }],
      $and: [{ state: state }],
    }).sort({ createdAt: -1 })

    if (!vacancies) throw new Error('No vancancies have been obtained')
    if (vacancies.length === 0) throw new Error('There are no items to display')
    return vacancies
  }

  //OBTIENE LAS VACANTES CONFORME AL ROL QUE VIENE EN EL JWT
  // const { user } = ctx
  // const { role, company } = user
  // try {
  //   let vacancies
  //   switch (role) {
  //     case SAURON:
  //       vacancies = getVacanciesBySauron(state, search)
  //       return vacancies

  //     case CONSULTANT:
  //       vacancies = getVacanciesByConsultor(state, search, user)
  //       return vacancies

  //     case MASTER_CLIENT:
  //       vacancies = getVacanciesByCM(state, search, company)
  //       return vacancies

  //     case ZERO_CLIENT:
  //       vacancies = getVacanciesByCZ(state, search, user)
  //       return vacancies

  //     default:
  //       vacancies = await VacancyModel.find()
  //       if (!vacancies) throw new Error('No vancancies have been obtained')
  //       if (vacancies.length === 0)
  //         throw new Error('There are no items to display')
  //       return vacancies

  //       break
  //   }
  // } catch (error) {
  //   throw new Error('Error! In the Request Get All', error)
}

const getVacancyById = async id => {
  const vacancy = await VacancyModel.findById(id).populate('supervisor')

  if (!vacancy) throw new Error('No vacancy has been obtained')
  try {
    return vacancy
  } catch (error) {
    throw new Error('We did not found any Profile with ID', error)
  }
}

const createVacancy = async input => {
  const { questions } = input
  const newVacancy = input
  try {
    const vacancy = new VacancyModel({
      ...newVacancy,
      createdBy: '5feb9766d21c284790e173b3',
    })

    questions.forEach(question => {
      const newQuestions = new QuestionModel({
        question: question.question,
        type: question.type,
        answers: question.answer,
        vacancyID: vacancy.id,
      })
      newQuestions.save()
    })
    vacancy.save()
    return vacancy
  } catch (error) {
    console.log(error)
    throw new Error('Error! In the Request Create', error)
  }
}

const updateVacancy = async (input, id) => {
  try {
    const findVacancy = await VacancyModel.findById(id)
    if (!findVacancy)
      throw new Error('We did not found any Profile with ID  ', id)
    const response = await VacancyModel.findByIdAndUpdate(id, input, {
      new: true,
    })
    return response
  } catch (error) {
    console.log(error)
    throw new Error('Error! In the Request Update', error)
  }
}

const deleteVacancy = async id => {
  try {
    const findVacancy = await VacancyModel.findById(id)
    if (!findVacancy)
      throw new Error('We did not found any Profile with ID', id)
    const response = await VacancyModel.findByIdAndDelete(id)
    return true
  } catch (error) {
    throw new Error('Error! In the Request Delete', error)
  }
}

export {
  getAllVacancies,
  getVacancyById,
  createVacancy,
  updateVacancy,
  deleteVacancy,
}
