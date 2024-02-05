import prisma from '../libs/prismadb'

export default async function getOrderById(orderId) {
  try {



    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    })

    if (!order) return null

    return order
  } catch (error) {
    throw new Error(error)
  }
}

// import prisma from '../libs/prismadb'

// export default async function getProductsById(productid) {
//   try {

//     const product = await prisma.product.findFirst ({
//       where: {
//         id: productid,
//       },
//       include: {
//         reviews: {
//           include: {
//             user: true,
//           },
//           orderBy: {
//             createdAt: 'desc',
//           },
//         },
//       },
//     })

//     if (!product) return null

//     return product
//   } catch (error) {
//     throw new Error(error)
//   }
// }
