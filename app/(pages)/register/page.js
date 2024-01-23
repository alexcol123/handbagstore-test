import FormWrapSmall from '../../components/FormWrapSmall'
import React from 'react'
import RegisterForm from './RegisterForm'
import { getCurrentUser } from '../../../actions/getCurrentUser'

export const dynamic = 'force-dynamic'

const Register = async () => {
  const currentUser = await getCurrentUser()

  return (
    <div className='px-8'>
      <FormWrapSmall>
        <RegisterForm currentUser={currentUser} />
      </FormWrapSmall>
    </div>
  )
}

export default Register
