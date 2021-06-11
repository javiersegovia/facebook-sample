import { useToggle } from '@hooks/useToggle'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { UpdatePost } from './UpdatePost'

export enum PostPrivacy {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface IPost {
  _id: string
  content: string
  privacy: PostPrivacy
  author: {
    name: string
    uid: string
  }
}

interface PostProps {
  post: IPost
  isOwner: boolean
}

const deletePostRequest = (postId: string) =>
  axios.delete<null, IPost>('/posts', {
    data: { postId },
  })

export const Post = ({ post, isOwner }: PostProps) => {
  const { author, content } = post

  console.log({ post })

  const [isDeleting, { setTrue: setDeletingTrue, setFalse: setDeletingFalse }] =
    useToggle(false)

  const [isUpdating, { setTrue: setUpdatingTrue, setFalse: setUpdatingFalse }] =
    useToggle(false)

  const queryClient = useQueryClient()
  const { mutate: deletePost } = useMutation('/posts', deletePostRequest)

  const onDelete = () =>
    deletePost(post._id, {
      onSuccess: () => queryClient.refetchQueries('/posts'),
    })

  return (
    <div className="px-4 py-5 bg-white shadow-md rounded-none sm:rounded-lg sm:px-6 flex flex-col relative overflow-hidden">
      <div className="text-blue-700 font-bold">{author.name}</div>

      {isUpdating ? (
        <UpdatePost post={post} closeUpdate={setUpdatingFalse} />
      ) : (
        <>
          <p className="my-5 text-gray-700 text-sm">{content}</p>
          {isOwner && (
            <div className="ml-auto flex items-center space-x-2 text-sm">
              <button
                type="button"
                className="text-gray-700 font-bold"
                onClick={setUpdatingTrue}
              >
                Editar
              </button>
              <button
                type="button"
                className="text-red-600 font-bold"
                onClick={setDeletingTrue}
              >
                Eliminar
              </button>
            </div>
          )}
          {isDeleting && (
            <section className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-90">
              <div>
                ¿Estás seguro de eliminar este post?
                <div className="flex justify-center items-center space-x-4 mt-2">
                  <button
                    type="button"
                    className="text-red-600 font-bold underline"
                    onClick={onDelete}
                  >
                    Sí, eliminar
                  </button>
                  <button
                    type="button"
                    className="text-gray-600 font-bold underline"
                    onClick={setDeletingFalse}
                  >
                    No, cancelar
                  </button>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
