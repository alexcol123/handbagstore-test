import prisma from '@/libs/prismadb'
import moment from 'moment'

export default async function getGraphData() {
  try {
    // Get the start and end dates for the data range(7 days ago to today )
    const startDate = moment().subtract(6, 'days').startOf('day')
    const endDate = moment().endOf('day')

    // Query the db to get orders data grouped by created date
    const result = await prisma.order.groupBy({
      by: ['createdDate'],
      where: {
        createdDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: 'complete',
      },
      _sum: {
        amount: true,
      },
    })

    // Initialize an objet to aggregate the data day by day
    const aggregatedData = {}
    // Create a clone of the start date to iterate over each day
    const currentDate = startDate.clone()

    // Iterate over  each day in the date range
    while (currentDate <= endDate) {
      // Format the day as a sting (e.g. , "Monday" )
      const day = currentDate.format('dddd')
      console.log('day<<<', day, currentDate)

      // Initialize the agregated data for the day with the day , data, and totalAmoun
      aggregatedData[day] = {
        day,
        date: currentDate.format('YYY-MM-DD'),
        totalAmount: 0,
      }

      // Move to the next day
      currentDate.add(1, 'day')
    }

    // Calculate the total amount for each day by summing the order amount
    result.forEach((entry) => {
      const day = moment(entry.createdDate).format('dddd')
      const amount = entry._sum.amount || 0
      aggregatedData[day].totalAmount += amount
    })

    // Convert the aggregateddata object to an array and sort by date
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    )

    // Return the formated data
    return formattedData
  } catch (error) {
    throw new Error(error)
  }
}