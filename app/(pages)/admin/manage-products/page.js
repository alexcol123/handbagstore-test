import ManageProductsClient from './ManageProductsClient'
import getProducts from '../../../../actions/getProducts'
import { getCurrentUser } from '../../../../actions/getCurrentUser'
import { redirect } from 'next/navigation'

const ManageProducts = async () => {
  const products = await getProducts({ category: null })
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div>
      <ManageProductsClient products={products} />
    </div>
  )
}

export default ManageProducts
