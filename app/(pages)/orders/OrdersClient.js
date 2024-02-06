'use client'

// import { Product } from "@prisma/client"
import { DataGrid } from '@mui/x-data-grid'
import { formatPrice } from '../../../utils/formatPrice'
// import Heading from "@/app/components/Heading"
import ActionBtn from '../../components/ActionBtn'
import NoImg from '../../../public/noimg.jpg'
import { useCallback } from 'react'
import Status from '../../components/Status'

import { FaRegEye } from "react-icons/fa";

import { VscError } from 'react-icons/vsc'

import PaymentActions from '../../components/orders/PaymentActions'
import DeliveryActions from '../../components/orders/DeliveryActions'

import Heading from '../../components/Heading'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import moment from 'moment'

const OrdersClient = ({ orders }) => {
  const router = useRouter()

  let rows = []

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount),
        paymentStatus: order.status,
        date: moment(order.createdDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      }
    })
  }

  const columns = [

    { field: 'id', headerName: 'Order ID', headerAlign: 'center', width: 230 },
    {
      field: 'customer',
      headerName: 'Customer Name',
      headerAlign: 'center',
      width: 140,
    },

    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      headerAlign: 'center',

      width: 160,
      renderCell: (params) => {
        return (
          <div className='flex items-center justify-center ml-2 w-full'>
            <PaymentActions pmtStatus={params.row.paymentStatus} />
          </div>
        )
      },
    },

    {
      field: 'amount',
      headerName: 'Amount(USD)',
      headerAlign: 'center',

      width: 140,
      renderCell: (params) => {
        return (
          <div className='font-bold text-lg p-1 rounded-box text-center w-full '>
            {params.row.amount}
          </div>
        )
      },
    },

    {
      field: 'deliveryStatus',
      headerName: 'Delivery Status',
      headerAlign: 'center',

      width: 160,
      renderCell: (params) => {
        return (
          <div className='flex items-center justify-center ml-2 w-full'>
            <DeliveryActions deliveryStatus={params.row.deliveryStatus} />
          </div>
        )
      },
    },

    {
      field: 'date',
      headerName: 'Order Date',
      headerAlign: 'center',
      width: 120,
    },

    {
      field: 'action',
      headerName: 'View Orders',
      width: 180,
      headerAlign: 'center',
      renderCell: (params) => {
        // console.log(params.row.images)
        return (
          <div className='flex  items-center justify-around gap-1  w-full   '>
            <ActionBtn
              icon={FaRegEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`)
              }}
            />
          </div>
        )
      },
    },

  ]

  const handleDelivered = useCallback((id) => {
    let text = 'Update Delivery Status ?'

    if (confirm(text) === true) {
      toast('Delivery  Accepted')

      axios
        .put(`/api/order/${id}`, { deliveryStatus: 'delivered' })
        .then((res) => {
          toast.success('Delivery Updated')
          router.refresh()
        })
        .catch((error) => {
          toast.error('Something went wrong ')
          console.log(error)
        })
    } else {
      toast('Delivery Update Cancelled')
    }
  }, [])

  const handleDispatch = useCallback((id) => {
    let text = 'Update to Dispatched ?'

    if (confirm(text) === true) {
      toast('Dispatch  Updated Accepted')

      axios
        .put(`/api/order/${id}`, { deliveryStatus: 'dispatched' })
        .then((res) => {
          toast.success('Dispatched Updated ')
          router.refresh()
        })
        .catch((error) => {
          toast.error('Something went wrong ')
          console.log(error)
        })
    } else {
      toast('Dispatch Cancelled')
    }
  }, [])

  if (orders.length === 0) {
    return <div className='text-xl mt-20 ml-8'> No Orders Found</div>
  }

  return (
    <div className='max-2-[1150px] m-auto'>
      <div className='my-4 mb-8'>
        <Heading title='My Orders ' center />{' '}
      </div>

      <div className='bg-white shadow-lg'>
        <DataGrid
          rows={rows}
          rowHeight={95}
          // editMode="row" columns={[{ field: 'inStock', editable: true }]}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100, 250]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 500,
            },
          }}
        />
      </div>
    </div>
  )
}

export default OrdersClient
