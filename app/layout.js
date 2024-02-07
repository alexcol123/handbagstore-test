import { Poppins } from 'next/font/google'
import './globals.css'

import NavBar from './components/nav/NavBar'
import Footer from './components/footer/Footer'
import CartProvider from '../providers/CartProvider'
import { Toaster } from 'react-hot-toast'
import { SpeedInsights } from '@vercel/speed-insights/next'
import NavSecondary from './components/nav/NavSecondary'

export const dynamic = 'force-dynamic'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
})

//https://www.youtube.com/shorts/MYU_7RK3RHM

export const metadata = {
  title: 'Layout comp Handbag page',
  description: 'Handbags description ',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />

        <link
          rel='icon'
          href='/icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />

        <link
          rel='apple-touch-icon'
          href='/apple-icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
      </head>

      <body className={poppins.className}>
        <div className='min-h-screen overflow-hidden flex flex-col justify-between'>
          <Toaster
            position='top-center'
            toastOptions={{ background: 'rgba(51 65 85) ', color: '#fff' }}
          />
          <div className='relative'>
            <CartProvider>
              <NavBar />
              <main className=' container mx-auto mt-36'>
                {children}
                <SpeedInsights />
              </main>
            </CartProvider>
            <Footer />
            <div className='fixed -bottom-2 left-0 right-0 bg-base-200 overflow-y-scroll '>
              <NavSecondary />
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
