import express from 'express'
import cors from 'cors'
import { config, connect } from './config'
import { routes } from './routes/routes'
import { authMiddleware } from './middlewares/auth'

const { hostname, port } = config
const app = express()

/* Parse request */
console.log(0)
app.use(express.urlencoded({ extended: false }))
console.log(1)
app.use(express.json())
console.log(2)
app.use(cors())

console.log(3)

app.use(authMiddleware)
console.log(4)

try {
  app.listen(port, () => {
    console.info(`Server up at http://localhost:${port}`)
    connect()
    routes(app)
  })
} catch(e) {
  console.info('Error connecting to the API')
  console.info(e)
}
