'use client'

import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdCheckCircle } from 'react-icons/md'
import ProductPrice from '../../../components/products/ProductPrice'

import ProductShowRating from '../../../components/products/ProductShowRating'

import SetQuantity from '../../../components/products/SetQuantity'
import MyButton from '../../../components/MyButton'
import ProductImages from '../../../components/products/ProductImages'
import { useCart } from '../../../../hooks/useCart'
import Share from './Share'
import NoImage from '../../../../public/noimg.jpg'

import { usePathname } from 'next/navigation'
import ProductIsOnSale from '../../../components/products/ProductIsOnSale'

const ProductDetails = ({ product }) => {
  const pathname = usePathname()

  const [url, seturl] = useState(null)

  let percentageOff = null

  if (product.isOnSale !== 'no') {
    percentageOff = Math.ceil((product.price / product.previousPrice) * 100)
  }

  useEffect(() => {
    if (window !== undefined) {
      seturl(window.location.href)
    }
  }, [])

  const { handleAddProductToCart, cartProducts } = useCart()

  const productRating = product?.reviews?.reduce(
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
  }, [cartProducts, product.id])

  const Horizontal = () => {
    return <hr className='w-[99%] opacity-80' />
  }

  const [cartProduct, setcartProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: product.images.length ? product.images[0].image : NoImage,
    quantity: 1,
    price: product.price,
    size: product.size,
  })

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

  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10 rounded  border overflow-hidden  '>
        {/* Images */}

        <ProductImages product={product} cartProduct={cartProduct} />

        {/* Details */}

        <div className='flex flex-col  items-start justify-center  gap-3 md:gap-4  p-2 md:p-3'>
          <div className='badge badge-neutral uppercase px-4 py-1'>
            {product.brand}
          </div>

          <h2 className='text-xl md:text-3xl font-medium'>{product.name}</h2>

          {/* Reviews  */}

          <div className='flex items-center justify-center gap-4 '>
            {/* <Ratings productRating={productRating} /> */}
            {productRating > 0 && (
              <ProductShowRating productRating={productRating} />
            )}
            {product.reviews.length} reviews
          </div>

          <Horizontal />
          <ProductIsOnSale
            onSale={product.isOnSale}
            percentageOff={percentageOff}
          />
          <div className='  md:text-md   text-justify opacity-80 leading-5 md:leading-normal max-w-[96%]'>
            {product.description}
          </div>

          <Horizontal />
          <div className='text-sm  md:text-md'>
            <div className='flex items-center '>
              <span className='font-semibold mr-2 '>Price:</span>
              <ProductPrice
                price={product.price}
                isOnSale={product.isOnSale}
                previousPrice={product.previousPrice}
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

            {product?.size !== '' && (
              <div>
                <span className='font-semibold mr-2 '>Size:</span>
                {product.size}
              </div>
            )}

            {product?.measurements !== '' && (
              <div>
                <span className='font-semibold mr-2 '>Measurements:</span>
                {product.measurements}
              </div>
            )}

            <div>
              <span className='font-semibold mr-2 '>Availability:</span>
              <span
                className={
                  product.inStock <= 0
                    ? 'text-error'
                    : 'text-success px-2 rounded-sm'
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
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />

              <Horizontal />

              <div className='w-full my-4 lg:max-w-[400px]'>
                {product?.inStock >= 1 && (
                  <MyButton
                    label={'Add To Cart'}
                    onClick={() => {
                      handleAddProductToCart(cartProduct)
                    }}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Share  */}
      <div className='mt-12  flex items-center justify-center w-full mx-auto px-4 pb-3 border'>
        {url !== null && <Share url={url} />}
      </div>
    </div>
  )
}

export default ProductDetails
