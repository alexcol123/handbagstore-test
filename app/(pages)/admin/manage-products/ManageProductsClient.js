'use client'

// import { Product } from "@prisma/client"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { formatPrice } from '../../../../utils/formatPrice'
// import Heading from "@/app/components/Heading"
import ActionBtn from '../../../components/ActionBtn'
import NoImg from '../../../../public/noimg.jpg'

import Status from '../../../components/Status'
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdEditDocument,
  MdRemoveRedEye,
} from 'react-icons/md'
import Heading from '../../../components/Heading'
import Image from 'next/image'

import { useCallback } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import firebaseApp from '../../../../libs/firebase'

const ManageProductsClient = ({ products }) => {
  //console.log(products[0])

  const router = useRouter()
  const storage = getStorage(firebaseApp)

  let rows = []
  if (products) {
    rows = products?.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        isOnSale: product.isOnSale,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      }
    })
  }

  const columns = [
    {
      field: 'images',
      headerName: 'Image',
      headerAlign: 'center',
      width: 80,
      renderCell: (params) => {
        return (
          <div className='overflow-hidden shadow-md  border duration-300 hover:scale-110'>
            <Image
              width={50}
              height={60}
              alt={'handbag img'}
              src={
                params.row.images.length ? params.row.images[0].image : NoImg
              }
              className=' object-cover'
            />
          </div>
        )
      },
    },

    {
      field: 'price',
      headerName: 'Price(USD)',
      headerAlign: 'center',
      width: 100,
      renderCell: (params) => {
        return (
          <div className='font-bold text-lg p-1 rounded-box '>
            {params.row.price}
          </div>
        )
      },
    },

    { field: 'name', headerName: 'Name', headerAlign: 'center', width: 140 },

    {
      field: 'category',
      headerName: 'Category',
      headerAlign: 'center',
      width: 100,
    },
    {
      field: 'isOnSale',
      headerName: 'isOnSale',
      headerAlign: 'center',

      width: 130,
      renderCell: (params) => {
        return (
          <div className='flex items-center justify-center ml-2 w-full'>
            {params.row.isOnSale === 'sale' ? (
              <Status
                text={params.row.isOnSale}
                bgColor={'bg-error'}
                textColor='text-white'
              />
            ) : params.row.isOnSale === 'clearance' ? (
              <Status
                text={params.row.isOnSale}
                bgColor={'bg-warning'}
                textColor='text-white'
              />
            ) : (
              <Status
                text={params.row.isOnSale}
                bgColor={'bg-transparent'}
                textColor='text-black'
              />
            )}
          </div>
        )
      },
    },
    { field: 'brand', headerName: 'Brand', headerAlign: 'center', width: 140 },

    {
      field: 'inStock',
      type: 'number',
      // editable: true,

      headerName: 'inStock',
      headerAlign: 'center',
      width: 90,
      renderCell: (params) => {
        return (
          <div className='w-full flex items-center justify-center'>
            {params.row.inStock <= 0 ? (
              <Status
                amt={params.row.inStock}
                text={params.row.inStock}
                bgColor={'bg-error'}
                textColor='text-white'
              />
            ) : (
              <Status
                text={params.row.inStock}
                bgColor={'bg-success'}
                textColor='text-gray-100'
              />
            )}
          </div>
        )
      },
    },
    {
      field: 'action',
      headerName: 'Product Actions',
      width: 260,
      headerAlign: 'center',
      renderCell: (params) => {
        // console.log(params.row.images)
        return (
          <div className='flex  items-center justify-around gap-1  w-full  '>
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.images)
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/product/${params.row.id}`)
              }}
            />

            <ActionBtn
              icon={MdEditDocument}
              onClick={() => {
                router.push(`/admin/edit-products/${params.row.id}`)
              }}
            />
          </div>
        )
      },
    },

    { field: 'id', headerName: 'ID', headerAlign: 'center', width: 220 },
  ]

  const handleDelete = useCallback(async (id, images) => {
    let text = 'Are You sure you want to delete? '

    //  if Ok to delete
    if (confirm(text) === true) {
      toast('Deleting Product, Please wait')

      const handleImageDelete = async () => {
        try {
          for (const singleimg of images) {
            // console.log(singleimg.image)

            if (singleimg.image) {
              const imageRef = ref(storage, singleimg.image)

              await deleteObject(imageRef)
              console.log(
                'Image delete =======================================>>>>>>>'
              )
            }
          }
        } catch (error) {
          console.log('Deleting Image Error')
          console.log(error)
          return
        }
      }

      // Delete Images

      await handleImageDelete()

      //  DELETE FROM DB ---------------------
      axios
        .delete(`/api/product/${id}`)
        .then((res) => {
          toast.success('Product deleted ')
          router.refresh()
        })
        .catch((error) => {
          toast.error('Something went wrong ')
          console.log(error)
        })
    } else {
      // If cancell
      toast('Deleting Cancelled')
    }
  }, [])

  if (products.length === 0) {
    return <div className='text-xl mt-20 ml-8'> No Products Found</div>
  }

  return (
    <div className='max-2-[1150px] m-auto'>
      <div className='my-4 mb-8'>
        <Heading title='Manage Products' center />
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

      {/* Glosary */}
      <div className='mt-8 '>
        <div className='flex flex-col gap-4  w-fit border p-4   shadow-lg bg-base-200/50  '>
          <div>
            <h2 className='text-lg text-center '>Product Actions</h2>
            <hr />
          </div>

          <div className=' flex items-center   w-full  gap-2'>
            <ActionBtn icon={MdDelete} />
            <h4>Delete Product</h4>
          </div>
          <div className=' flex items-center   w-full  gap-2'>
            <ActionBtn icon={MdRemoveRedEye} />
            <h4> View Product </h4>
          </div>
          <div className=' flex items-center   w-full  gap-2'>
            <ActionBtn icon={MdEditDocument} />
            <h4> Edit Product </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageProductsClient
