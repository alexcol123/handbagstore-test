import prisma from '../libs/prismadb'

export default async function getOrdersByUserId(userId) {
  console.log('getOrdersbyuserid')

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdDate: 'desc',
      },
    })

    if (!orders) return null

    return orders
  } catch (error) {
    throw new Error(error)
  }
}
