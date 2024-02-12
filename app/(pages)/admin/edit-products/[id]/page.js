export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import EditProductClient from './EditProductClient'
import FormWrap from '@/app/components/FormWrap'
import getCurrentUser from '@/actions/getCurrentUser'
import getProductsById from '@/actions/getProductById'



const EditProduct = async ({ params }) => {
  const currentUser = await getCurrentUser()



  const product = await getProductsById(params.id)
  // console.log(currentUser)

  if (!currentUser || currentUser.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div>
      <FormWrap>
        <EditProductClient product={product}  />
      </FormWrap>
    </div>
  )
}

export default EditProduct
