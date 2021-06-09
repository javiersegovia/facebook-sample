import express from 'express'
import { config, connect } from './config'
import { routes } from './routes/routes'

const { hostname, port } = config
const app = express()

/* Parse request */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.listen(port, hostname, () => {
  console.info(`Server up at http://${hostname}:${port}`)
  connect()
  routes(app)
})
