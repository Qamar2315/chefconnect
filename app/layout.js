import '@styles/globals.css'

export const metadata = {
  title: 'ChefConnect',
  description: 'A Recipe Sharing Platform Built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <div className='gradient' />
        </div>
        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}
