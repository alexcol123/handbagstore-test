import prisma from '../libs/prismadb'

export default async function getProducts(params) {
  try {
    const { category, searchTerm, isOnSale } = params


    let searchString = searchTerm?.trim()

    let query = {}

    if (!searchTerm) {
      searchString = ''
    }



    if (category &&category !== undefined) {
      query.category = category
    } 

    if (isOnSale !== undefined) {
      query.isOnSale = isOnSale
    }




    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: { contains: searchString, mode: 'insensitive' },
          },
          // {
          //   description: { contains: searchString, mode: 'insensitive' },
          // },
          {
            category: { contains: searchString, mode: 'insensitive' },
          },
        ],
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

    return products
  } catch (error) {
    throw new Error(error)
  }
}
