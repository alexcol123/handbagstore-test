import prisma from '../libs/prismadb'

export default async function getProductsById(productid) {
  try {


    const product = await prisma.product.findFirst ({
      where: {
        id: productid,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })





    if (!product) return null

    return product
  } catch (error) {
    throw new Error(error)
  }
}
