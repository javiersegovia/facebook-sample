import { useMemo, useState } from 'react'
import { Post, IPost, PostPrivacy } from './Posts/Post'
import cx from 'classnames'

const posts: IPost[] = [
  {
    privacy: PostPrivacy.PUBLIC,
    message:
      'Public LoremLabore ullamco ullamco enim quis sit id commodo velit ullamco veniam laboris magna irure. Anim amet culpa ad ea nisi adipisicing laboris commodo. Elit qui anim reprehenderit aliquip ad sint veniam cupidatat sit aute ex veniam reprehenderit consectetur. Eiusmod pariatur culpa elit dolor laborum veniam reprehenderit ullamco reprehenderit.',
  },
  {
    privacy: PostPrivacy.PRIVATE,
    message:
      'Private LoremLabore ullamco ullamco enim quis sit id commodo velit ullamco veniam laboris magna irure. Anim amet culpa ad ea nisi adipisicing laboris commodo. Elit qui anim reprehenderit aliquip ad sint veniam cupidatat sit aute ex veniam reprehenderit consectetur. Eiusmod pariatur culpa elit dolor laborum veniam reprehenderit ullamco reprehenderit.',
  },
  {
    privacy: PostPrivacy.PRIVATE,
    message:
      'Private LoremLabore ullamco ullamco enim quis sit id commodo velit ullamco veniam laboris magna irure. Anim amet culpa ad ea nisi adipisicing laboris commodo. Elit qui anim reprehenderit aliquip ad sint veniam cupidatat sit aute ex veniam reprehenderit consectetur. Eiusmod pariatur culpa elit dolor laborum veniam reprehenderit ullamco reprehenderit.',
  },
  {
    privacy: PostPrivacy.PUBLIC,
    message:
      'Public LoremLabore ullamco ullamco enim quis sit id commodo velit ullamco veniam laboris magna irure. Anim amet culpa ad ea nisi adipisicing laboris commodo. Elit qui anim reprehenderit aliquip ad sint veniam cupidatat sit aute ex veniam reprehenderit consectetur. Eiusmod pariatur culpa elit dolor laborum veniam reprehenderit ullamco reprehenderit.',
  },
]

export const Feed = () => {
  const [filterBy, setFilterBy] = useState<PostPrivacy | null>(null)

  const updateFilter = (filterValue: PostPrivacy) => {
    setFilterBy((prev) => {
      if (prev === filterValue) return null
      return filterValue
    })
  }

  const filteredPosts = useMemo(() => {
    if (!filterBy) return posts

    return posts.filter((post) => filterBy === post.privacy)
  }, [filterBy])

  return (
    <section className="mt-10">
      <span className="text-sm">Filtrar por...</span>
      <div className="space-x-3 mb-5">
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
          Privado
        </button>
      </div>
      <div className="space-y-6 pb-10">
        {filteredPosts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </section>
  )
}
