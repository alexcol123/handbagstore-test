import React from 'react'
import { truncateText } from '../../../utils/truncateText'
import Image from 'next/image'
import Link from 'next/link'
import ProductPrice from './ProductPrice'
import ProductSaleBadge from './ProductSaleBadge'
import NoImage from '../../../public/noimg.jpg'
import ProductIsOnSale from '../../components/products/ProductIsOnSale'

const ProductCard = ({ product }) => {
  let percentageOff = null

  if (product.isOnSale !== 'no') {
    percentageOff = Math.ceil((product.price / product.previousPrice) * 100)
  }

  return (
    <Link className='' href={`/product/${product.id}`}>
      <div
        className='group relative my-2 flex w-full max-w-xs  rounded flex-col    overflow-hidden 
    shadow-sm  transition duration-300    hover:shadow-lg
      '
      >
        <div className='relative flex h-80 w-full overflow-hidden'>
          <Image
            className=' h-full w-full  object-center object-contain   group-hover:scale-105 duration-300'
            src={product.images.length ? product.images[0].image : NoImage}
            alt={product.category}
            fill
          />

          {/* <div className='absolute top-4 right-3  '>
            <ProductSaleBadge isOnSale={product.isOnSale} />
          </div> */}
        </div>

        <div className='pt-2 pb-5 px-2 '>
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

            <ProductIsOnSale
              onSale={product.isOnSale}
              percentageOff={percentageOff}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
