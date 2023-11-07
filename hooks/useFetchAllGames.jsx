'use client'

// import { LoadingContext } from '@/context/loading'
import { useEffect, useState } from 'react'

const API_BASE_URL = 'https://free-to-play-games-database.p.rapidapi.com/api/games'

export function useFetchFreeGames (sort, platform) {
  const [games, setGames] = useState([])
  // const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1f6f0f2a38msh54a6201e7d3f259p1c035fjsnd5dfccb6b35d',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    }
    const fetchFreeGames = async () => {
      try {
        await fetch(`${API_BASE_URL}?sort-by=${sort}&platform=${platform}`, requestOptions)
          .then(response => response.json())
          .then(data => setGames(data))
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }
    fetchFreeGames()
  }, [sort, platform])

  return { games }
}

export function useFetchFreeGamesByCategory (sort, platform, category) {
  const [games, setGames] = useState([])
  // const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1f6f0f2a38msh54a6201e7d3f259p1c035fjsnd5dfccb6b35d',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    }
    const fetchFreeGames = async () => {
      try {
        await fetch(`${API_BASE_URL}?sort-by=${sort}&platform=${platform}&category=${category}`, requestOptions)
          .then(response => response.json())
          .then(data => setGames(data))
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }
    fetchFreeGames()
  }, [sort, platform, category])

  return { games }
}
