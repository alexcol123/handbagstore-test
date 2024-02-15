import Stripe from 'stripe'
import prisma from '../../../libs/prismadb'
import { NextResponse } from 'next/server'

import getCurrentUser from '../../../actions/getCurrentUser'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

const calculateOrderAmount = (items) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity
    return acc + itemTotal
  }, 0)

  const price = totalPrice.toFixed(2)

  return price
}

const verifyAmountsFromBackend = async (items) => {
  let productIdList = items.map((product) => product.id)

  try {
    let totalPrice = 0

    if (productIdList.length < 1) {
      throw new Error('No products found')
    }

    for (const id of productIdList) {
      const product = await prisma.Product.findFirst({
        where: {
          id: id,
        },
      })
      //console.log(product)
      if (product) {
        totalPrice += product.price
        // console.log('total price', totalPrice)
      } else {
        console.error('Product not found with ID:', id)
        throw new Error('Product not found with ID')
      }
    }

    return totalPrice

  } catch (error) {
    console.error('Error:', error)
    throw new Error(' error validatin  totals  in func calculateOrderAmount')
  }
}

export async function POST(request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { items, payment_intent_id } = body



  let totalAsFloat = await verifyAmountsFromBackend(items)



  // const total = calculateOrderAmount(items) * 100

  // const totalAsFloat = parseFloat(+calculateOrderAmount(items))
   console.log(totalAsFloat)

  const totalStripeAsCents = totalAsFloat * 100

  // console.log(' TOTAL 1 ====================            ')
  // console.log(typeof totalAsFloat)
  // console.log(totalAsFloat)

  // console.log(' TOTAL 2 ====================            ')
  // console.log(typeof totalStripeAsCents)
   console.log(totalStripeAsCents)

  const orderData = {
    user: { connect: { id: currentUser.id } },
    // amount: total,
    amount: totalStripeAsCents,
    currency: 'usd',
    status: 'pending',
    deliveryStatus: 'pending',
    paymentIntentId: payment_intent_id,
    products: items,
  }

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    )

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: totalStripeAsCents }
      )

      // Update order

      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),
        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: totalAsFloat,
            products: items,
          },
        }),
      ])

      if (!existing_order) {
        return NextResponse.json(
          { error: 'Invalid Payment Intent' },
          { status: 400 }
        )
      }

      return NextResponse.json({ paymentIntent: updated_intent })
    }
  } else {
    // Create the intent

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalStripeAsCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })
    // create the order
    orderData.paymentIntentId = paymentIntent.id

    const createdOrder = await prisma.order.create({
      data: orderData,
    })

    return NextResponse.json({ paymentIntent })
  }

  return NextResponse.error()
}
