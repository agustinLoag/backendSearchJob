import VacancyModel from '../models/vacancyModel.js'
import validator from 'validator'

const getVacanciesBySauron = async (state, search) => {
  let vacancies
  const regExpression = new RegExp(search, 'i')
  //Filtrar por Todas con/sin search
  if (state === 'Ver Todas' && search !== undefined) {
    console.log('A')
    vacancies = await VacancyModel.find({
      $or: [{ title: regExpression }, { location: regExpression }],
    }).sort({ createdAt: -1 })

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
}

const getVacanciesByConsultor = async (state, search, user) => {
  const { id } = user
  let vacancies
  try {
    vacancies = await VacancyModel.find({
      $and: [{ $or: [{ supervisor: id }, { createdBy: id }] }],
    })
    if (!vacancies) throw new Error('No vancancies have been obtained')
    if (vacancies.length === 0) throw new Error('There are no items to display')
    return vacancies
  } catch (error) {
    throw new Error('Error! In the your request as User', error)
  }
}
// CM hace referencia al cliente master

const getVacanciesByCM = async (state, search, company) => {
  let vacancies
  const _company = company
  try {
    vacancies = await VacancyModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'supervisor',
          foreignField: '_id',
          as: 'Users',
        },
      },
      {
        $addFields: {
          Users: {
            $filter: {
              input: '$Users',
              as: 'user',
              cond: {
                $eq: ['$$user.company', `${_company}`],
              },
            },
          },
        },
      },
      { $unwind: { path: '$Users', preserveNullAndEmptyArrays: false } },
    ])
    if (!vacancies) throw new Error('No vancancies have been obtained')
    if (vacancies.length === 0) throw new Error('There are no items to display')
    return vacancies
  } catch (error) {
    throw new Error('Error! In the your request as User', error)
  }
}
//Cz hace referencia al cliente Zero
const getVacanciesByCZ = async (state, search, user) => {
  const { id } = user
  let vacancies
  try {
    //Filtrar por Todas con search
    if (state === 'Ver Todas' && search !== undefined) {
      vacancies = await VacancyModel.find({
        $or: [{ title: regExpression }, { location: regExpression }],
        $and: [{ createdBy: id }],
      }).sort({ createdAt: -1 })
      console.log(object)
      if (!vacancies) throw new Error('No vancancies have been obtained')
      if (vacancies.length === 0)
        throw new Error('There are no items to display')
      return vacancies
    }

    //Filtrar por Todas sin search
    if (state === 'Ver Todas') {
      vacancies = await VacancyModel.find({ createdBy: id }).sort({
        createdAt: -1,
      })
      if (!vacancies) throw new Error('No vancancies have been obtained')
      if (vacancies.length === 0)
        throw new Error('There are no items to display')
      return vacancies
    }
    //Filtrar por Activo o Desvinculado y Search
    if (state !== 'Ver Todas') {
      vacancies = await VacancyModel.find({
        $or: [{ title: regExpression }, { location: regExpression }],
        $and: [{ state: state }, { createdBy: id }],
      })
      if (!vacancies) throw new Error('No vancancies have been obtained')
      if (vacancies.length === 0)
        throw new Error('There are no items to display')
      return vacancies
    }
  } catch (error) {
    throw new Error('Error! In the your request as User', error)
  }
}
export {
  getVacanciesBySauron,
  getVacanciesByConsultor,
  getVacanciesByCM,
  getVacanciesByCZ,
}
