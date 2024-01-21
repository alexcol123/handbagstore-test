import FormWrapSmall from '../../components/FormWrapSmall'
import React from 'react'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <div className='px-8'>
      <FormWrapSmall>
        <LoginForm />
      </FormWrapSmall>
    </div>
  )
}

export default Login
