import jwt from 'jsonwebtoken'

const verifyUser = async req => {
  try {
    let user
    const bearerHeader = req.headers.authorization
    if (bearerHeader) {
      const token = bearerHeader.replace('Bearer ', '')
      const payload = jwt.verify(token, process.env.SECRETE_WORD_JWT)
      user = payload
      return user
    }
  } catch (error) {
    console.log('####Error', error)
    throw new Error('Token no valido')
  }
}
export default verifyUser
