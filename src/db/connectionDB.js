const mongoose = require('mongoose')

require('dotenv').config({ path: '.env' })
// Url de la db local
const urlDB = process.env.DB_URI

//Conectar a la BD
const connectDB = async () => {
  const res = await mongoose.connect(urlDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  if (!res) console.log("Error can't connect")
  else {
    console.log('DB Connected')
  }
}

module.exports = connectDB
