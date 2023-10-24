'use client'

import Image from 'next/image'
import { games } from '@/mocks/games.json'
import { useFav } from '@/hooks/useFav'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { LoggedContext } from '@/context/logged'

export function ListOfAllGames () {
  return (
    <main className='grid justify-center grid-cols-3 gap-4'>
      <GamesCard games={games} />
    </main>
  )
}

export function GamesCard ({ games }) {
  const { addToFavs, favs, removeFromFavs } = useFav()
  const { loggedIn } = useContext(LoggedContext)
  const checkProductInFavs = product => {
    return favs.some(item => item.id === product.id)
  }
  return (
    <>
    {games.slice(0, 5).map((game) => {
      const isProductInFavs = checkProductInFavs(game)
      return (
        <div className='max-w-xs' key={game.id}>
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

        </div>
      )
    })}
    </>
  )
}
