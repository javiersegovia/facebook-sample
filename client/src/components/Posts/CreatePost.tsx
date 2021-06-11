import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@components/Button'
import { Input } from '@components/Forms/Input'
import { Select } from '@components/Forms/Select'
import { IPost } from './Post'

export interface CreatePostFormValues {
  content: string
  privacy: string
}

export const createPostRequest = (formData: CreatePostFormValues) =>
  axios.post<null, IPost>('/posts', formData)

export const CreatePost = () => {
  const queryClient = useQueryClient()
  const { mutate: createPost, isLoading } = useMutation(
    '/posts',
    createPostRequest
  )

  const formMethods = useForm<CreatePostFormValues>()
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = formMethods

  const onSubmit = async (formData: CreatePostFormValues) =>
    createPost(
      {
        ...formData,
      },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries('/posts')
          reset()
        },
      }
    )

  return (
    <div className="w-full px-4 pt-5 pb-6 mt-8 mb-6 bg-white rounded-none shadow-md sm:rounded-lg">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            name="content"
            type="text"
            placeholder="¿Qué estás pensando?"
            isTextArea
            validations={{
              required: {
                value: true,
                message: 'Por favor, ingresa un mensaje.',
              },
            }}
          />

          <div className="flex items-center space-x-4">
            <Select
              className="w-auto ml-auto"
              name="privacy"
              options={[
                {
                  value: 'PUBLIC',
                  label: 'Público',
                },
                {
                  value: 'PRIVATE',
                  label: 'Amigos',
                },
              ]}
            />
            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-auto px-5 ml-auto"
            >
              Publicar
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
