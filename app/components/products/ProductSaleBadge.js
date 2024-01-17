import React from 'react'
import { truncateText } from '../../../utils/truncateText'

const ProductSaleBadge = ({  isOnSale }) => {
  return (
    <h2 className='w-full flex items-center '>
   
      {isOnSale && (
        <div className='badge badge-error text-gray-50  ml-auto'>Sale</div>
      )}
    </h2>
  )
}

export default ProductSaleBadge
