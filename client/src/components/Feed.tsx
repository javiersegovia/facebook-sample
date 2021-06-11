import { useMemo, useState } from 'react'
import axios from 'axios'
import cx from 'classnames'
import { useSession } from '@pages/_app'
import { Post, IPost, PostPrivacy } from './Posts/Post'
import { useQuery } from 'react-query'
import { Spinner } from './Spinner'

export const getPosts = () => axios.get<null, IPost[]>('/posts')

export const Feed = () => {
  const { user } = useSession()
  const { data, isLoading } = useQuery('/posts', getPosts)

  const [filterBy, setFilterBy] = useState<PostPrivacy | null>(null)

  const updateFilter = (filterValue: PostPrivacy) => {
    setFilterBy((prev) => {
      if (prev === filterValue) return null
      return filterValue
    })
  }

  const filteredPosts = useMemo(() => {
    if (!filterBy || !data) return data

    return data.filter((post) => filterBy === post.privacy)
  }, [data, filterBy])

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
        {isLoading && <div className="ml-auto text-blue-600">
          <Spinner />
        </div>}
      </div>
      <div className="space-y-6 pb-10">
        {filteredPosts?.length ? (
          filteredPosts.map((post, index) => (
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
