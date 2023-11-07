'use client'

import { API_URL } from '@/services/api/API_URL'
import { useEffect, useState } from 'react'

const url = `${API_URL}/api/users/me`

export function useFetchProfileData () {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (typeof window !== 'undefined') {
          const token = window.localStorage.getItem('token')
          await fetch(url, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => setUserData(data))
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    fetchProfileData()
  }, [])

  return { userData }
}
