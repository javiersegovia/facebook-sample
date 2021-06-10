import '@styles/main.css'

import { createContext, useContext } from 'react'
import type { AppProps } from 'next/app'
import { firebase } from '@lib/firebase'
import { Nav } from '@components/Nav'
import { useAuth } from '@hooks/useAuth'

export const userContext = createContext<{
  user: firebase.User | null
  loading: boolean
}>({ user: null, loading: true })

export const useSession = () => useContext(userContext)

const UserProvider = userContext.Provider

const App = ({ Component, pageProps }: AppProps) => {
  const { user, loading } = useAuth()

  return (
    <>
      <UserProvider value={{ user, loading }}>
        <Nav />
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}

export default App
