'use client'

import Heading from '../../../components/Heading'

import { Order } from '@prisma/client'
import moment from 'moment'
import { useRouter } from 'next/navigation'

import OrderItem from './OrderItem'
import Status from '../../admin/manage-products/Status'
import { formatPrice } from '../../../../utils/formatPrice'

import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md'

import { VscError } from 'react-icons/vsc'

const OrderDetails = ({ order }) => {
  return (
    <div className='max-w-[1150px] m-auto flex flex-col gap-2 '>
      <div className='mt-8'>
        <Heading title='Order Details' />
      </div>

      <div>Order ID: {order.id}</div>
      <div>
        Total Amount:{' '}
        <span className='font-bold'>{formatPrice(order.amount)}</span>
      </div>

      <div className='flex gap-4 items-center'>
        <div>Payment Status</div>
        <div className='w-fit'>
          {order.status === 'pending' ? (
            <Status
              text={order.status}
              icon={MdAccessTimeFilled}
              bgColor={'bg-base-200'}
              textColor='text-base-content'
            />
          ) : order.status === 'complete' ? (
            <Status
              text={order.status}
              icon={MdDone}
              bgColor={'bg-success'}
              textColor='text-success-content'
            />
          ) : (
            <Status
              text={'NO DATA'}
              icon={MdDeliveryDining}
              bgColor={'bg-primary'}
              textColor='text-primary-content'
            />
          )}
        </div>
      </div>

      <div className='flex gap-4 items-center'>
        <div>Delivery Status</div>
        <div className='w-fit'>
          {order.deliveryStatus === 'pending' ? (
            <Status
              text={order.deliveryStatus}
              icon={MdAccessTimeFilled}
              bgColor={'bg-base-200'}
              textColor='text-base-content'
            />
          ) : order.deliveryStatus === 'dispatched' ? (
            <Status
              text={order.deliveryStatus}
              icon={MdDeliveryDining}
              bgColor={'bg-warning'}
              textColor='text-warning-content'
            />
          ) : order.deliveryStatus === 'delivered' ? (
            <Status
              text={order.deliveryStatus}
              icon={MdDone}
              bgColor={'bg-success'}
              textColor='text-success-content'
            />
          ) : order.deliveryStatus === 'returned' ? (
            <Status
              text={order.deliveryStatus}
              icon={VscError}
              bgColor={'bg-error'}
              textColor='text-error-content'
            />
          ) : (
            <Status
              text={'NO DATA'}
              icon={MdDeliveryDining}
              bgColor={'bg-primary'}
              textColor='text-primary-content'
            />
          )}
        </div>
      </div>

      <div>Date: {moment(order.createdDate).fromNow()}</div>

      <div>
        <h2 className='font-semibold mt-4 mb-2'>Products Ordered:</h2>
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
