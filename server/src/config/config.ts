import dotenv from 'dotenv'

dotenv.config()

const {
  HOSTNAME = 'localhost',
  PORT = 1337,
  DB_URL = 'mongodb://mongodb:27017',
} = process.env

console.log(DB_URL)

export const config = {
  hostname: HOSTNAME,
  port: Number(PORT),
  dbURL: DB_URL,
}
