'use client'

import Heading from '../../../components/Heading'
import DeliveryActions from '../../../components/orders/DeliveryActions'
import PaymentActions from '../../../components/orders/PaymentActions'

import { Order } from '@prisma/client'
import moment from 'moment'
import { useRouter } from 'next/navigation'

import OrderItem from './OrderItem'
import Status from '../../../components/Status'
import { formatPrice } from '../../../../utils/formatPrice'

import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md'

import { VscError } from 'react-icons/vsc'

const OrderDetails = ({ order }) => {
  return (
    <div className='max-w-[1150px] m-auto flex flex-col gap-6 '>
      <div className='mt-8   mb-4'>
        <Heading title='Order Details' />
      </div>

      {/* <div>Order ID: {order.id}</div> */}
      <div className='font-semibold'>
        Order ID:
        <span className='font-normal ml-5'>{order.id}</span>
      </div>

      <div className='font-semibold'>
        Total Amount:
        <span className=' font-normal ml-5'>{formatPrice(order.amount)}</span>
      </div>

      <div className='flex gap-4  items-center font-semibold'>
        Payment Status:
        <div className='w-fit ml-5 font-normal'>
          <PaymentActions pmtStatus={order.status} />
        </div>
      </div>

      <div className='flex gap-4 items-center font-semibold'>
        Delivery Status:
        <div className='w-fit ml-5 font-normal'>
          <DeliveryActions deliveryStatus={order.deliveryStatus} />
        </div>
      </div>

      <div className='font-semibold'>
        Date:
        <span className='font-normal  ml-5'>
          {moment(order.createdDate).fromNow()}
        </span>
      </div>

      <div>
        <h2 className='font-semibold mt-4 mb-2 text-xl'>Products Ordered:</h2>
        <div className='grid grid-cols-5 text-xs gap-4 p-2  items-center justify-center bg-primary/10 rounded  '>
          <div className='col-span-2  justify-self-start '>PRODUCT</div>
          <div className='justify-self-center'>PRICE</div>
          <div className='justify-self-center'>QTY</div>
          <div className='justify-self-end'>TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item} />
          })}
      </div>
    </div>
  )
}

export default OrderDetails
