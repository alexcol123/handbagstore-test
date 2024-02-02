'use client'

import { useEffect, useState, useCallback } from 'react'
import { useCart } from '../../../hooks/useCart'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import CheckoutForm from './CheckoutForm'

import { Elements } from '@stripe/react-stripe-js'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import MyButton from '../../components/MyButton'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CheckoutClient = () => {
  const router = useRouter()

  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()

  // console.log(cartProducts)

  const [loading, setloading] = useState(false)
  const [error, setError] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // console.log('client secret', clientSecret)

  useEffect(() => {
    // create a payment intent as soon as page loads
    if (cartProducts) {
      setloading(true)
      setError(false)

      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setloading(false)
          if (res.status === 401) {
            return router.push('/login')
          }
          return res.json()
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret)
          handleSetPaymentIntent(data.paymentIntent.id)
        })
        .catch((error) => {
          setError(true)
          console.log('Error', { error })
          // toast.error('Something went wrong')
        })
    }
  }, [cartProducts, paymentIntent])

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  }

  const handleSetPaymentSuccess = useCallback((value) => {
    setPaymentSuccess(value)
  }, [])

  return (
    <div className='w-full'>
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}

      {loading && <div className='text-center'> Loading Checkout...</div>}
      {error && (
        <div className='text-center text-rose-500'>
          {' '}
          Something went wrong...{' '}
        </div>
      )}
      {paymentSuccess && (
        <div className='flex items-center flex-col gap-4 my-8 '>
          <div className='text-center font-semibold text-lg md:text-xl my-8'>
            {' '}
            Congratulations your Payment was Success
          </div>
          <div className='max-w-[220px] w-full'>
            <MyButton
              label='View Your Orders'
              onClick={() => router.push('/orders')}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutClient
