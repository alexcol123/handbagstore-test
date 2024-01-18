'use client'

import React from 'react'

const SetQuantity = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {

const btnStyles = 'btn btn-sm  btn-outline  hover:bg-primary duration-300 font-bold'

  return (
    <div className='flex gap-8  items-center text-base  md:text-lg'>
      {cartCounter ? null : <div className='font-semibold'>QUANTITY:</div>}
      <div className='flex gap-4 items-center text-center'>
        <button
          className={btnStyles}
          onClick={handleQtyDecrease}
        >
          -
        </button>
        <div>{cartProduct.quantity} </div>
        <button
          className={btnStyles}
          onClick={handleQtyIncrease}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default SetQuantity
