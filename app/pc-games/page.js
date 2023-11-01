'use client'

import { GamesCard } from '@/components/ListOfAllGames'
import { useFav } from '@/hooks/useFav'
import { useFetchGamesByPlatform } from '@/hooks/useFetchGamesByPlatform'
import { shuffleArray } from '@/services/suffleArray'

export default function PcGames () {
  const { favs } = useFav()
  const { games } = useFetchGamesByPlatform('pc')
  const shuffledGames = shuffleArray(games)
  return (
    <main className='flex flex-col justify-center max-w-5xl gap-4 p-4 mx-auto'>
      <h2>Top Free Games for PC in 2023!</h2>
      <ul className='flex gap-4 list-none'>
      {shuffledGames.slice(0, 3).map((game) => {
        const isProductInFavs = favs.some(item => item.id === game.id)
        return (
        <GamesCard key={game.id} game={game} isProductInFavs={isProductInFavs} />
        )
      })}
      </ul>
      <h2>Top Free Games for PC in 2023!</h2>
      <ul className='grid justify-center grid-cols-3 gap-4 list-none'>
      {games.slice(0, 10).map((game) => {
        const isProductInFavs = favs.some(item => item.id === game.id)
        return (
        <GamesCard key={game.id} game={game} isProductInFavs={isProductInFavs} />
        )
      })}
      </ul>
    </main>
  )
}
