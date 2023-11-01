'use client'

import { useEffect, useState } from 'react'

const url = 'http://localhost:1337/api/auth/local/'

const options = {
  method: 'GET'
}

export function useFetchProfileData () {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const fetchProfileData = () => {
      try {
        const response = fetch(url, options)
        if (response.ok) {
          const data = response.json()
          setUserData(data)
        } else {
          console.error('Error en la respuesta de la API:', response.statusText)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    fetchProfileData()
  }, [])

  return { userData }
}
