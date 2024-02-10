import getProducts from '@/actions/getProducts'
import SummaryPage from './summary/page'
import getOrders from '@/actions/getOrders'
import getUsers from '@/actions/getUsers'
import getGraphData from '@/actions/getGraphData'
import BarGraph from './summary/Bargraph'
// import getOrders from '@/actions/getOrders'

// import BarGraph from './BarGraph'
// import getGraphData from '@/actions/getGraphData'

const AdminPage = async () => {
  const products = await getProducts({ category: null })
  const graphData = await getGraphData()

  const orders = await getOrders()

  const users = await getUsers()

  return (
    <div className='p-8 '>
      <SummaryPage products={products} orders={orders} users={users} />

      <BarGraph data={graphData} />
    </div>
  )
}

export default AdminPage
