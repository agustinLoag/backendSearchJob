const PostulantesVacanteModel = require('../models/postulantesVacanteModel')

async function getAllPostulantes() {
  const postulantes = await PostulantesVacanteModel.find()

  if (!postulantes) throw new Error('No se han obtenido postulantes')
  if (postulantes.length === 0) throw new Error('No hay elementos a mostrar')

  try {
    return postulantes
  } catch (error) {
    throw new Error('Error en la peticion de obtener vacantes', error)
  }
}

async function getPostulantesByID(id) {
  const postulante = await PostulantesVacanteModel.findById(id)
  if (!postulante) throw new Error('No se han obtenido postulante')
  if (postulante.length === 0) throw new Error('No hay elementos a mostrar')

  try {
    return postulante
  } catch (error) {
    throw new Error('Error en la peticion de obtener vacante por ID', error)
  }
}

async function createPostulantes(input) {
  console.log(input)
  const newPostulante = input
  try {
    const postulante = new PostulantesVacanteModel(newPostulante)
    postulante.save()
    return postulante
  } catch (error) {
    console.log(error)
    throw new Error('Error al registrar el vacante', error)
  }
}

async function updatePostulantes(input, id) {
  try {
    const findPostulante = await PostulantesVacanteModel.findById(id)
    if (!findPostulante)
      throw new Error('No se encontro ningun usuario con el ID ', id)
    const respuesta = await PostulantesVacanteModel.findByIdAndUpdate(
      id,
      input,
      {
        new: true,
      },
    )
    return respuesta
  } catch (error) {
    console.log(error)
    throw new Error(
      'Error en la peticion de Actualizar una vacante por ID',
      error,
    )
  }
}
async function deletePostulantes(id) {
  try {
    const findPostulante = await PostulantesVacanteModel.findById(id)
    if (!findPostulante)
      throw new Error('No se encontro ningun Vacante con el ID ', id)
    const respuesta = await PostulantesVacanteModel.findByIdAndDelete(id)
    return true
  } catch (error) {
    throw new Error('Error en la peticion de Eliminar Vacante por ID', error)
  }
}

module.exports = {
  getAllPostulantes,
  getPostulantesByID,
  createPostulantes,
  updatePostulantes,
  deletePostulantes,
}
