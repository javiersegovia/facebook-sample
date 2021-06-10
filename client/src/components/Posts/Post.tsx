export enum PostPrivacy {
  PUBLIC = 'Público',
  PRIVATE = 'Privado',
}

export interface IPost {
  message: string
  privacy: PostPrivacy
}

export const Post = ({ post }: { post: IPost }) => {
  const { message } = post
  return (
    <div className="px-4 py-5 bg-white shadow-md rounded-none sm:rounded-lg sm:px-6 flex flex-col">
      <div className="text-blue-700 font-bold">Lisa Simpson</div>
      <p className="my-5 text-gray-700 text-sm">{message}</p>
      <div className="ml-auto flex items-center space-x-2 text-sm">
        <button type="button" className="text-gray-700 font-bold">
          Editar
        </button>
        <button type="button" className="text-red-600 font-bold">
          Eliminar
        </button>
      </div>
    </div>
  )
}
