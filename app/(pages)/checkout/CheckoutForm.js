'use state'

import { useState, useEffect } from 'react'
import { useCart } from '../../../hooks/useCart'

import toast from 'react-hot-toast'
import Heading from '../../components/Heading'
import { formatPrice } from '../../../utils/formatPrice'
import MyButton from '../../components/MyButton'

import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

const CheckoutForm = ({ clientSecret, handleSetPaymentSuccess }) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart()
  const stripe = useStripe()
  const elements = useElements()

  const [isLoading, setIsLoading] = useState(false)
  const formattedPrice = formatPrice(cartTotalAmount)

  useEffect(() => {
    if (!stripe) return
    if (!clientSecret) return
    handleSetPaymentSuccess(false)
  }, [stripe])


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
      })
      .then((result) => {
        if (!result.error) {
          toast.success('Payment successfull')
          handleClearCart()
          handleSetPaymentSuccess(true)
          handleSetPaymentIntent(null)
        }
        setIsLoading(false)
      })
  }

  //   Payment
  // Your payment details are encrypted.

  return (
    <form onSubmit={handleSubmit} id='payment-form' className=''>
      <div className='mb-6'>
        <h2 className='text-center text-3xl font-semibold  '>Payment Method</h2>

        <div className='divider divider-primary text-primary my-12 text-lg font-semibold'>
          Shipping Address
        </div>
      </div>
      {/* <h2 className='font-semibold  mb-2 text-center'>Shipping Address </h2> */}
      <AddressElement
        options={{ mode: 'shipping', allowedCountries: ['US'] }}
      />
      <div className='divider divider-primary text-primary my-12 text-lg font-semibold'>
        Payment Method
      </div>
      {/* <h2 className='font-semibold mt-4 mb-2 text-center '>
        Payment information
      </h2> */}
      <PaymentElement id='payment-element' options={{ layout: 'tabs' }} />

      <div className='py-4 text-center font-bold text-xl'>
        total: {formattedPrice}
      </div>
      <MyButton
        label={isLoading ? 'Processing' : 'Pay Now'}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  )
}

export default CheckoutForm
