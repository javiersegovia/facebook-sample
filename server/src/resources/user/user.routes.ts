import { Express } from 'express'
import validate from '../../middlewares/validate'
import { addFriendController, createUserController } from './user.controller'
import { User } from './user.model'
import { addFriendValidation, createUserValidation } from './user.validation'

export const userRoutes = (app: Express) => {
  app.post('/register', validate(createUserValidation), createUserController)
  app.post('/users/add-friend', validate(addFriendValidation), addFriendController)
}
