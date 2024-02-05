import OrderDetails from './OrderDetails'
import getOrderById from '../../../../actions/getOrderById'



const OrderPage = async ({ params }) => {
  let orderId = params.orderId

  const order = await getOrderById(orderId)

  if (!order || order === undefined)
    return (
      <h2 className='w-full flex items-center justify-center font-bold mt-8'>
        That order is no longer available
      </h2>
    )

  return (
    <div className='p-4 md:p-2'>
      <OrderDetails order={order} />
  
    </div>
  )
}

export default OrderPage
