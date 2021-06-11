import { Response } from 'express'
import { AuthRequest } from '../../middlewares/auth'
import {
  createPost,
  deletePost,
  getFeedPosts,
  isPostOwner,
  updatePost,
} from './post.service'

export const createPostController = async (req: AuthRequest, res: Response) => {
  try {
    const post = await createPost({ ...req.body, author: req.currentUser._id })

    return res.json(post)
  } catch (e) {
    return res.status(409).send(e.message)
  }
}

export const updatePostController = async (req: AuthRequest, res: Response) => {
  try {
    const isOwner = await isPostOwner(req.currentUser, req.body.postId)
    if (!isOwner) throw new Error('No estás autorizado')

    const post = await updatePost({ ...req.body })

    return res.json(post)
  } catch (e) {
    return res.status(409).send(e.message)
  }
}

export const getFeedController = async (req: AuthRequest, res: Response) => {
  try {
    const posts = await getFeedPosts(req.currentUser)

    return res.json(posts)
  } catch (e) {
    return res.status(409).send(e.message)
  }
}

export const deletePostController = async (req: AuthRequest, res: Response) => {
  try {
    const isOwner = await isPostOwner(req.currentUser, req.body.postId)
    if (!isOwner) throw new Error('No estás autorizado')

    const deletedPost = await deletePost(req.body.postId)
    return res.json(deletedPost)
  } catch (e) {
    return res.status(409).send(e.message)
  }
}
