const jwt = require('jsonwebtoken')

const generarJWT = async user => {
  const { id, nombre } = user
  const payload = {
    id,
    nombre,
  }

  return jwt.sign(payload, process.env.SECRETE_WORD_JWT, { expiresIn: '4h' })
}

module.exports = generarJWT
