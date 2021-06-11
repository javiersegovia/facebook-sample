import { Request, Response } from 'express'
import { addFriend, createUser } from './user.service'

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body)

    return res.json(user)
  } catch (e) {
    return res.status(409).send(e.message)
  }
}

export const addFriendController = async (req: Request, res: Response) => {
  try {
    await addFriend(req.body)
    return res.send(200)
  } catch (e) {
    return res.status(409).send(e.message)
  }
}
