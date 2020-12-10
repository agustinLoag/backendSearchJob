const PerfilesModel = require('../models/perfilesModels')

async function getAllPerfiles() {
  const perfiles = await PerfilesModel.find()

  if (!perfiles) throw new Error('No se han obtenido perfiles')
  if (perfiles.length === 0) throw new Error('No hay elementos a mostrar')

  try {
    return perfiles
  } catch (error) {
    throw new Error('Error en la peticion de obtener perfiles', error)
  }
}

async function getPerfileByID(id) {
  const perfil = await PerfilesModel.findById(id)
  if (!perfil) throw new Error('No se han obtenido perfil')
  if (perfil.length === 0) throw new Error('No hay elementos a mostrar')

  try {
    return perfil
  } catch (error) {
    console.log(error)
    throw new Error('Error en la peticion de obtener perfil por ID', error)
  }
}

async function createPerfil(input) {
  const newPerfil = input

  try {
    const perfil = new PerfilesModel(newPerfil)
    perfil.save()
    return perfil
  } catch (error) {
    console.log(error)
    throw new Error('Error al registrar el perfil', error)
  }
}

async function updatePerfil(input, id) {
  try {
    const findPerfil = await PerfilesModel.findById(id)
    if (!findPerfil)
      throw new Error('No se encontro ningun perfil con el ID ', id)
    const respuesta = await PerfilesModel.findByIdAndUpdate(id, input, {
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

async function deletePerfil(id) {
  try {
    const findPerfil = await PerfilesModel.findById(id)
    if (!findPerfil)
      throw new Error('No se encontro ningun Perfil con el ID ', id)
    const respuesta = await PerfilesModel.findByIdAndDelete(id)
    return true
  } catch (error) {
    throw new Error('Error en la peticion de Eliminar Perfil por ID', error)
  }
}
module.exports = {
  getAllPerfiles,
  getPerfileByID,
  createPerfil,
  updatePerfil,
  deletePerfil,
}
