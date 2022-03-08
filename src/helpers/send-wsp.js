import twilio from 'twilio'
import dotenv from 'dotenv'
//Configurar variables de entorno
dotenv.config()
//Variables de entorno para el envio de wsp
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken, {
  lazyLoading: true,
})

const sendWhatAppMessage = async input => {
  const { to } = input
  console.log('estamos aqui', input)

  try {
    const msg = await client.messages.create({
      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      from: '+15017122661',
      to: '+56988074111',
    })
    console.log(msg)
    return true
  } catch (error) {
    console.log('Error', error)
    return error.message
  }
}

export default sendWhatAppMessage
