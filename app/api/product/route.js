import prisma from '../../../libs/prismadb'

import getCurrentUser from '../../../actions/getCurrentUser'

import { NextResponse } from 'next/server'

export const POST = async (request) => {
  const currentUser = await getCurrentUser()

  if (!currentUser || !currentUser.role === 'ADMIN') {
    return NextResponse.error()
  }

  const body = await request.json()

  const {
    name,
    description,
    price,
    previousPrice,
    brand,
    category,
    inStock,
    isOnSale,
    size,
    measurements,
    images,
    reviews,
    adminProductCostAndExpenses,
    showInStore,
    color,
  } = body

  // let imageToSend = [images[0].image]

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      previousPrice: parseFloat(previousPrice),
      brand,
      category,
      inStock: parseInt(inStock),
      isOnSale,
      size,
      measurements,
      // images: imageToSend,
      images,
      reviews,
      adminProductCostAndExpenses: parseFloat(adminProductCostAndExpenses),
      showInStore,
      color,
    },
  })

  return NextResponse.json(product)
}
