import React from 'react'
import { truncateText } from '../../../utils/truncateText'

const ProductSaleBadge = ({ isOnSale }) => {
  // console.log(isOnSale)
  let value = isOnSale[0]

  if (value === 'clearance') {
    return (
      <div className=' text-gray-50  ml-auto  badge badge-error gap-2 capitalize'>
        clearance
      </div>
    )

    // <div
    //   className=' text-gray-50  ml-auto  '  'badge badge-error gap-2' : 'badge badge-primary text gap-2'
    //       }
    // ></div>
  }

if(value === 'sale'){
  return (
    <div className=' text-gray-50  ml-auto  badge badge-primary gap-2 capitalize'>
      sale
    </div>
  )
}


  return null
}

export default ProductSaleBadge
