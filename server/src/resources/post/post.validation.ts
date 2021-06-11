import { object, string } from 'yup'

export const createPostValidation = object({
  body: object({
    content: string().required('El mensaje no puede estar vacío'),
    privacy: string().oneOf(['PUBLIC', 'PRIVATE']),
  }),
})

export const updatePostValidation = object({
  body: object({
    postId: string().required('El id del post a editar es obligatorio'),
    content: string().required('El mensaje no puede estar vacío'),
    privacy: string().oneOf(['PUBLIC', 'PRIVATE']),
  }),
})

export const deletePostValidation = object({
  body: object({
    postId: string().required('El id del post a eliminar es obligatorio'),
  }),
})
