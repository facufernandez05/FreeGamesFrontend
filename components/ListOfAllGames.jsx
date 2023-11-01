'use client'

import Image from 'next/image'
import { useFav } from '@/hooks/useFav'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { LoggedContext } from '@/context/logged'
import { useFetchFreeGames } from '@/hooks/useFetchAllGames'

export function ListOfAllGames () {
  const { favs } = useFav()
  const { games } = useFetchFreeGames()
  return (
    <main className='flex flex-col justify-center max-w-5xl gap-4 p-4 mx-auto'>
      <h2>Top Free Games for PC and Browser In 2023!</h2>
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

export function GamesCard ({ game, isProductInFavs }) {
  const { addToFavs, removeFromFavs } = useFav()
  const { loggedIn } = useContext(LoggedContext)
  return (
    <li className='max-w-xs' key={game.id}>
      <Image src={game.thumbnail} alt={game.title} width={200} height={200} priority className='object-cover w-full' />
      <section className='bg-[#32383E] p-4'>
        <h2>{game.title}</h2>
        <p className='text-gray-400'>{game.short_description}</p>
      </section>
      <footer>
        <Button onClick={() => {
          loggedIn
            ? isProductInFavs
              ? removeFromFavs(game)
              : addToFavs(game)
            : window.location.href = '/login'
        }}>
          {isProductInFavs ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>

      </footer>
    </li>
  )
}
