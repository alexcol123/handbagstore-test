import prisma from '../libs/prismadb'

export default async function findRelatedProducts(productId, category) {


  try {
    const relatedProducts = await prisma.product.findMany({
      where: {
        category: { equals: category },
        NOT: {
          id: {
            equals: productId,
          },
        },
      },

      take: 4,
    })


    return relatedProducts
  } catch (error) {
    throw new Error(error)
  }
}
