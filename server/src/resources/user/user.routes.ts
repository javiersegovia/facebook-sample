import { Express } from 'express'
import validate from '../../middlewares/validate'
import { addFriendController, createUserController } from './user.controller'
import { User } from './user.model'
import { addFriendValidation, createUserValidation } from './user.validation'

export const userRoutes = (app: Express) => {
  // todo: delete this route
  app.get('/users', async (req, res) => {
    const users = await User.find()
    return res.json(users)
  })

  // todo: delete this route
  app.delete('/users', async (req, res) => {
    const users = await User.deleteMany()
    return res.json(users)
  })

  app.post('/register', validate(createUserValidation), createUserController)
  app.post('/users/add-friend', validate(addFriendValidation), addFriendController)

  // app.post('/', (req, res) => res.sendStatus(200))
}
