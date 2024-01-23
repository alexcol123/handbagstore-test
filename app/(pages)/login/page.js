import FormWrapSmall from '../../components/FormWrapSmall'
import React from 'react'
import LoginForm from './LoginForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Login = async () => {

  const currentUser = await getCurrentUser()


  return (
    <div className='px-8'>
      <FormWrapSmall>
        <LoginForm  currentUser={currentUser}/>
      </FormWrapSmall>
    </div>
  )
}

export default Login
