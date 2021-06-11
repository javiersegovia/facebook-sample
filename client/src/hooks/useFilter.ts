import { useMemo, useState } from 'react'

export const useFilter = <TFilter, TData extends any[]>(data: TData | undefined) => {
  const [filterBy, setFilterBy] = useState<TFilter | null>(null)

  const updateFilter = (filterValue: TFilter) => {
    setFilterBy((prev) => {
      if (prev === filterValue) return null
      return filterValue
    })
  }

  const filtered = useMemo(() => {
    if (!filterBy || !data) return data

    return data.filter((item) => filterBy === item.privacy)
  }, [data, filterBy])

  return { filterBy, filtered, updateFilter }
}
