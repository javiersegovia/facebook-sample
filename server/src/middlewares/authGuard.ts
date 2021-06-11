import { Response, NextFunction } from 'express'
import { AuthRequest } from './auth'

const authGuard = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => (!req.currentUser ? res.sendStatus(403) : next())

export default authGuard
