'use client'

import { GamesCardDetail } from '@/components/GamesCard'
import { useFav } from '@/hooks/useFav'

export default function Profile () {
  const { favs } = useFav()
  return (
    <main>
      <section className='flex flex-col justify-center max-w-5xl gap-4 p-4 mx-auto'>
        <h2 className='text-3xl font-bold'>Favoritos</h2>
        {favs.length > 0
          ? (
            <ListOfFavGames favs={favs} />
            )
          : <p>No tienes juegos en tus favoritos</p>}
      </section>
    </main>
  )
}

function ListOfFavGames ({ favs }) {
  return (
    <ul className='grid justify-center grid-cols-3 gap-4 list-none'>
      {favs.map((game) => {
        const isProductInFavs = favs.some(item => item.id === game.id)
        return (
          <GamesCardDetail game={game} key={game.id} isProductInFavs={isProductInFavs} />
        )
      }
      )}
    </ul>
  )
}
