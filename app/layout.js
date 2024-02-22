import '@styles/globals.css'
import Nav from '@components/Nav'
import Footer from '@components/Footer'
import Provider from '@components/Provider'

export const metadata = {
  title: 'ChefConnect',
  description: 'A Recipe Sharing Platform Built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main>
            <Nav />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  )
}
