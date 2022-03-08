import mongoose from 'mongoose'
import dot from 'dotenv'
const dotenv = dot.config()
// Url de la db local
const urlDB = process.env.DB_ONLINE

//Conectar a la BD
const connectDB = async () => {
  const res = await mongoose.connect(urlDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  if (!res) console.log("Error can't connect")
  else console.log('DB Connected')
}

export default connectDB
