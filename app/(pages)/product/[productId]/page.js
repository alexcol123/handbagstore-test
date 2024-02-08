import ListRating from './ListRating'
import ProductDetails from './ProductDetails'
import getProductsById from '../../../../actions/getProductById'
import AddRating from './AddRating'
import getCurrentUser from '@/actions/getCurrentUser'



export const dynamic = 'force-dynamic'

// MORE ABOUT METADATA https://www.youtube.com/shorts/MYU_7RK3RHM

export const metadata = {
  title: 'Handbag Store',
  description: 'Handbags at the best prices buy today',
  metadataBase: new URL('https://handbagstore-test-3.vercel.app'),

  openGraph: {
    images: [
      {
        url: 'https://images.pexels.com/photos/1204464/pexels-photo-1204464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
  },
}

const ProductPage = async ({ params }) => {

let productId = params.productId
const user = await getCurrentUser()

console.log(user)

  const product = await getProductsById(productId)

  if (!product || product === undefined)
    return (
      <h2 className='w-full flex items-center justify-center font-bold mt-8'>
        That product is no longer available
      </h2>
    )

  return (
    <div className='p-4 md:p-2'>
      <ProductDetails product={product} />
      <div className='flex flex-col mt-20 gap-4'>
    

        {/* Next share */}

        <AddRating product={product} user={user} />

        <ListRating product={product} />
      </div>
    </div>
  )
}

export default ProductPage
