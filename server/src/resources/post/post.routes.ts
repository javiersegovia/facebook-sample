import { Express } from 'express'
import authGuard from '../../middlewares/authGuard'
import validate from '../../middlewares/validate'
import {
  createPostController,
  deletePostController,
  getFeedController,
  updatePostController,
} from './post.controller'
import { createPostValidation, deletePostValidation, updatePostValidation } from './post.validation'

export const postRoutes = (app: Express) => {
  app.get('/posts', authGuard, getFeedController)

  app.post(
    '/posts',
    authGuard,
    validate(createPostValidation),
    createPostController,
  )
  
  app.put(
    '/posts',
    authGuard,
    validate(updatePostValidation),
    updatePostController,
  )

  app.delete(
    '/posts',
    authGuard,
    validate(deletePostValidation),
    deletePostController,
  )
}
