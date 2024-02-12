import prisma from '../libs/prismadb'

export default async function getBanner() {
  try {
    const banner = await prisma.banner.findFirst({
      where: {
        id: '65ca4582d5da4571e21a17e3',
      },
    })

    if (!banner) return null

    return banner
  } catch (error) {
    throw new Error(error)
  }
}
