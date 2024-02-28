import '@styles/globals.css';
import Nav from '@components/Nav';
import Footer from '@components/Footer';
import AuthProvider from '@components/AuthProvider';

export const metadata = {
  title: 'ChefConnect',
  description: 'A Recipe Sharing Platform Built with Next.js',
  icons: { icon: '/favicon.ico' }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <main>
            <Nav />
            {children}
            <Footer />
          </main>
        </body>
      </AuthProvider>
    </html>
  )
}
