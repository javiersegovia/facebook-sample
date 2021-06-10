import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { firebase } from '@lib/firebase'
import { Button } from '@components/Button'
import { Input } from '@components/Forms/Input'
import { Container } from '@components/Container'
import { StrictAuth } from '@components/StrictAuth'

interface LoginFormValues {
  email: string
  password: string
}

// This message could be an i18n one
const DEFAULT_LOGIN_ERROR_MESSAGE = 'Usuario o contraseña inválida'

const LoginPage = () => {
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
      setError('email', {
        message: DEFAULT_LOGIN_ERROR_MESSAGE,
      })
      setError('password', {
        message: DEFAULT_LOGIN_ERROR_MESSAGE,
      })
    }
  }

  return (
    <StrictAuth isRequired={false}>
      <Container className="m-20">
        <div className="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 bg-white rounded-none shadow-2xl sm:rounded-lg sm:w-10/12 md:w-6/12 lg:w-5/12 xl:w-5/12 sm:px-6">
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                name="email"
                type="email"
                label="Correo electrónico"
                // TODO: add validations for invalid email address
                validations={{
                  required: {
                    value: true,
                    message: 'Por favor, ingresa tu correo electrónico.',
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
                isSuccess={isSuccessful}
              >
                Ingresar
              </Button>
            </form>
          </FormProvider>
        </div>
      </Container>
    </StrictAuth>
  )
}

export default LoginPage
