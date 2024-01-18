'use client'

import { Caprasimo } from 'next/font/google'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import toast from 'react-hot-toast'

export const CartContext = createContext(null)

export const CartContextProvider = ({ children }) => {
  const [cartTotalQty, setcartTotalQty] = useState(0)
  const [cartProducts, setcartProducts] = useState(null)

  useEffect(() => {
    const itemsInLs = localStorage.getItem('cartItems')
    setcartProducts(JSON.parse(itemsInLs))
  }, [])

  const handleAddProductToCart = (product) => {
    setcartProducts((prev) => {
      let updatedCart

      if (prev) {
        updatedCart = [...prev, product]
      } else {
        updatedCart = [product]
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedCart))

      return updatedCart
    })

    toast.success('Product Added to Cart')
  }

  const handleRemoveProductFromCart = useCallback(
    (product) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(
          (item) => item.id !== product.id
        )

        setcartProducts(filteredProducts)
        localStorage.setItem('cartItems', JSON.stringify(filteredProducts))
      }
      toast.success('Product Deleted form  Cart')
    },
    [cartProducts]
  )

  const handleCartQtyIncrease = useCallback(
    (product) => {
      let updatedCart
      if (product.quantity >= 25) {
        return toast.error('Opps! Maximun of 25 reached')
      }

      if (cartProducts) {
        updatedCart = [...cartProducts]

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        )

        if (existingIndex > -1) {
          ++updatedCart[existingIndex].quantity
        }

        setcartProducts(updatedCart)
        localStorage.setItem('cartItems', JSON.stringify(updatedCart))
      }
      toast.success('Product Added', {id:'qty'})
    },
    [cartProducts]
  )

  const handleCartQtyDecrease = useCallback(
    (product) => {

      console.log(product)
      let updatedCart
      if (product.quantity <=1) {
        return toast.error('Opps! Minimun reached')
      }

      if (cartProducts) {
        updatedCart = [...cartProducts]

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        )

        if (existingIndex > -1) {
          --updatedCart[existingIndex].quantity
        }

        setcartProducts(updatedCart)
        localStorage.setItem('cartItems', JSON.stringify(updatedCart))
      }
      toast.success('Product Removed', {id:'qty'})
    },
    [cartProducts]
  )

  const value = {
    // State
    cartTotalQty,
    cartProducts,

    // functions
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  }

  //return <CartContext.Provider value={value} {...children} />

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('userCart must be use within a CartContextProvider')
  }

  return context
}
