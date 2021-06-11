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

app.listen(port, hostname, () => {
  console.info(`Server up at http://${hostname}:${port}`)
  connect()
  routes(app)
})
