'use client'

import { useEffect, useState } from 'react'

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '1f6f0f2a38msh54a6201e7d3f259p1c035fjsnd5dfccb6b35d',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
}

export function useFetchGamesByCategory (category) {
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchFreeGames = async () => {
      try {
        await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options)
          .then(response => response.json())
          .then(data => setGames(data))
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    fetchFreeGames()
  }, [category])

  console.log(games)

  return { games }
}
