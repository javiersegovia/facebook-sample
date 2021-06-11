import { useEffect, useState } from 'react'
import { firebase } from '@lib/firebase'

export interface IUserSession {
  user: firebase.User | null
  loading: boolean
}

export const getToken = (user: firebase.User) => user.getIdToken() || null

export const useAuth = (): IUserSession => {
  const user = firebase.auth().currentUser

  const [session, setSession] = useState<IUserSession>({
    user,
    loading: !user,
  })

  const onAuthChange = (user: firebase.User | null) => {
    setSession({ loading: false, user })
  }

  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged(onAuthChange)
    return () => unsubscribeAuth()
  }, [])

  return session
}
