import React from 'react'
import CartClient from './CartClient'
import getCurrentUser from '../../../actions/getCurrentUser'
import getProducts from '@/actions/getProducts'

const CartPage = async () => {
  const currentUser = await getCurrentUser()

  const products = await getProducts({params: null})

  return (
    <div>
      <CartClient currentUser={currentUser} products={products} />
    </div>
  )
}

export default CartPage
