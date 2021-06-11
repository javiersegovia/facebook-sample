import mongoose from 'mongoose'
import { config } from './config'

export const connect = () => {
  console.info('config.dbURL')
  console.info(config.dbURL)
  return mongoose
    .connect(config.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.info('Database connected')
    })
    .catch((error) => {
      console.error('Database error', error)
      process.exit(1)
    })
}
