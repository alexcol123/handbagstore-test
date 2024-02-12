import { NextResponse } from 'next/server'
import getCurrentUser from '../../../../actions/getCurrentUser'
import prisma from '../../../../libs/prismadb'

export async function DELETE(request, { params }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  if (currentUser.role !== 'ADMIN') {
    return NextResponse.error()
  }

  const product = await prisma?.product.delete({
    where: { id: params.id },
  })

  return NextResponse.json(product)
}

export const PUT = async (request, { params }) => {
  const { id } = params

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  if (currentUser.role !== 'ADMIN') {
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

  const product = await prisma.product.update({
    where: {
      id: id,
    },
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

export const PATCH = async (request, { params }) => {
  const { id } = params

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  if (currentUser.role !== 'ADMIN') {
    return NextResponse.error()
  }

  const body = await request.json()

  const { images } = body

  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      images: images,
    },
  })

  return NextResponse.json(product)
}
