import Heading from '@/app/components/Heading'
import ProductCard from '@/app/components/products/ProductCard'
import React from 'react'

const RelatedProducts = ({ relatedProducts }) => {

  return (
    <>
      <Heading title={'Related Products'} center />
      <div className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-6 gap-8   '>
        {relatedProducts?.map((product) => {
          // Hide product if stock is  0
          if (product.inStock < 1) return null
          else {
            return <ProductCard key={product.id} product={product} />
          }
        })}
      </div>
    </>
  )
}

export default RelatedProducts
