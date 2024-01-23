import { products } from '../../../../utils/products'
import ListRating from './ListRating'
import ProductDetails from './ProductDetails'

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

const ProductPage = ({ params }) => {
  const product = products.find((p) => p.id === params.productId)

  // console.log(product)

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
        <div>Add Rating</div>
        {/* Next share */}

        <ListRating product={product} />
      </div>
    </div>
  )
}

export default ProductPage
