import apollo from 'apollo-server'
const { gql } = apollo
const typeDefs = gql`
  ##  ======================  ##
  ##        Tipos
  ##  ======================  ##
  type Users {
    id: ID
    name: String
    role: String
    mail: String
    password: String
    company: String
  }
  type WSP {
    id: ID
    body: String
    to: String
    from: String
  }
  type Vacancy {
    id: ID!
    title: String!
    state: String!
    location: String!
    maximun_rent: Float
    description: String!
    supervisor: Users!
    createdBy: Users!
  }
  type Candidates {
    id: ID!
    vacancy_Id: Vacancy
    state: String
    name: String
    telephone: String
    expected_income: Float
    cv_Link: String
    video_Link: String
    video_Results: [Video_Results]
  }
  type Video_Results {
    vote: String
    user: Users
  }
  type Profile {
    id: ID!
    telephone: String
    salary: Float
    cv_Link: Upload
    area: String
    keywords: [String]
    charge_level: String
  }
  type Questions {
    question: String
    type: String
    answers: [String]
    vacancyID: Vacancy
  }
  type Answers {
    userID: Users
    questionID: Questions
    answer: String
  }
  type Notes {
    note: String
    candidate: ID
    createdBy: ID
    vacancyId: ID
  }
  type Token {
    token: String
  }
  ##  ======================  ##
  ##        Inputs
  ##  ======================  ##
  ##  USUARIOS
  input LoginInput {
    email: String!
    password: String!
  }
  input UsersInput {
    name: String
    role: String!
    mail: String!
    password: String
    company: String
  }
  input UpdateUserInput {
    role: String
    mail: String
    company: String
  }
  #   VACANTES
  input QuestionInput {
    question: String
    type: String
    answer: [String]
  }
  input UpdateQuestionInput {
    question: String
    type: String
    answer: [String]
  }
  input VacancyInput {
    title: String!
    state: String!
    location: String!
    maximun_rent: Float
    description: String!
    supervisor: ID
    createdBy: ID
    questions: [QuestionInput]
  }
  input UpdateVacancyInput {
    title: String
    state: String
    location: String
    maximun_rent: Float
    description: String
    supervisor: ID
    createdBy: ID
  }
  #   PERFILES
  input ProfileInput {
    telephone: String
    salary: Float
    cv_Link: String
    area: String
    keywords: [String]
    charge_level: String
  }
  input UpdateProfileInput {
    telephone: String
    salary: Float
    cv_Link: String
    area: String
    keywords: [String]
    charge_level: String
  }
  input NotesInput {
    note: String
    candidate: ID
    createdBy: ID
    vacancyId: ID
  }
  input Video_ResultsInput {
    vote: String
    user: ID
  }
  input AnswersInput {
    userID: ID
    questionID: ID
    answer: String
  }
  input CandidateInput {
    vacancy_Id: ID!
    state: String
    name: String
    telephone: String
    expected_income: Float
    cv_Link: String
    video_Link: String
    video_Results: [Video_ResultsInput]
  }
  input UpdateCandidateInput {
    notes: [NotesInput]
  }

  ##  USUARIOS
  input WSPInput {
    to: String
  }

  ##  ======================  ##
  ##    CONEXION con el resolver
  ##  ======================  ##
  type Query {
    getUsers: [Users]
    getUserID(id: ID): Users
    getVacancies(state: String, search: String): [Vacancy]
    getVacancyID(id: ID!): Vacancy
    getProfiles: [Profile]
    getProfileID(id: ID): Profile
    getCandidates: [Candidates]
    getCandidateID(id: ID): Candidates
    getCandidatesVacancy(
      id: ID
      state: String
      search: String
      renta: Float
    ): [Candidates]
    getHistoryVacancies(name: String): [Candidates]
  }
  type Mutation {
    #Usuarios
    registerUsers(input: UsersInput): Users
    updateUser(id: ID!, input: UpdateUserInput): Users
    deleteUser(id: ID!): Boolean
    login(input: LoginInput): Token

    #Vacantes
    registerVacancy(input: VacancyInput): Vacancy
    updateVacancy(id: ID!, input: UpdateVacancyInput): Vacancy
    deleteVacancy(id: ID!): Boolean
    #Perfiles
    registerProfile(input: ProfileInput): Profile
    deleteProfile(id: ID!): Boolean
    #Candidatos o Postulantes
    registerCandidate(input: CandidateInput): Candidates
    deleteCandidate(id: ID!): Boolean
    #Enviar el WSP
    sendWhatsApp(input: WSPInput): Boolean
  }
`
export default typeDefs
