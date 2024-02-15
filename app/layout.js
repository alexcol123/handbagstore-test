import { Poppins } from 'next/font/google'
import './globals.css'

import NavBar from './components/nav/NavBar'
import Footer from './components/footer/Footer'
import CartProvider from '../providers/CartProvider'
import { Toaster } from 'react-hot-toast'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const dynamic = 'force-dynamic'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
})

//https://www.youtube.com/shorts/MYU_7RK3RHM

export const metadata = {
  title: 'Luxury Designer Handbags, Watches and more',
  description:
    'Experience luxury redefined at our online boutique, where sophistication meets style. Discover a curated selection of designer handbags, watches, and more, meticulously crafted for the modern trendsetter. Elevate your wardrobe with timeless elegance and unparalleled quality. Shop now and make a statement with [Your E-commerce Store Name]. ',

  openGraph: {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/carmen-handbag.appspot.com/o/pink.jpg?alt=media&token=836f1718-fbf2-4d9b-bf2e-7ebfe76483c0',
    ],
  },
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
          <CartProvider>
            <NavBar />
            <main className=' container mx-auto  mt-20 md:mt-36 '>
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
