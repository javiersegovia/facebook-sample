import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@components/Button'
import { Input } from '@components/Forms/Input'
import { Select } from '@components/Forms/Select'

interface CreatePostFormValues {
  message: string
  // TODO: change privacy to type ENUM
  privacy: string
}

export const CreatePost = () => {
  const formMethods = useForm<CreatePostFormValues>()

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = formMethods

  const onSubmit = async (formData: CreatePostFormValues) => {
    const { message } = formData

    // TODO: save post to MongoDB Database
    // TODO: notification
  }
  return (
    <div className="w-full px-4 pt-5 pb-6 mt-8 mb-6 bg-white rounded-none shadow-md sm:rounded-lg">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            name="message"
            type="message"
            isTextArea
            validations={{
              required: {
                value: true,
                message: 'Por favor, ingresa un mensaje.',
              },
            }}
          />

          {/* <select name="privacy">
            <option value="value1">Value 1</option>
            <option value="value2" selected>
              Value 2
            </option>
            <option value="value3">Value 3</option>
          </select> */}
          <div className="flex items-center space-x-4">
            <Select
              className="w-auto ml-auto"
              name="privacy"
              options={['Público', 'Amigos']}
            />
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
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
