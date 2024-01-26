'use client'
import React from 'react'
import { truncateText } from '../../../utils/truncateText'
import Image from 'next/image'
import Link from 'next/link'
import ProductPrice from './ProductPrice'
import ProductSaleBadge from './ProductSaleBadge'
// import ProductColorOptions from './ProductColorOptions'

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className='h-full  bg-base-200 relative  flex flex-col  rounded  hover:bg-base-300  transition duration-300 overflow-hidden '>
        <Image
          src={product.images[0]}
          alt={product.category}
          width={400}
          height={400}
          className=' w-full h-full object-cover  flex-1 transition duration-300  hover:scale-105  '
        />
        {/* Optional items absolute  */}
        <div className='absolute top-5 right-5'>
          <ProductSaleBadge isOnSale={product.isOnSale} />
        </div>

        <div className=' relative px-5  flex  flex-col   gap-1 my-4 flex-grow    '>
          <h2 className='w-full  '>{truncateText(product.brand, 22)}</h2>
          <h2 className=' text-xs md:text-sm font-light opacity-80 '>
            {truncateText(product.name, 50)}
          </h2>

          <ProductPrice
            price={product.price}
            isOnSale={product.isOnSale}
            previousPrice={product.previousPrice}
            fontSize='text-sm'
          />

          {/* Optional items absolute  */}
          <div className='absolute top-[-33px] left-0 right-0'>
            {/* <ProductColorOptions colors={product.colors} /> */}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
