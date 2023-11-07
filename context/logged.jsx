'use client'

import { useRouter } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'

export const LoggedContext = createContext()

export function LoggedProvider ({ children }) {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const jwtToken = window.localStorage.getItem('token')
      if (jwtToken) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }
  }, [setLoggedIn])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      // El código aquí se ejecutará solo en el lado del cliente (navegador)
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('favs')
    }
    setLoggedIn(false)
    router.reload()
  }

  return (
    <LoggedContext.Provider value={{
      loggedIn,
      setLoggedIn,
      handleLogout
    }}
    >
      {children}
    </LoggedContext.Provider>
  )
}
