import { truncateText } from "../../../utils/truncateText"


const ProductName = ({brand, isOnSale}) => {
  return (
    <h2 className='w-full flex items-center '>
    <span className='uppercase'>
      {' '}
      {truncateText(brand, 22)}
    </span>
    {isOnSale && (
      <div className='badge badge-error text-gray-50  ml-auto'>Sale</div>
    )}
  </h2>
  )
}

export default ProductName
