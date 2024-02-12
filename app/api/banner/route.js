import prisma from '../../../libs/prismadb'

import getCurrentUser from '../../../actions/getCurrentUser'

import { NextResponse } from 'next/server'

export const PUT = async (request) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  if (currentUser.role !== 'ADMIN') {
    return NextResponse.error()
  }

  const body = await request.json()

  const { heading, text, url } = body



  // let imageToSend = [images[0].image]

  const product = await prisma.banner.update({
    where: {
      id: '65ca4582d5da4571e21a17e3',
    },
    data: {
      heading,
      text,
      url,
    },
  })

  return NextResponse.json(product)
}

// export const GET = async (request) => {
//   // let imageToSend = [images[0].image]

//   const product = await prisma.banner.findFirst({
//     where: {
//       id: '65ca4582d5da4571e21a17e3',
//     },
//   })

//   return NextResponse.json(product)
// }
