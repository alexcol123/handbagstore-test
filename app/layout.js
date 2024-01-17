import { Poppins } from 'next/font/google'
import './globals.css'

import NavBar from './components/nav/NavBar'
import Footer from './components/footer/Footer'
import CartProvider from '../providers/CartProvider'
import { Toaster } from 'react-hot-toast'
import { SpeedInsights } from '@vercel/speed-insights/next'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
})


//https://www.youtube.com/shorts/MYU_7RK3RHM

export const metadata = {
  title: 'Layout comp Handbag page',
  description: 'Handbags description ',

  // openGraph: {
  //   images: './opengraph-image.png',
  // },
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <div className='min-h-screen overflow-hidden flex flex-col justify-between'>
          <Toaster
            position='top-center'
            toastOptions={{ background: 'rgba(51 65 85) ', color: '#fff' }}
          />
          <CartProvider>
            <NavBar />
            <main className=' container mx-auto mt-36'>
              {children}
              <SpeedInsights />
            </main>
          </CartProvider>
          <Footer />
        </div>
      </body>
    </html>
  )
}
