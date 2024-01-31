import { getCurrentUser } from '../../../actions/getCurrentUser'
import AdminNav from '../../components/admin/AdminNav'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Handbagshop | Admin',
  description: 'Admin dashboard for  HandbagStore',
}

const AdminLayout = async ({ children }) => {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div>
      <AdminNav />

      <div className='p-8'>{children}</div>
    </div>
  )
}

export default AdminLayout
