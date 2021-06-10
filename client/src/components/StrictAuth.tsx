import { useSession } from '@pages/_app'
import Router from 'next/router'

interface StrictAuthProps {
  isRequired?: boolean
  children: React.ReactNode
}

export const StrictAuth = ({
  isRequired = true,
  children,
}: StrictAuthProps) => {
  const { user, loading } = useSession()

  if (loading) return null

  if (isRequired && !user) {
    Router.push('/login')
    return null
  }

  if (!isRequired && user) {
    Router.push('/')
    return null
  }

  return <>{children}</>
}
