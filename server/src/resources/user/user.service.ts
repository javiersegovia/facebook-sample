import admin from 'firebase-admin'
import { DocumentDefinition } from 'mongoose'
import { User, UserDocument } from './user.model'

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
  const user = await admin.auth().createUser(input)
  return User.create({ ...input, uid: user.uid })
}

export const addFriend = async (input: {
  userId: UserDocument['_id']
  friendId: UserDocument['_id']
}) => {
  const { userId, friendId } = input

  await User.findByIdAndUpdate(userId, {
    $push: {
      friends: friendId,
    },
  })

  await User.findByIdAndUpdate(friendId, {
    $push: {
      friends: userId,
    },
  })

  return true
}

export const deleteAllUsers = () => {
  return User.deleteMany()
}
