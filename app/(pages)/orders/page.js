import getCurrentUser from '../../../actions/getCurrentUser'
import { redirect } from 'next/navigation'
import OrdersClient from './OrdersClient'
import getOrdersByUserId from '../../../actions/getOrdersByUserId'
import NullData from '../../components/NullData'

const Orders = async () => {
  const currentUser = await getCurrentUser()

  let userId = currentUser.id

  if (!currentUser) {
    redirect('/')
  }

  const orders = await getOrdersByUserId(userId)
  if (!orders) {
    return <NullData title={'No orders yet...'} />
  }

  return (
    <div>
      <OrdersClient orders={orders} />
    </div>
  )
}

export default Orders
