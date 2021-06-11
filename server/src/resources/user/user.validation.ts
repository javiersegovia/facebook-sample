import { object, string } from 'yup'

export const createUserValidation = object({
  body: object({
    email: string()
      .email('El correo electrónico es inválido')
      .required('El correo electrónico es requerido'),
    password: string()
      .required('La contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres.')
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        'Hay un caracter inválido en tu contraseña.',
      ),
  }),
})

export const addFriendValidation = object({
  body: object({
    userId: string().required('El id del usuario no fue recibida'),
    friendId: string().required('El id del amigo a añadir no fue recibida'),
  }),
})
