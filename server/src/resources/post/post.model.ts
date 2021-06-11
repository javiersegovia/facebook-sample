import mongoose from 'mongoose'
import { UserDocument } from '../user/user.model'

export interface PostDocument extends mongoose.Document {
  privacy: string
  author: UserDocument
  content: string
  createdAt: Date
  updatedAt: Date
}

//todo: add privacy

const PostSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    privacy: { type: String, required: true },
  },
  { timestamps: true },
)

const Post = mongoose.model<PostDocument>('Post', PostSchema)

export { Post }
