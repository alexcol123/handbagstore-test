'use client'

import { useState, useEffect, useCallback } from 'react'

import Heading from '@/app/components/Heading'
import Input from '@/app/components/inputs/MyInput'
import TextArea from '@/app/components/inputs/TextArea'
import CategoryInput from '@/app/components/inputs/CategoryInput'
import CustomCheckbox from '@/app/components/inputs/CustomCheckbox'
import Select from '@/app/components/inputs/Select'

import { MdDeleteForever } from 'react-icons/md'

import MyButton from '@/app/components/MyButton'

import { categories } from '../../../../../utils/categories'
import { useForm } from 'react-hook-form'

import toast from 'react-hot-toast'

//  firebase
import firebaseApp from '@/libs/firebase'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import MyDropZone from '../../add-products/MyDropZone'
import Image from 'next/image'

const AddProductForm = ({ product }) => {
  const storage = getStorage(firebaseApp)

  const [oldImages, setoldImages] = useState(
    product?.images ? product.images : []
  )

  // console.log(oldImages)

  // DeleteASingleImage
  const handleImageDelete = useCallback(async (ipAddressOfImg) => {
    let text = 'Are You sure you want to delete? '

    //  if Ok to delete
    if (confirm(text) === true) {
      toast('Deleting Image, Please wait')

      try {
        const imageRef = ref(storage, ipAddressOfImg)
        await deleteObject(imageRef)
        console.log(
          'Image delete =======================================>>>>>>>'
        )
        toast.success('Image Deleted')
      } catch (error) {
        console.log('Deleting Image Error')
        console.log(error)
        return
      }
    } else {
      // If cancell
      toast('Deleting Image Cancelled')
    }

    router.refresh()
  }, [])

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // name: 'Bleeker Stencil ',
      // description:
      //   'A compact companion with enough room for all the essentials, our color-blocked Marilyn satchel is the epitome of polished ease. It’s crafted from Saffiano leather and opens to a lined interior with dedicated pockets for your phone, wallet and other small items. Attach the adjustable strap to wear it cross-body.',
      // price: '248',
      // previousPrice: '320',
      // brand: 'Michael Kors',
      // category: '',
      // inStock: '9',
      // isOnSale: 'no',
      // size: 'Medium',
      // measurements: '11.25”W X 8.25”H X 5.5”D',
      // images: [],
      // adminProductCostAndExpenses: '180',
      // showInStore: false,
      // color: 'red',

      name: product?.name ? product.name : '',
      description: product?.description ? product.description : '',
      price: product?.price ? product.price : '',
      previousPrice: product?.previousPrice ? product.previousPrice : '',
      brand: product?.brand ? product.brand : '',

      category: product?.category ? product.category : '',

      inStock: product?.inStock ? product.inStock : '',

      isOnSale: product?.isOnSale ? product.isOnSale : '',

      size: product?.size ? product.size : '',
      measurements: product?.measurements ? product.measurements : '',

      // Falta hacer
      images: [],
      adminProductCostAndExpenses: '',
      adminProductCostAndExpenses: product?.adminProductCostAndExpenses
        ? product.adminProductCostAndExpenses
        : '',

      showInStore: product?.showInStore ? product.showInStore : true,
      color: product?.color ? product.color : '',
    },
  })

  // const name = watch('name')
  // const description = watch('description')
  // const price = watch('price')
  // const previousPrice = watch('previousPrice')

  // const brand = watch('brand')
  const category = watch('category')
  // const inStock = watch('inStock')
  // const isOnSale = watch('isOnSale')

  // const size = watch('size')
  // const measurements = watch('measurements')

  // const images = watch('images')

  // const adminProductCostAndExpenses = watch('adminProductCostAndExpenses')
  // const showInStore = watch('showInStore')
  // const color = watch('color')

  // console.log({
  //   name,
  //   description,
  //   price,
  //   previousPrice,
  //   brand,
  //   category,
  //   inStock,
  //   isOnSale,
  //   size,
  //   measurements,
  //   adminProductCostAndExpenses,
  //   showInStore,
  //   color,
  //   images,
  // })

  const router = useRouter()

  const [isProductCreated, setIsProductCreated] = useState(true)
  const [isLoading, setisLoading] = useState(false)
  const [imagesArr, setimagesArr] = useState(null)

  const [isOnSaleVal, setisOnSaleVal] = useState('no')

  const setCustomValue = (id, value) => {
    // console.log('id', id, 'value', value)
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  useEffect(() => {
    setCustomValue('images', imagesArr)
  }, [imagesArr])

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setimagesArr(null)
      setIsProductCreated(false)
    }
  }, [isProductCreated])

  const onSubmit = async (data) => {
    //  console.log('Product data', data)
    // console.log('images', data.images.length)
    setisLoading(true)

    // Upload images to FireBase https://firebase.google.com/docs/storage/web/upload-files
    let uploadedImages = [...oldImages]

    if (data.category === '') {
      setisLoading(false)
      toast.error('Select Product Category')
      return
    }

    // if (data.images.length === 0) {
    //   setisLoading(false)
    //   toast.error('Add Product Images')
    //   return
    // }

    const handleImageUploads = async () => {
      toast('Creating product images')

      try {
        for (const item of data.images) {
          // console.log
          // console.log('item ------------------------    >>> ', item)

          const fileName = new Date().getTime() + '-' + item.name

          // console.log('filename  ------------------------    >>> ', fileName)

          const storage = getStorage(firebaseApp)
          const storageRef = ref(
            storage,
            `/products/${data.category}/${fileName}`
          )
          const uploadTask = uploadBytesResumable(storageRef, item)

          await new Promise((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused')
                    break
                  case 'running':
                    console.log('Upload is running')
                    break
                }
              },
              (error) => {
                // Handle unsuccessful uploads
                setisLoading(false)
                console.log('Error uploading image', error)
                reject(error)
              },

              () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                    uploadedImages.push({ ...item, image: downloadURL })
                    console.log('File available at', downloadURL)
                    return resolve()
                  })
                  .catch((error) => {
                    return reject(error)
                  })
              }
            )
          })
        }
      } catch (error) {
        setisLoading(false)
        console.log('Error handling image uploads', error)
        return toast.error('Error handling image uploads')
      }
    }

    // call the image uploads func and wait for images to be uploaded to Firebase
    await handleImageUploads()

    // After uploads
    const productData = { ...data, images: uploadedImages }
    console.log(productData)

    // Save Product to Database
    // Save to mongodb
    axios
      .put('/api/product/' + product.id, productData)
      .then(() => {
        toast.success('Product Created ')
        setIsProductCreated(true)
        router.push(`/product/${product.id}`)
      })
      .catch((error) => {
        console.log(error)
        toast.error('Something went wrong in catch')
      })
      .finally(() => {
        setisLoading(false)
      })
  }

  return (
    <>
      <Heading title='Add New Product' center />

      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <TextArea
        id='description'
        label='Description'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id='price'
        label='Price'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='number'
      />

      <Input
        id='previousPrice'
        label='Previous Price'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='number'
      />

      <Input
        id='brand'
        label='Brand'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <div className='w-full font-medium'>
        <div>Select a Category</div>

        <div className='grid grid-cols-4 gap-3 max-h[50vh] overflow-y-auto text-xs'>
          {categories.map((item) => {
            return (
              <div key={item.name} className='col-span'>
                <CategoryInput
                  label={item.name}
                  icon={item.icon}
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category == item.name}
                />
              </div>
            )
          })}
        </div>
      </div>

      <Input
        id='color'
        label='Color'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <CustomCheckbox
        id='showInStore'
        register={register}
        label='Show In the store'
      />

      <Input
        id='size'
        label='Size'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id='measurements'
        label='Measurements'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id='inStock'
        label='In Stock'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='number'
      />

      <Input
        id='adminProductCostAndExpenses'
        label='Admin Product Cost + Expenses'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='number'
      />

      {/* <Input
        id='isOnSale'
        label='Is On Sale'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='select'
      /> */}

      <div>
        <div className='font-bold text-center'> Is On Sale</div>
        <Select
          id='isOnSale'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          setisOnSaleVal={setisOnSaleVal}
          isOnSaleVal={isOnSaleVal}
        />
      </div>

      {/* Image */}
      <div className='w-full flex-col items-center justify-center gap-2 text-center'>
        <div className='font-bold'> Upload product Images</div>
        <MyDropZone
          setimagesArr={setimagesArr}
          isProductCreated={isProductCreated}
        />
      </div>

      <div className='divider divider-primary'>Original Images</div>

      <div className='flex  gap-3 flex-wrap'>
        {oldImages?.map((file, i) => {
          return (
            <div
              className='relative h-20 w-20 z-0 cursor-pointer group'
              key={i}
            >
              <Image
                className=' rounded-box shadow-lg h-20 w-20  z-5 mx-auto object-cover '
                fill
                alt='product'
                src={file.image}
              />
              <div className='absolute flex items-center justify-center top-1 right-1 w-6 h-6 bg-error-content rounded-full text-error z-50 duration-300 hover:scale-125'>
                <MdDeleteForever
                  size={18}
                  className='hover:scale-110'
                  onClick={() => handleImageDelete(file.image)}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div>
        <MyButton
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          isLoading={isLoading}
          label={isLoading ? 'Loading...' : 'Update Product'}
        />
      </div>
    </>
  )
}

export default AddProductForm
