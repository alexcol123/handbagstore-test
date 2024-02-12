import { buffer } from 'micro'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import Stripe from 'stripe'
import prisma from '../../libs/prismadb'

export const config = {
  api: {
    bodyParser: false,
  },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export default async function handler(req, res) {
  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  if (!sig) {
    return res.status(400).send('Missing the stripe signature')
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send('Webhook error' + err)
  }

  console.log('event from webhook')
  console.log(event)

  switch (event.type) {
    case 'charge.succeeded':
      const charge = event.data.object

      if (typeof charge.payment_intent === 'string') {
        const webhookorderUpdate = await prisma?.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: { status: 'complete', address: charge.shipping?.address },
        })
        console.log(
          'Webhook  ============================================================================================================     '
        )

        console.log(webhookorderUpdate.products)

        console.log(
          'productsSold  ============================================================================================================     '
        )
        const productsSold = webhookorderUpdate.products.map((p) => p.id)

        // Remove  1 from inventory  of each from inventory  in DB

        for (const singleProductId of productsSold) {
          await prisma?.product.update({
            where: { id: singleProductId },
            data: {
              inStock: {
                decrement: 1,
              },
            },
          })
        }

        console.log(
          'WEBHOOK :  ----   Inventory Updated -1  of each item sold  ----'
        )
      }

      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }
  res.json({ reveived: true })
}
