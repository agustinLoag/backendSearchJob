const { gql } = require('apollo-server')

const typeDefs = gql`
  #Tipos de Esquemas
  type Usuario {
    id: ID
    rol: String
    mail: String
    contrasena: String
    empresa: String
  }
  type Vacante {
    id: ID!
    titulo: String!
    estado: String!
    ubicacion: String!
    renta_Maxima: Float
    descripcion: String!
    preguntas: [Pregunta]
    encargado: Usuario!
  }
  type Postulantes {
    id: ID!
    vacante_Id: Vacante!
    estado: String
    nombre: String
    numero: String
    renta_Esperada: Float
    respuestas: [Respuestas]
    cv: String
    notas: [Notas]
    video_Results: [Video_Results]
  }

  type Pregunta {
    pregunta: String
    tipo: String
    respuesta: [String]
  }

  type Respuestas {
    pregunta: String
    respuesta: String
  }

  type Notas {
    mensaje: String
    user: ID
    hora: String
  }
  type Video_Results {
    vote: Boolean
    user: ID
  }

  type Perfil {
    id: ID!
    telefono: String
    sueldo: Float
    cV: String
    area: String
    palabras_Clave: [String]
    nivel_Cargo: String
    video: String
  }

  type Token {
    token: String
  }

  ##Inputs para REALIZAR LAS PETICIONES PUT,PATCH,DELETE
  ##Usuarios
  input LoginInput {
    email: String!
    password: String!
  }

  input UsuarioInput {
    rol: String!
    mail: String!
    contrasena: String
    empresa: String
  }

  input ActulizarUsuarioInput {
    rol: String
    mail: String
    empresa: String
  }

  #Vacantes
  input PreguntaInput {
    pregunta: String
    tipo: String
    respuesta: [String]
  }

  input ActualizarPreguntaInput {
    pregunta: String
    tipo: String
    respuesta: [String]
  }
  input VacanteInput {
    titulo: String!
    estado: String!
    ubicacion: String!
    renta_Maxima: Float
    descripcion: String!
    preguntas: [PreguntaInput]
    encargado: ID
  }

  input ActualizarVacanteInput {
    titulo: String
    estado: String
    ubicacion: String
    renta_Maxima: Float
    descripcion: String
    preguntas: [ActualizarPreguntaInput]
    encargado: ID
  }

  #Perfiles
  input PerfilInput {
    telefono: String
    sueldo: Float
    cV: String
    area: String
    palabras_Clave: [String]
    nivel_Cargo: String
    video: String
  }

  input ActualizarPerfilInput {
    telefono: String
    sueldo: Float
    cV: String
    area: String
    palabras_Clave: [String]
    nivel_Cargo: String
    video: String
  }
  #Postulantes

  input NotasInput {
    mensaje: String
    user: ID
    hora: String
  }

  input Video_ResultsInput {
    vote: Boolean
    user: ID
  }

  input RespuestasInput {
    pregunta: String
    respuesta: String
  }

  input PostulanteInput {
    vacante_Id: ID!
    estado: String
    nombre: String
    numero: String
    renta_Esperada: Float
    respuestas: RespuestasInput
    cv: String
    notas: [NotasInput]
    video_Results: [Video_ResultsInput]
  }

  input ActualizarPostulanteInput {
    cv: String
    notas: [NotasInput]
    video_Results: [Video_ResultsInput]
  }
  ##CONEXION con el resolver

  type Query {
    getUsuarios: [Usuario]
    getVacantes: [Vacante]
    getPerfiles: [Perfil]
    getVacanteID(id: ID!): Vacante
    getUsuarioID(id: ID): Usuario
    getPerfilID(id: ID): Perfil
    getPostulantes: [Postulantes]
    getPostulantesID(id: ID): Postulantes
  }

  type Mutation {
    #Usuarios
    registroUsuarios(input: UsuarioInput): Usuario
    eliminarUsuario(id: ID!): Boolean
    actualizarUsuario(id: ID!, input: ActulizarUsuarioInput): Usuario
    login(input: LoginInput): Token
    logout(input: LoginInput): Token
    #Vacantes
    registroVacantes(input: VacanteInput): Vacante
    actualizarVacante(id: ID!, input: ActualizarVacanteInput): Vacante
    eliminarVacante(id: ID!): Boolean
    #Perfiles
    registroPerfiles(input: PerfilInput): Perfil
    eliminarPerfil(id: ID!): Boolean
    #Postulantes
    registroPostulantes(input: PostulanteInput): Postulantes
    actualizarPostulante(id: ID!, input: ActualizarPostulanteInput): Postulantes
    eliminarPostulante(id: ID!): Boolean
  }
`

module.exports = typeDefs
