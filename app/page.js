'use client'

import { ListOfAllGames } from '@/components/ListOfAllGames'
import { FavProvider } from '@/context/fav'

export default function Home () {
  return (
   <FavProvider>
    <ListOfAllGames />
   </FavProvider>
  )
}
