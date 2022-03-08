import jwt from 'jsonwebtoken'

const generateJWT = async user => {
  const { id, mail, role, company } = user
  const payload = {
    id,
    mail,
    role,
    company,
  }

  return jwt.sign(payload, process.env.SECRETE_WORD_JWT, { expiresIn: '4h' })
}
export default generateJWT
