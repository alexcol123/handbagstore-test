'use client'

import Image from 'next/image'
// import MyButton from "@/app/components/MyButton"
// import Ratings from "@/app/components/Ratings"
// import ProductImages from "@/app/components/products/ProductImages"
// import SetColor from "@/app/components/products/SetColor"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdCheckCircle } from 'react-icons/md'
import ProductPrice from '../../../components/products/ProductPrice'
import ProductBrand from '../../../components/products/ProductBrand'
import ProductSaleBadge from '../../../components/products/ProductSaleBadge'

import ProductShowRating from '../../../components/products/ProductShowRating'
import SetColor from '../../../components/products/SetColor'
import SetQuantity from '../../../components/products/SetQuantity'
import MyButton from '@/app/components/MyButton'
import ProductImages from '@/app/components/products/ProductImages'
import { CartContext, useCart } from '@/hooks/useCart'
import Share from './Share'

import { usePathname } from 'next/navigation'

const ProductDetails = ({ product }) => {
  const pathname = usePathname()
  // console.log(pathname)

  // const shareLinkUrl = `https://handbagstore-test-3.vercel.app/${pathname}`
  // console.log(shareLinkUrl)

  const [url, seturl] = useState(null)

  useEffect(() => {
    if (window !== undefined) {
      seturl(window.location.href)
    }
  }, [])

  // console.log(url)


  const { handleAddProductToCart, cartProducts, cartTotalQty } = useCart()

  // console.log(cartProducts)

  const productRating = product?.reviews.reduce(
    (acc, item) => (acc += item.rating / product.reviews.length),
    0
  )

  const router = useRouter()

  const [isProductInCart, setisProductInCart] = useState(false)

  useEffect(() => {
    setisProductInCart(false)

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      )
      if (existingIndex > -1) {
        setisProductInCart(true)
      }
    }
  }, [cartProducts])

  const Horizontal = () => {
    return <hr className='w-60 opacity-80' />
  }

  const [cartProduct, setcartProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,

    currentColor: product.colors[0].color,
    selectedImage: product.colors[0].image[0],

    quantity: 1,
    price: product.price,
  })

  console.log(cartProduct.selectedImage)

  //  console.log(cartProduct.currentColor)

  // const selectProductColor = () => {
  //   // setmainImage(product.images[1].image[0])
  // }

  // console.log('SELECTED IMG', cartProduct.currentColor)

  const handleColorSelect = (value, i) => {
    setcartProduct((prev) => ({
      ...prev,

      currentColor: product.colors[i].color,
      selectedImage: product.colors[i].image[0],
    }))
  }

  // console.log(cartProduct.selectedImg)

  const handleQtyDecrease = () => {
    setcartProduct((prev) => {
      return { ...prev, quantity: prev.quantity <= 1 ? 1 : prev.quantity - 1 }
    })
  }

  const handleQtyIncrease = () => {
    setcartProduct((prev) => {
      //  console.log(prev)
      return { ...prev, quantity: prev.quantity >= 25 ? 25 : prev.quantity + 1 }
    })
  }

  const cartCounter = () => {}

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10 rounded'>
      {/* Images */}

      <ProductImages product={product} cartProduct={cartProduct} />

      {/* Details */}

      <div className='flex flex-col  items-start justify-center  gap-3 md:gap-4  '>
        <h2 className='text-xl md:text-3xl font-medium'>{product.name}</h2>

        {/* Share  */}
        {/* <div>{url !== null && <Share url={url} />}</div> */}

        <div className='badge badge-neutral uppercase px-4 py-1'>
          {product.brand}
        </div>

        {/* Reviews  */}

        <div className='flex items-center justify-center gap-4 '>
          {/* <Ratings productRating={productRating} /> */}
          {productRating > 0 && (
            <ProductShowRating productRating={productRating} />
          )}
          {product.reviews.length} reviews
        </div>

        <Horizontal />
        <div className='text-base  md:text-lg text-justify opacity-80 leading-5 md:leading-normal '>
          {product.description}
        </div>
        <Horizontal />
        <div className='text-sm  md:text-lg'>
          <div className='flex items-center '>
            <span className='font-semibold mr-2 '>Price:</span>
            <ProductPrice
              price={product.price}
              isOnSale={product.isOnSale}
              salePrice={product.salePrice}
              fontSize='text-md'
            />
          </div>

          <div>
            <span className='font-semibold mr-2 '>CATEGORY:</span>
            {product.category}
          </div>
          <div>
            <span className='font-semibold mr-2 '>Brand:</span>
            {product.brand}
          </div>
          <div>
            <span className='font-semibold mr-2 '>Availability:</span>
            <span
              className={
                !product.inStock
                  ? 'text-red-500'
                  : 'text-success px-2 rounded-sm  font-semibold'
              }
            >
              {product.inStock ? 'In Stock' : 'Out of Stock'}{' '}
            </span>
          </div>
        </div>
        <Horizontal />

        {isProductInCart ? (
          <>
            <>
              <p className='mb-2 text-primary flex  items-center gap-1'>
                <MdCheckCircle size={23} className='text-accent ' />
                <span>Product Added to cart </span>
              </p>
              <div className='w-[350px]'>
                <MyButton
                  onClick={() => router.push('/cart')}
                  label='View In Cart'
                  outline
                />
              </div>
            </>
          </>
        ) : (
          <>
            <SetColor
              images={product.colors}
              cartProduct={cartProduct}
              handleColorSelect={handleColorSelect}
            />

            <Horizontal />
            <div>Quantity</div>
            <SetQuantity
              cartCounter={cartCounter}
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />

            <Horizontal />

            <div className='w-full lg:max-w-[400px]'>
              <MyButton
                label={'Add To Cart'}
                onClick={() => {
                  handleAddProductToCart(cartProduct)
                }}
              />
            </div>
          </>
        )}

        {/* <>
          <p className='mb-2 text-primary flex  items-center gap-1'>
            <MdCheckCircle size={20} className='text-accent' />
            <span>Product Added to cart </span>
          </p>
          <div className='w-[350px]'>
            <MyButton
                onClick={() => router.push('/cart')}
                label="View In Cart"
                outline
              />
          </div>
        </> */}

        {/* <>
          <Horizontal />
          <SetQuantity
            cartProduct={cartProduct}
            handleQtyDecrease={handleQtyDecrease}
            handleQtyIncrease={handleQtyIncrease}
            cartCounter={cartCounter}
          />

          <Horizontal />
          <div className='w-[350px]'>
            <MyButton
              onClick={() => handleAddProductToCart(cartProduct)}
              label='Add To Cart'
            />
          </div>
        </> */}
      </div>
    </div>
  )
}

export default ProductDetails
