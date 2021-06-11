import axios from 'axios'
import cx from 'classnames'
import { useQuery } from 'react-query'
import { useSession } from '@pages/_app'
import { Post, IPost, PostPrivacy } from './Posts/Post'
import { Spinner } from './Spinner'
import { useFilter } from '@hooks/useFilter'

export const getPosts = () => axios.get<null, IPost[]>('/posts')

export const Feed = () => {
  const { user } = useSession()
  const { data, isLoading } = useQuery('/posts', getPosts, {
    retry: false,
  })

  const { filterBy, updateFilter, filtered } = useFilter<PostPrivacy, IPost[]>(
    data
  )

  return (
    <section className="mt-10">
      <span className="text-sm">Filtrar por...</span>
      <div className="mb-5 flex items-center w-full">
        <div className="space-x-3">
          <button
            type="button"
            className={cx({
              'font-bold underline': filterBy === PostPrivacy.PUBLIC,
            })}
            onClick={() => updateFilter(PostPrivacy.PUBLIC)}
          >
            Público
          </button>
          <button
            type="button"
            className={cx({
              'font-bold underline': filterBy === PostPrivacy.PRIVATE,
            })}
            onClick={() => updateFilter(PostPrivacy.PRIVATE)}
          >
            Amigos
          </button>
        </div>
        {isLoading && (
          <div className="ml-auto text-blue-600">
            <Spinner />
          </div>
        )}
      </div>
      <div className="space-y-6 pb-10">
        {filtered?.length ? (
          filtered.map((post) => (
            <Post
              key={post._id}
              post={post}
              isOwner={user?.uid === post.author?.uid}
            />
          ))
        ) : (
          <div className="text-gray-700 text-center mt-10">
            No se han encontrado posts.
          </div>
        )}
      </div>
    </section>
  )
}
