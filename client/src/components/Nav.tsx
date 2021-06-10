import React from 'react'
import Link from 'next/link'
import { Container } from './Container'
import { useSession } from '@pages/_app'
import { firebase } from '@lib/firebase'

export const Nav = () => {
  const { user } = useSession()

  const signOut = () => {
    firebase.auth().signOut()
  }

  return (
    <div className="w-full text-gray-800">
      <Container className="flex items-center py-6">
        <Link href="/" passHref>
          <a className="font-bold">Logo</a>
        </Link>
        <div className="ml-auto flex divide-x divide-gray-400">
          {user ? (
            <>
              <div className="px-5">
                Hola, <strong className="text-blue-700">{user.email}</strong>
              </div>
              <button
                type="button"
                className="font-bold px-5"
                onClick={signOut}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link href="/login" passHref>
              <a className="font-bold">Iniciar sesión</a>
            </Link>
          )}
        </div>
      </Container>
    </div>
  )
}
