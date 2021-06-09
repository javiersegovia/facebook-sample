import dotenv from 'dotenv'

dotenv.config()

const {
  SERVER_HOSTNAME = 'localhost',
  SERVER_PORT = 1337,
  DB_URL = 'mongodb://mongodb:27017',
} = process.env

export const config = {
  hostname: SERVER_HOSTNAME,
  port: Number(SERVER_PORT),
  dbURI: DB_URL,
}
