import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@components/Button'
import { firebase } from '@lib/firebase'
import { Input } from '@components/Forms/Input'

interface LoginFormValues {
  email: string
  password: string
}

export const emailValidationPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// This message could be an i18n one
const DEFAULT_LOGIN_ERROR_MESSAGE = 'Usuario o contraseña inválida'

export const LoginForm = () => {
  const [isSuccessful, setIsSuccessful] = useState(false)
  const formMethods = useForm<LoginFormValues>()

  const {
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = formMethods

  const onSubmit = async (formData: LoginFormValues) => {
    const { email, password } = formData

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      setIsSuccessful(true)
    } catch (e) {
      // We set the error in both fields just for security
      // (if the user is not the owner of the account, he wont know where the error is)
      setError('email', {
        message: DEFAULT_LOGIN_ERROR_MESSAGE,
      })
      setError('password', {
        message: DEFAULT_LOGIN_ERROR_MESSAGE,
      })
    }
  }

  return (
    <div className="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 bg-white rounded-none shadow-2xl sm:rounded-lg sm:w-10/12 md:w-6/12 lg:w-5/12 xl:w-5/12 sm:px-6">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            name="email"
            type="email"
            label="Correo electrónico"
            validations={{
              required: {
                value: true,
                message: 'Por favor, ingresa tu correo electrónico.',
              },
              pattern: {
                value: emailValidationPattern,
                message: 'Por favor, ingresa un correo válido.',
              },
            }}
          />
          <Input
            name="password"
            type="password"
            label="Contraseña"
            validations={{
              required: {
                value: true,
                message: 'Por favor, agrega tu contraseña',
              },
            }}
          />
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting || isSuccessful}
          >
            Ingresar
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
