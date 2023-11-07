'use client'

import { useFav } from '@/hooks/useFav'
import { useFetchFreeGames } from '@/hooks/useFetchAllGames'
import { GamesCard, GamesCardInline } from './GamesCard'
import { shuffleArray } from '@/services/shuffleArray'
import { ArrowRight } from '@mui/icons-material'
import Link from 'next/link'

export function ListOfAllGames () {
  const { favs } = useFav()
  const { games } = useFetchFreeGames('release-date', 'all')
  const shuffledGames = shuffleArray(games)
  const { games: popularityGames } = useFetchFreeGames('popularity', 'all')

  return (
    <main className='flex flex-col justify-center max-w-5xl gap-4 p-4 mx-auto'>
      <h2 className='text-2xl font-bold md:text-4xl'>Top Free Games for PC and Browser In 2023!</h2>
      <p><strong>+300</strong> free games</p>
      <ul className='flex gap-4 list-none'>
        {shuffledGames.slice(0, 3).map((game) => {
          const isProductInFavs = favs.some(item => item.id === game.id)
          return (
            <GamesCard key={game.id} game={game} isProductInFavs={isProductInFavs} />
          )
        })}
      </ul>

      <div className='h-1 bg-secondary' />

      <div className='flex flex-col'>

        <section className='flex justify-between gap-6 max-md:flex-col-reverse'>

          <ul className='flex flex-col w-full gap-4 list-none md:w-2/3'>
            <h2 className='text-lg font-bold md:text-2xl'>Recently Added</h2>
            {games.slice(0, 7).map((game) => {
              const isProductInFavs = favs.some(item => item.id === game.id)
              return (
                <GamesCardInline key={game.id} game={game} isProductInFavs={isProductInFavs} />
              )
            })}
            <footer className='flex justify-end'>
              <Link href='/games' className='flex items-center gap-2 p-2 text-lg font-bold text-blue-400 border border-blue-400 hover:border-blue-600 hover:text-blue-600'>
                More Games <ArrowRight />
              </Link>
            </footer>
          </ul>

          <ul className='flex flex-col gap-4 list-none max-md:grid max-md:grid-cols-2'>
          <h2 className='text-2xl font-bold'>Most Popular</h2>
            {popularityGames.slice(0, 5).map((game) => (
              <GamesCard key={game.id} game={game} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
