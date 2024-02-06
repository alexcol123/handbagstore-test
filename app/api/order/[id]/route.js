import { NextResponse } from 'next/server'
import getCurrentUser from '../../../../actions/getCurrentUser'
import prisma from '../../../../libs/prismadb'

export async function PUT(request, { params }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  if (  currentUser.role !== 'ADMIN') {
    return NextResponse.error()
  }

  let { id } = params

  const body = await request.json()

  const { deliveryStatus } = body
  console.log('===============================================')

  console.log(deliveryStatus)

  const order = await prisma.order.update({
    where: { id },
    data: { deliveryStatus },
  })

  return NextResponse.json(order)
}
