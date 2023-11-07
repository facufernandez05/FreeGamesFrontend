'use client'

import { shuffleArray } from '@/services/shuffleArray'
import { useEffect, useState } from 'react'
import { GamesCard } from './GamesCard'

export function ShuffledGames ({ games }) {
  const [shuffledGames, setShuffledGames] = useState([])

  useEffect(() => {
    setShuffledGames(shuffleArray(games))
  }, [games])

  return (
    <ul className='flex gap-4 list-none'>
      {shuffledGames?.slice(0, 3)?.map((game) => (
        <GamesCard key={game.id} game={game} />
      ))}
    </ul>
  )
}
