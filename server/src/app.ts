import express from 'express'
import cors from 'cors'
import { config, connect } from './config'
import { routes } from './routes/routes'
import { authMiddleware } from './middlewares/auth'

const { port } = config
const app = express()

/* Parse request */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(authMiddleware)

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
