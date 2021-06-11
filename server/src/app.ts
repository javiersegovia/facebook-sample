import express from 'express'
import cors from 'cors'
import { config, connect } from './config'
import { routes } from './routes/routes'
import { authMiddleware } from './middlewares/auth'

const { hostname, port } = config
const app = express()

/* Parse request */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(authMiddleware)

app.listen(port, hostname, () => {
  console.info(`Server up at http://${hostname}:${port}`)
  connect()
  routes(app)
})
