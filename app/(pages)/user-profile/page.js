import getCurrentUser from '../../../actions/getCurrentUser'
import { redirect } from 'next/navigation'
import UserClient from './UserClient'

const UserProfile = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/')
  }



  return (
    <div>
      <UserClient currentUser={currentUser} />
    </div>
  )
}

export default UserProfile
