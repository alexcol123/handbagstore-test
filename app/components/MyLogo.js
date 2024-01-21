import { Salsa } from 'next/font/google'

const salsa = Salsa({ subsets: ['latin'], weight: ['400'] })

const MyLogo = () => {
  return (
    <div className={salsa.className}>
      <span className='text-primary '> Handbag Store</span>
    </div>
  )
}

export default MyLogo
