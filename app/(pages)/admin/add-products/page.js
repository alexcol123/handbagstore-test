import AddProductForm from './AddProductForm'
import FormWrap from '../../../components/FormWrap'

import getCurrentUser from '../../../../actions/getCurrentUser'
import { redirect } from 'next/navigation'

const AddProductsPage = async () => {
  const currentUser = await getCurrentUser()

  // console.log(currentUser)

  if (!currentUser || currentUser.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div>
      <FormWrap>
        <AddProductForm />
      </FormWrap>
    </div>
  )
}

export default AddProductsPage
