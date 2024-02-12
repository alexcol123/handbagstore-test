export const dynamic = 'force-dynamic'

import React from 'react'
import CartClient from './CartClient'
import getCurrentUser from '../../../actions/getCurrentUser'

const CartPage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <div>
      <CartClient currentUser={currentUser}  />
    </div>
  )
}

export default CartPage
