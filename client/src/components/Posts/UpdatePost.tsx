import { Input } from '@components/Forms/Input'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { IPost } from './Post'
import { CreatePostFormValues } from './CreatePost'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

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
    console.log({ formData })
    updatePost(
      {
        ...formData,
        postId: post._id,
      },
      {
        onSuccess: async (updatedPost) => {
          await queryClient.setQueryData('/posts', (cache: IPost[] = []) => {
            const index = cache.findIndex(
              (post) => post._id === updatedPost._id
            )

            console.log(updatedPost)

            console.log({ cache, index })

            cache[index] = {
              // ...cache[index],
              ...updatedPost,
            }

            console.log({ cache })

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
