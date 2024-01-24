'use client'

import { useEffect, useState } from 'react'
import { useCart } from '../../../hooks/useCart'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const CheckoutClient = () => {
  const router = useRouter()

  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()

  const [loading, setloading] = useState(false)
  const [error, setError] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const [paymentSuccess, setPaymentSuccess] = useState(false)


  console.log('Payment Intent', paymentIntent)
  console.log('Client Secret', clientSecret)


  useEffect(() => {
    // create a payment intent as soon as page loads 
    if (cartProducts) {
      setloading(true)
      setError(false)

      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent
        })
      })
        .then((res) => {
          setloading(false)
          if (res.status === 401) {
            return router.push('/login')
          }
          return res.json()
        }).then((data) => {

          setClientSecret(data.paymentIntent.client_secret)
          handleSetPaymentIntent(data.paymentIntent.id)
        }).catch((error) => {
          setError(true)
          console.log('Error', error)
          toast.error('Something went wrong')
        })
    }


  }, [cartProducts, paymentIntent])

  return <div></div>
}

export default CheckoutClient
