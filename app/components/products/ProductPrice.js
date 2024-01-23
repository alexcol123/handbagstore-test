import { formatPrice } from '@/utils/formatPrice'
import React from 'react'

const ProductPrice = ({ price, isOnSale, salePrice, fontSize = 'text-sm' }) => {
  return (
    <h2 className={`font-light flex gap-2 ${fontSize}`}>
      {isOnSale && salePrice !== null ? (
        <>
          <span className='line-through'>${price} </span>
          <span>{formatPrice(salePrice)}</span>
        </>
      ) : (
        <span>${price}</span>
      )}
    </h2>
  )
}

export default ProductPrice
