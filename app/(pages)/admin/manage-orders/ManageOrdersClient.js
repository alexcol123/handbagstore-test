'use client'

// import { Product } from "@prisma/client"
import { DataGrid } from '@mui/x-data-grid'
import { formatPrice } from '../../../../utils/formatPrice'
// import Heading from "@/app/components/Heading"
import ActionBtn from '../manage-products/ActionBtn'
import NoImg from '../../../../public/noimg.jpg'
import { useCallback } from 'react'
import Status from '../../../components/Status'

import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from 'react-icons/md'

import { VscError } from 'react-icons/vsc'

import PaymentActions from '../../../components/orders/PaymentActions'
import DeliveryActions from '../../../components/orders/DeliveryActions'

import Heading from '../../../components/Heading'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import moment from 'moment'

const ManageOrdersClient = ({ orders }) => {
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

      width: 170,
      renderCell: (params) => {
        return (
          <div className='flex items-center justify-center ml-2 w-full'>
            <PaymentActions pmtStatus={params.row.paymentStatus} />
            {/* {params.row.paymentStatus === 'pending' ? (
              <Status
                text={params.row.paymentStatus}
                icon={MdAccessTimeFilled}
                bgColor={'bg-base-200'}
                textColor='text-base-content'
              />
            ) : params.row.paymentStatus === 'complete' ? (
              <Status
                text={params.row.paymentStatus}
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
            )} */}
          </div>
        )
      },
    },

    {
      field: 'amount',
      headerName: 'Amount(USD)',
      headerAlign: 'center',

      width: 150,
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

      width: 170,
      renderCell: (params) => {
        return (
          <div className='flex items-center justify-center ml-2 w-full'>
            <DeliveryActions deliveryStatus={params.row.deliveryStatus} />
            {/* {params.row.deliveryStatus === 'pending' ? (
              <Status
                text={params.row.deliveryStatus}
                icon={MdAccessTimeFilled}
                bgColor={'bg-base-200'}
                textColor='text-base-content'
              />
            ) : params.row.deliveryStatus === 'dispatched' ? (
              <Status
                text={params.row.deliveryStatus}
                icon={MdDeliveryDining}
                bgColor={'bg-warning'}
                textColor='text-warning-content'
              />
            ) : params.row.deliveryStatus === 'delivered' ? (
              <Status
                text={params.row.deliveryStatus}
                icon={MdDone}
                bgColor={'bg-success'}
                textColor='text-success-content'
              />
            ) : params.row.deliveryStatus === 'returned' ? (
              <Status
                text={params.row.deliveryStatus}
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
            )} */}
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
      headerName: 'Order Actions',
      width: 260,
      headerAlign: 'center',
      renderCell: (params) => {
        // console.log(params.row.images)
        return (
          <div className='flex  items-center justify-around gap-1  w-full  '>
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id)
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDelivered(params.row.id)
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`)
              }}
            />
          </div>
        )
      },
    },

    { field: 'id', headerName: 'Order ID', headerAlign: 'center', width: 220 },
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

  // const handleDelete = useCallback(async (id, images) => {
  //   let text = 'Are You sure you want to delete? '

  //   //  if Ok to delete
  //   if (confirm(text) === true) {
  //     toast('Deleting Product, Please wait')

  //     const handleImageDelete = async () => {
  //       try {
  //         for (const singleimg of images) {
  //           // console.log(singleimg.image)

  //           if (singleimg.image) {
  //             const imageRef = ref(storage, singleimg.image)

  //             await deleteObject(imageRef)
  //             console.log(
  //               'Image delete =======================================>>>>>>>'
  //             )
  //           }
  //         }
  //       } catch (error) {
  //         console.log('Deleting Image Error')
  //         console.log(error)
  //         return
  //       }
  //     }

  //     // Delete Images

  //     await handleImageDelete()

  //     //  DELETE FROM DB ---------------------
  //     axios
  //       .delete(`/api/product/${id}`)
  //       .then((res) => {
  //         toast.success('Product deleted ')
  //         router.refresh()
  //       })
  //       .catch((error) => {
  //         toast.error('Something went wrong ')
  //         console.log(error)
  //       })
  //   } else {
  //     // If cancell
  //     toast('Deleting Cancelled')
  //   }
  // }, [])

  if (orders.length === 0) {
    return <div className='text-xl mt-20 ml-8'> No Orders Found</div>
  }

  return (
    <div className='max-2-[1150px] m-auto'>
      <div className='my-4 mb-8'>
        <Heading title='Manage Orders ' center />{' '}
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

      <div className='mt-8 '>
        <div className='flex flex-col gap-4  w-fit border p-4   shadow-lg bg-base-200/50  '>
          <div>
            <h2 className='text-lg text-center '>Order Actions</h2>
            <hr />
          </div>
          <div className=' flex items-center  w-full  gap-2'>
            <ActionBtn icon={MdDeliveryDining} /> <h4>Mark as Order Sent </h4>
          </div>
          <div className=' flex items-center   w-full  gap-2'>
            <ActionBtn icon={MdDone} />
            <h4>Mark as Order Delivered </h4>
          </div>
          <div className=' flex items-center   w-full  gap-2'>
            <ActionBtn icon={MdRemoveRedEye} />
            <h4>View Order</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageOrdersClient
