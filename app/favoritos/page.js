'use client'

import { GamesCard } from '@/components/ListOfAllGames'
import { FavProvider } from '@/context/fav'
import { useFav } from '@/hooks/useFav'

export default function FavGames () {
  return (
      <main className='flex flex-col justify-center max-w-5xl gap-4 p-4 mx-auto'>
        <h2 className='text-4xl font-bold text-center text-palette-lightblue'>Favoritos</h2>
        <FavProvider>
          <ListOfFavGames />
        </FavProvider>
      </main>
  )
}

function ListOfFavGames () {
  const { favs } = useFav()

  return (
    <ul className='grid grid-cols-3 gap-2 list-none'>
    {favs.length > 0
      ? <GamesCard games={favs} />
      : <p>No tienes favoritos</p>
      }
    </ul>
  )
}
