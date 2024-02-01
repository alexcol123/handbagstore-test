'use client'

import { useState, useEffect } from 'react'
import Heading from '../../../components/Heading'
import Input from '../../../components/inputs/Input'
import TextArea from '../../../components/inputs/TextArea'
import CustomCheckBox from '../../../components/inputs/CustomCheckbox'
import CategoryInput from '../../../components/inputs/CategoryInput'
import Select from '../../../components/inputs/Select'

import MyButton from '../../../components/MyButton'

import { categories } from '../../../../utils/categories'
import { useForm } from 'react-hook-form'

import MyDropzone from './MyDropZone'
import toast from 'react-hot-toast'

//  firebase
import firebaseApp from '../../../../libs/firebase'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const AddProductForm = () => {
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
      name: 'Bleeker Stencil ',
      description: 'A compact companion with enough room for all the essentials, our color-blocked Marilyn satchel is the epitome of polished ease. It’s crafted from Saffiano leather and opens to a lined interior with dedicated pockets for your phone, wallet and other small items. Attach the adjustable strap to wear it cross-body.',
      price: '248',
      previousPrice: '320',
      brand: 'Michael Kors',
      category: 'Handbag',
      inStock: '9',
      isOnSale: 'no',
      size: 'Medium',
      measurements: '11.25”W X 8.25”H X 5.5”D',
      images: [],
      adminProductCostAndExpenses: '180',
      showInStore: false,
      color: 'red',

      // name: '',
      // description: '',
      // price: '',
      // previousPrice: '',
      // brand: '',
      // category: '',
      // inStock: '',
      // isOnSale: '',
      // size: '',
      // measurements: '',
      // images: [],
      // adminProductCostAndExpenses: '',
      // showInStore: false,
      // color: '',
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
    let uploadedImages = []

    if (!data.category) {
      setisLoading(false)
      toast.error('Select Product Category')
    }

    if (data.images.length < 1) {
      setisLoading(false)
      toast.error('Add Product Images')
    }

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
    axios.post('/api/product', productData).then(() => {
      toast.success("Product Created ")
      setIsProductCreated(true)
      router.refresh()
    }).catch((error) => {
      console.log(error)
      toast.error('Something went wrong in catch')
    }).finally(() => {
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

      <CustomCheckBox
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
        <MyDropzone
          setimagesArr={setimagesArr}
          isProductCreated={isProductCreated}
        />
      </div>

      <div>
        <MyButton
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          isLoading={isLoading}
          label={isLoading ? 'Loading...' : 'Create Product'}
        />
      </div>
    </>
  )
}

export default AddProductForm
