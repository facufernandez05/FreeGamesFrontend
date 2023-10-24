import Header from '@/components/Header'
import './globals.css'
import { LoggedProvider } from '@/context/logged'
import { LoadingProvider } from '@/context/loading'

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
            <Header />
            {children}
          </LoggedProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
