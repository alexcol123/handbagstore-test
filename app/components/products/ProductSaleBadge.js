import React from 'react'
import { truncateText } from '../../../utils/truncateText'

const ProductSaleBadge = ({ isOnSale }) => {
  // console.log(isOnSale)

  if (isOnSale === 'no') {
    return null
  }



  return (
    <div className='bg-gray-700  text-gray-100  rounded-sm  px-2 text-sm  uppercase '>
      <div className=' '>{isOnSale}</div>
    </div>
  )
}

export default ProductSaleBadge
