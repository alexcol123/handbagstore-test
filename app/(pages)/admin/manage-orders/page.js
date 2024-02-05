
import getOrders from '../../../../actions/getOrders'
import getCurrentUser from '../../../../actions/getCurrentUser'
import { redirect } from 'next/navigation'
import ManageOrderClient from './ManageOrdersClient'


const ManageOrders = async () => {
  const orders = await getOrders()
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div>
      <ManageOrderClient orders={orders} />
    </div>
  )
}

export default ManageOrders
