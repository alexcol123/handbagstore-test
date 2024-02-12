//  import { products } from '../utils/products'
import Hero from './components/Hero'
import ProductCard from './components/products/ProductCard'
import { truncateText } from '../utils/truncateText'
import getProducts from '../actions/getProducts'
import NavBar from './components/nav/NavBar'
import NavSearch from './components/nav/NavSearch'
import NavSecondary from './components/nav/NavSecondary'
import getBanner from '@/actions/getBanner'

// webhook stripe = stripe listen --forward-to localhost:3000/api/stripe-webhook

export default async function Home({ searchParams }) {
  // Get Products
  // const products = await getProducts({ category: null })
  const products = await getProducts(searchParams)

  const banner = await getBanner()

  return (
    <div className=' relative max-w-screen-2xl mx-auto p-2 lg:p-1  '>
      <Hero
        opacity='50'
        title={banner?.heading ? banner.heading : 'Handbags Up to 70 % off'}
        body={banner?.text ? banner.text : '100% Original Products'}
        btnText='Start Saving'
        showButton={false}
        url={
          banner?.url
            ? banner.url
            : 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
      />

      <div className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-6 gap-8   '>
        {products?.map((product) => {
          // Hide product if stock is  0
          if (product.inStock < 1) return null
          else {
            return <ProductCard key={product.id} product={product} />
          }
        })}
      </div>
    </div>
  )
}
