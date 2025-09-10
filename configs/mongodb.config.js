import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongoHost = process.env.MONGO_HOST
const mongoPort = process.env.MONGO_PORT
const mongoDb = process.env.MONGO_DB
const mongoUser = process.env.MONGO_DB_USER
const mongoPassword = process.env.MONGO_DB_PASSWORD

const mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDb}?authSource=admin`

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUrl)
        console.log('Conectado a la base de datos MongoDB con Mongoose')
    } catch (error) {
        console.error('Error de conexión:', error)
        process.exit(1)
    }
}

export { connectToMongo }