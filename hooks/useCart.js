'use client'

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

  const value = {
    // State
    cartTotalQty,
    cartProducts,

    // functions
    handleAddProductToCart,
    handleRemoveProductFromCart
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
