import '@styles/globals.css'
import Nav from '@components/Nav'

export const metadata = {
  title: 'ChefConnect',
  description: 'A Recipe Sharing Platform Built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className='app'>
          <Nav/>
          {children}
        </main>
      </body>
    </html>
  )
}
