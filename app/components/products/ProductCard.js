import React from 'react'
import { truncateText } from '../../../utils/truncateText'
import Image from 'next/image'
import Link from 'next/link'
import ProductPrice from './ProductPrice'
import ProductSaleBadge from './ProductSaleBadge'
import NoImage from '../../../public/noimg.jpg'

const ProductCard = ({ product }) => {
  let percentageOff = null

  if (product.isOnSale !== 'no') {
    percentageOff = Math.ceil((product.price / product.previousPrice) * 100)

    console.log(product.previousPrice)
    console.log(product.price)
    console.log(percentageOff)
    console.log('---------')
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div
        className='group relative my-2 flex w-full max-w-xs  rounded flex-col overflow-hidden 
    border border-base-content/5  hover:shadow-lg
      '
      >
        <div className='relative flex h-72 w-full overflow-hidden'>
          <Image
            className='absolute top-0 right-0 h-full w-full object-cover object-center   group-hover:scale-105 duration-300'
            src={product.images.length ? product.images[0].image : NoImage}
            alt={product.category}
            fill
          />
        </div>

        <div className='pt-2 pb-5 px-2 bg-base-100'>
          <div className=' uppercase text-sm font-semibold mb-2'>
            {' '}
            {truncateText(product.brand, 22)}
          </div>

          <div className='space-y-1 text-xs'>
            <h2 className='tracking-tight '>
              {truncateText(product.name, 50)}
            </h2>

            <ProductPrice
              price={product.price}
              isOnSale={product.isOnSale}
              previousPrice={product.previousPrice}
              fontSize='text-xs'
            />

            {product.isOnSale === 'sale' && (
              <h2 className='text-error uppercase'>Limited Time Sale</h2>
            )}

            {product.isOnSale === 'clearance' && (
              <h2 className='text-primary uppercase'>
                {percentageOff >= 20 ? (
                  <>{`Clearance  ${percentageOff}% off`} </>
                ) : (
                  <> On Clearance</>
                )}
              </h2>
            )}

            {product.isOnSale === 'no' && (
              <h2 className='text-transparent uppercase'>no</h2>
            )}
          </div>
        </div>

        <div className='absolute top-2 right-1  '>
          <ProductSaleBadge isOnSale={product.isOnSale} />
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
