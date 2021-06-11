import { Express } from 'express'
import { userRoutes } from '../resources/user/user.routes'
import { postRoutes } from '../resources/post/post.routes'

export const routes = (app: Express) => {
  app.get('/healthcheck', (req, res) => res.sendStatus(200))
  app.get('/hello', (req, res) => res.json({ hi: 'Hello world' }))

  userRoutes(app)
  postRoutes(app)
}
