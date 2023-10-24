'use client'

import { createContext, useEffect, useState } from 'react'

export const LoggedContext = createContext()

export function LoggedProvider ({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const jwtToken = localStorage.getItem('token')
    if (jwtToken) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [setLoggedIn])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
    window.location.reload()
  }

  return (
    <LoggedContext.Provider value={{
      loggedIn,
      setLoggedIn,
      handleLogout
    }}>
      {children}
    </LoggedContext.Provider>
  )
}
