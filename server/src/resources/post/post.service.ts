import { DocumentDefinition } from 'mongoose'
import { UserDocument } from '../user/user.model'
import { Post, PostDocument } from './post.model'

export const createPost = (input: DocumentDefinition<PostDocument>) =>
  Post.create(input)

interface UpdatePostInput extends PostDocument {
  postId: string
}

export const updatePost = ({ postId, ...data }: UpdatePostInput) =>
  Post.findByIdAndUpdate(
    {
      _id: postId,
    },
    {
      ...data,
    },
    {
      new: true,
      lean: true,
    },
  ).populate('author', 'name uid')

export const getFeedPosts = (user: UserDocument) => {
  return Post.find({
    $or: [
      {
        privacy: 'PUBLIC',
      },
      {
        author: {
          $in: [...user.friends, user._id],
        },
      },
    ],
  })
    .sort('-createdAt')
    .populate('author', 'name uid')
}

export const deletePost = (postId: string) => {
  return Post.findByIdAndDelete(postId)
}

export const isPostOwner = async (
  user: UserDocument,
  postId: string,
): Promise<boolean> => {
  const post = await Post.findById(postId).populate('author', 'id')
  return post.author._id.equals(user._id)
}
