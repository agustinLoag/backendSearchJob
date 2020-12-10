const VacanteModel = require('../models/vacantesModel')

async function getAllVacantes() {
  const vacantes = await VacanteModel.find()

  if (!vacantes) throw new Error('No se han obtenido vacantes')
  if (vacantes.length === 0) throw new Error('No hay elementos a mostrar')

  try {
    return vacantes
  } catch (error) {
    throw new Error('Error en la peticion de obtener vacantes', error)
  }
}

async function getVacanteById(id) {
  const vacante = await VacanteModel.findById(id)
  if (!vacante) throw new Error('No se han obtenido vacante')
  if (vacante.length === 0) throw new Error('No hay elementos a mostrar')

  try {
    return vacante
  } catch (error) {
    throw new Error('Error en la peticion de obtener vacante por ID', error)
  }
}

async function createVacante(input) {
  console.log(input)
  const {
    titulo,
    estado,
    ubicacion,
    renta_Maxima,
    descripcion,
    preguntas,
    encargado,
  } = input

  const newVacante = input

  try {
    const vacante = new VacanteModel(newVacante)
    vacante.save()
    return vacante
  } catch (error) {
    console.log(error)
    throw new Error('Error al registrar el vacante', error)
  }
}

async function updateVacante(input, id) {
  try {
    const findVacante = await VacanteModel.findById(id)
    if (!findVacante)
      throw new Error('No se encontro ningun usuario con el ID ', id)
    const respuesta = await VacanteModel.findByIdAndUpdate(id, input, {
      new: true,
    })
    return respuesta
  } catch (error) {
    console.log(error)
    throw new Error(
      'Error en la peticion de Actualizar una vacante por ID',
      error,
    )
  }
}

async function deleteVacante(id) {
  try {
    const findVacante = await VacanteModel.findById(id)
    if (!findVacante)
      throw new Error('No se encontro ningun Vacante con el ID ', id)
    const respuesta = await VacanteModel.findByIdAndDelete(id)
    return true
  } catch (error) {
    throw new Error('Error en la peticion de Eliminar Vacante por ID', error)
  }
}

module.exports = {
  getAllVacantes,
  getVacanteById,
  createVacante,
  updateVacante,
  deleteVacante,
}
