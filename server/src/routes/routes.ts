import { Express } from 'express'

export const routes = (app: Express) => {
  app.get('/healthcheck', (req, res) => res.sendStatus(200))
}
