import { Request } from 'express'
import admin from 'firebase-admin'
import { User, UserDocument } from '../resources/user/user.model'

admin.initializeApp({
  credential: admin.credential.cert('./fb-service-account.json'),
})

export const authMiddleware = async (req, _, next) => {
  const header = req.headers?.authorization

  if (
    header !== 'Bearer null' &&
    req.headers?.authorization?.startsWith('Bearer ')
  ) {
    const token = req.headers.authorization.split('Bearer ')[1]

    try {
      const tokenData = await admin.auth().verifyIdToken(token)

      if (tokenData?.uid) {
        req.currentUser = await User.findOne({
          uid: tokenData.uid,
        })
      }

    } catch (err) {
      console.log(err)
    }
  }

  next()
}

export interface AuthRequest extends Request {
  currentUser?: UserDocument
}
