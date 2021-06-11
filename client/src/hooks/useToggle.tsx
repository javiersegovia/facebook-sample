import { useState } from 'react'

export const useToggle = (defaultState = false) => {
  const [state, setState] = useState(defaultState)

  const toggle = () => setState(!state)
  const setTrue = () => setState(true)
  const setFalse = () => setState(false)

  return [state, { toggle, setTrue, setFalse }] as const
}
