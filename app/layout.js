import Header from '@/components/Header'
import './globals.css'
import { LoggedProvider } from '@/context/logged'
import { LoadingProvider } from '@/context/loading'
import { FavProvider } from '@/context/fav'

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Free to play Games</title>
        <meta charSet="UTF-8" />
      </head>
      <body cz-shortcut-listen='false'>
        <LoadingProvider>
          <LoggedProvider>
            <FavProvider>
              <Header />
              {children}
            </FavProvider>
          </LoggedProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
