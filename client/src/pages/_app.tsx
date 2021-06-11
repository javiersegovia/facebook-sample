import '@styles/main.css'

import { createContext, useContext } from 'react'
import { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useAuth, IUserSession } from '@hooks/useAuth'
import { queryClient } from '@lib/query'
import { Nav } from '@components/Nav'

export const userContext = createContext<IUserSession>({
  user: null,
  loading: true,
})
export const useSession = () => useContext(userContext)
const UserProvider = userContext.Provider

const App = ({ Component, pageProps }: AppProps) => {
  const session = useAuth()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider value={session}>
          <Nav />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </UserProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
