import { truncateText } from "../../../utils/truncateText"


const ProductName = ({brand, isOnSale}) => {
  return (
    <h2 className='w-full flex items-center justify-between '>
    <span className='uppercase'>
      {' '}
      {truncateText(brand, 22)}
    </span>
    {isOnSale && (
      <div className='badge badge-error text-gray-50 '>Sale</div>
    )}
  </h2>
  )
}

export default ProductName
