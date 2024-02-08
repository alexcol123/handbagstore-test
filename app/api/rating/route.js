import getCurrentUser from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import prisma from '../../../libs/prismadb'

export async function POST(request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()

  let { comment, rating, product, userId } = body

  rating = parseInt(rating)


  const deliveredOrder = currentUser?.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === 'delivered'
  )

  const userReview = product?.reviews.find((review) => {
    return review.userId === currentUser.id
  })

  if (userReview || !deliveredOrder) {
    return NextResponse.json(
      { error: 'You must wait for product to arrive befeore reviewing it' },
      { status: 500 }
    )
  }

  const review = await prisma?.review.create({
    data: {
      comment,
      rating,
      productId: product.id,
      userId,
    },
  })

  return NextResponse.json(review)
}
