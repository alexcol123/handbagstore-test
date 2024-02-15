import ListRating from './ListRating'
import ProductDetails from './ProductDetails'
import getProductsById from '../../../../actions/getProductById'
import AddRating from './AddRating'
import getCurrentUser from '@/actions/getCurrentUser'
import getRelatedProducts from '@/actions/getRelatedProducts'
import RelatedProducts from './RelatedProducts'

export const dynamic = 'force-dynamic'

// MORE ABOUT METADATA https://www.youtube.com/shorts/MYU_7RK3RHM

export async function generateMetadata({ params }) {
  // read route params
  const id = params.productId

  const product = await getProductsById(id)

  return {
    title: `${product.name} | Luxury Designer Handbags, Watches, Shoes, and Clothing | Your Online Boutique`,
    description: product.description,
    openGraph: {
      images: [product.images[0].image],
    },
  }
}

const ProductPage = async ({ params }) => {
  let productId = params.productId
  const user = await getCurrentUser()

  const product = await getProductsById(productId)

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
