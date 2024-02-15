import { Metadata, ResolvingMetadata } from 'next'

import ListRating from './ListRating'
import ProductDetails from './ProductDetails'
import getProductsById from '../../../../actions/getProductById'
import AddRating from './AddRating'
import getCurrentUser from '@/actions/getCurrentUser'
import getRelatedProducts from '@/actions/getRelatedProducts'
import RelatedProducts from './RelatedProducts'

export const dynamic = 'force-dynamic'

// MORE ABOUT METADATA https://www.youtube.com/shorts/MYU_7RK3RHM

export async function generateMetadata({ params, searchParams }) {
  // read route params
  const id = params.productId

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  const product = await getProductsById(id)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.images[0].image],
    },
  }
}

// export const metadata = {
//   title: 'Handbag Store',
//   description:
//     'Handbags at the best prices buy today, online shop for jet set luxury designer handbags watches shoes clothing and more',
//   metadataBase: new URL('https://handbagstore-test-3.vercel.app'),

//   openGraph: {
//     images: [
//       {
//         url: 'https://images.pexels.com/photos/1204464/pexels-photo-1204464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//       },
//     ],
//   },
// }

const ProductPage = async ({ params }) => {
  let productId = params.productId
  const user = await getCurrentUser()

  const product = await getProductsById(productId)

  console.log(
    'product ========================================================================================================================================================================================================================      '
  )

  console.log(product)

  const relatedProducts = await getRelatedProducts(productId, product.category)

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
        {relatedProducts && (
          <RelatedProducts relatedProducts={relatedProducts} />
        )}
        <AddRating product={product} user={user} />

        <ListRating product={product} />
      </div>
    </div>
  )
}

export default ProductPage
