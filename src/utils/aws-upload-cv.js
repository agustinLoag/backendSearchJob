import dotenv from 'dotenv'
import AWS from 'aws-sdk'

dotenv.config()

//Configuracion de las variables de entorno
const ID = process.env.AWS_ID
const SECRETE = process.env.AWS_SECRET
const BUCKET = process.env.AWS_BUCKET_NAME

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRETE,
})

const awsUploadCV = async (file, filePath) => {
  // Se le pasan los parametros el filePath lugar donde se va alojar en nuestro bucket
  //file es el archivo a subir a nuestro bucket
  const params = { Bucket: BUCKET, Key: `${filePath}`, Body: file }

  try {
    const response = await s3.upload(params).promise()
    return response.Location
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

const awsUploadVideo = async (file, filePath) => {
  const params = { Bucket: BUCKET, Key: `${filePath}`, Body: file }

  try {
    const response = await s3.upload(params).promise()
    return response.Location
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export { awsUploadCV, awsUploadVideo }
