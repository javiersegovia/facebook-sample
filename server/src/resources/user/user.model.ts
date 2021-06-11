import mongoose from 'mongoose'

export interface UserDocument extends mongoose.Document {
  uid: string
  email: string
  name: string
  friends: string[]
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

const User = mongoose.model<UserDocument>('User', UserSchema)

export { User }
