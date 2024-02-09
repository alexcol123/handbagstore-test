import prisma from '../libs/prismadb'

export default async function getProducts(params) {
  try {
    const { category, searchTerm, isOnSale } = params

    let searchString = searchTerm?.trim()

    if (!searchTerm) {
      searchString = ''
    }

    let query = {}

    if (category !== undefined) {
      query.category = category
    }

    if (isOnSale !== undefined) {
      query.isOnSale = isOnSale
    }

    console.log(
      '  ===========================================================================================================================================================================================================================================================================================================         '
    )

    console.log(searchString)

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: { startsWith: searchString, mode: 'insensitive' },
            description: { contains: searchString, mode: 'insensitive' },
            //  category: { contains: searchString, mode: 'insensitive' },
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

    console.log(products[0])
    return products
  } catch (error) {
    throw new Error(error)
  }
}
