import axios from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Input } from '@components/Forms/Input'
import { CreatePostFormValues } from './CreatePost'
import { IPost } from './Post'

interface UpdatePostProps {
  post: IPost
  closeUpdate: () => void
}

interface UpdatePostFormValues extends CreatePostFormValues {
  postId: string
}

export const updatePostRequest = (formData: UpdatePostFormValues) =>
  axios.put<null, IPost>('/posts', formData)

export const UpdatePost = ({ post, closeUpdate }: UpdatePostProps) => {
  const queryClient = useQueryClient()
  const { mutate: updatePost, isLoading } = useMutation(
    '/posts',
    updatePostRequest
  )

  const formMethods = useForm<CreatePostFormValues>({
    defaultValues: {
      content: post.content,
      privacy: post.privacy,
    },
  })
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = formMethods

  const onSubmit = async (formData: CreatePostFormValues) => {
    updatePost(
      {
        ...formData,
        postId: post._id,
      },
      {
        onSuccess: (updatedPost) => {
          queryClient.setQueryData('/posts', (cache: IPost[] = []) => {
            const index = cache.findIndex(
              (post) => post._id === updatedPost._id
            )

            cache[index] = {
              ...cache[index],
              ...updatedPost,
            }

            return cache
          })
          closeUpdate()
        },
      }
    )
  }
  return (
    <div className="mt-4">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            name="content"
            type="text"
            isTextArea
            validations={{
              required: {
                value: true,
                message: 'Por favor, ingresa un mensaje.',
              },
            }}
          />

          <div className="flex items-center justify-end space-x-2 text-sm">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="text-gray-700 font-bold"
            >
              Guardar
            </button>
            <button
              type="button"
              disabled={isSubmitting || isLoading}
              className="text-red-600 font-bold"
              onClick={closeUpdate}
            >
              Cancelar
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
