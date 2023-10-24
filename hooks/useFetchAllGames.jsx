'use client'

import { useEffect, useState } from 'react'

const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games'

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '1f6f0f2a38msh54a6201e7d3f259p1c035fjsnd5dfccb6b35d',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
}

export function useFetchAllGames () {
  const [allGames, setAllGames] = useState([])

  useEffect(() => {
    const fetchAllGames = () => {
      try {
        const response = fetch(url, options)
        if (response.ok) {
          const data = response.json()
          setAllGames(data)
        } else {
          console.error('Error en la respuesta de la API:', response.statusText)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    fetchAllGames()
  }, [])

  return { allGames }
}
