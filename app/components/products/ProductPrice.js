import { formatPrice } from '../../../utils/formatPrice'
import React from 'react'

const ProductPrice = ({
  price,
  isOnSale,
  previousPrice,
  fontSize = 'text-sm',
}) => {
  return (
    <h2 className={`font-light flex gap-2 ${fontSize}`}>
      {isOnSale && previousPrice !== null ? (
        <>

          <span className='line-through'>{formatPrice(previousPrice)} </span>
          <span>{formatPrice(price)}</span>
        </>
      ) : (
        <span>${price}</span>
      )}
    </h2>
  )
}

export default ProductPrice
