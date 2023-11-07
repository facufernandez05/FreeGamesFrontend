'use client'

import { GamesCardDetail } from '@/components/GamesCard'
import { SelectSort } from '@/components/SelectSort'
import { ShuffledGames } from '@/components/ShuffledGames'
import { useFav } from '@/hooks/useFav'
import { useFetchFreeGames } from '@/hooks/useFetchAllGames'
import { useState } from 'react'

export default function AllGamesPage () {
  const [sort, setSort] = useState('relevance')
  const { favs } = useFav()
  const { games } = useFetchFreeGames(sort, 'all')

  return (
    <main className='flex flex-col justify-center max-w-5xl gap-4 p-4 mx-auto'>
      <h2 className='text-4xl font-bold'>All Free Games for PC and Browser In 2023!</h2>
      <p><strong>+300</strong> free games</p>
      <ShuffledGames games={games} />

      <section className='flex gap-2 items-center justify-end mt-6'>
        <p className='text-xl text-gray-400'>Sort By</p>
        <SelectSort sort={sort} setSort={setSort} />
      </section>

      <div className='bg-secondary h-0.5' />

      <div className='flex flex-col gap-4'>
        <ul className='grid grid-cols-3 gap-4 list-none'>
          {games.slice(0, 10).map((game) => {
            const isProductInFavs = favs.some(item => item.id === game.id)
            return (
              <GamesCardDetail key={game.id} game={game} isProductInFavs={isProductInFavs} />
            )
          })}
        </ul>
      </div>
    </main>
  )
}
