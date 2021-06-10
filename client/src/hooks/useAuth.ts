import { useEffect, useState } from 'react'
import { firebase } from '@lib/firebase'
import { useSession } from '@pages/_app'
import Router from 'next/router'

export const useAuth = () => {
  const [session, setSession] = useState(() => {
    const user = firebase.auth().currentUser

    return {
      user,
      loading: !user,
    }
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

/** This hook is used to restrain the access to certain areas of the app
 * If user is required, will redirect to login if there is no user
 * If user is NOT required, will redirect to home if there is a user already
 */

export const useRequiredAuth = (isRequired = true) => {
  const user = useSession()

  useEffect(() => {
    if (!user && isRequired) Router.push('/login')
    else if (user && !isRequired) Router.push('/')
  }, [user])
}
