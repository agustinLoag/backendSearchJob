const { gql } = require('apollo-server')

const typeDefs = gql`
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

  type Pregunta {
    pregunta: String
    tipo: String
    respuesta: [String]
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
  input VacanteInput {
    titulo: String!
    estado: String!
    ubicacion: String!
    renta_Maxima: Float
    descripcion: String!
    preguntas: [String]
    encargado: ID
  }

  input ActualizarVacanteInput {
    titulo: String
    estado: String
    ubicacion: String
    renta_Maxima: Float
    descripcion: String
    preguntas: [String]
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
  ##CONEXION con el resolver

  type Query {
    getUsuarios: [Usuario]
    getVacantes: [Vacante]
    getPerfiles: [Perfil]
    getVacanteID(id: ID!): Vacante
    getUsuarioID(id: ID): Usuario
    getPerfilID(id: ID): Perfil
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
  }
`

module.exports = typeDefs
