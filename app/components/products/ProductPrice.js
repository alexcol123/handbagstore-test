import React from 'react'

const ProductPrice = ({price , isOnSale, salePrice, fontSize='text-sm'}) => {
  return (
    <h2 className={`font-light flex gap-2 ${fontSize}`}>
    {isOnSale && salePrice !== 0 ? (
      <>
        <span className='line-through'>${price} </span>
        <span>${salePrice}</span>
      </>
    ) : (
      <span>${price}</span>
    )}
  </h2>
  )
}

export default ProductPrice
